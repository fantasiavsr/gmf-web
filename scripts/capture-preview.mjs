import { chromium } from '@playwright/test';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const URL = 'https://editorial-web-sigma.vercel.app';

const outputDir = 'public';
const framesDir = path.join(outputDir, 'gif-frames-smooth');

const pngPath = path.join(outputDir, 'preview.png');
const gifPath = path.join(outputDir, 'preview-smooth.gif');

const browser = await chromium.launch();

const page = await browser.newPage({
    // Capture at 1920x1080 for good source quality
    viewport: {
        width: 1920,
        height: 1080,
    },
});

console.log('Opening website...');

await page.goto(URL, {
    waitUntil: 'networkidle',
});

// Allow initial animations to start
await page.waitForTimeout(2000);

// ─────────────────────────────────────────────
// Prepare frame directory
// ─────────────────────────────────────────────

if (fs.existsSync(framesDir)) {
    fs.rmSync(framesDir, {
        recursive: true,
        force: true,
    });
}

fs.mkdirSync(framesDir, {
    recursive: true,
});

// ─────────────────────────────────────────────
// Settings
// ─────────────────────────────────────────────

const scrollStep = 60;
const frameDelay = 80;

const topPause = 1000;
const bottomPause = 500;

let frame = 0;

// ─────────────────────────────────────────────
// Capture frame helper
// ─────────────────────────────────────────────

async function captureFrame() {
    const framePath = path.join(
        framesDir,
        `frame-${String(frame).padStart(5, '0')}.png`,
    );

    await page.screenshot({
        path: framePath,
    });

    frame++;
}

// ─────────────────────────────────────────────
// Start at top
// ─────────────────────────────────────────────

console.log('Starting at top...');

await page.evaluate(() => {
    window.scrollTo(0, 0);
});

await page.waitForTimeout(1000);

// Pause at top
const topFrames = Math.round(topPause / frameDelay);

for (let i = 0; i < topFrames; i++) {
    await captureFrame();
    await page.waitForTimeout(frameDelay);
}

// ─────────────────────────────────────────────
// Scroll through entire page
// ─────────────────────────────────────────────

console.log('Recording smooth scroll...');

const viewportHeight = 1080;

const totalHeight = await page.evaluate(() => {
    return document.documentElement.scrollHeight;
});

const maxScroll = Math.max(
    0,
    totalHeight - viewportHeight,
);

let currentScroll = 0;

while (currentScroll < maxScroll) {
    currentScroll = Math.min(
        currentScroll + scrollStep,
        maxScroll,
    );

    await page.evaluate((scrollY) => {
        window.scrollTo({
            top: scrollY,
            behavior: 'auto',
        });
    }, currentScroll);

    await page.waitForTimeout(frameDelay);

    await captureFrame();
}

// ─────────────────────────────────────────────
// Pause at bottom
// ─────────────────────────────────────────────

console.log('Pausing at bottom...');

const bottomFrames = Math.round(bottomPause / frameDelay);

for (let i = 0; i < bottomFrames; i++) {
    await captureFrame();
    await page.waitForTimeout(frameDelay);
}

console.log(`Captured ${frame} frames.`);

// ─────────────────────────────────────────────
// Return to top for PNG
// ─────────────────────────────────────────────

console.log('Returning to top for PNG...');

await page.evaluate(() => {
    window.scrollTo({
        top: 0,
        behavior: 'auto',
    });
});

await page.waitForTimeout(2000);

// ─────────────────────────────────────────────
// Create full-quality PNG
// ─────────────────────────────────────────────

console.log('Creating full-page PNG...');

await page.screenshot({
    path: pngPath,
    fullPage: true,
});

console.log(`PNG saved: ${pngPath}`);

// ─────────────────────────────────────────────
// Close browser
// ─────────────────────────────────────────────

await browser.close();

// ─────────────────────────────────────────────
// Convert frames → 1280x720 GIF
// ─────────────────────────────────────────────

console.log('Creating optimized GIF...');

const ffmpegCommand = [
    'ffmpeg',
    '-y',

    // Input frame rate
    '-framerate 12.5',

    // Input frames
    `-i "${framesDir}/frame-%05d.png"`,

    // Resize + palette optimization
    '-vf "fps=12.5,scale=1280:720:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=256[p];[s1][p]paletteuse=dither=sierra2_4a"',

    // Output
    `"${gifPath}"`,
].join(' ');

try {
    execSync(ffmpegCommand, {
        stdio: 'inherit',
        shell: true,
    });
} catch (error) {
    console.error('FFmpeg failed.');
    console.error(error.message);
    process.exit(1);
}

// ─────────────────────────────────────────────
// Remove temporary frames
// ─────────────────────────────────────────────

console.log('Cleaning temporary frames...');

fs.rmSync(framesDir, {
    recursive: true,
    force: true,
});

console.log('');
console.log('Done!');
console.log(`PNG: ${pngPath}`);
console.log(`GIF: ${gifPath}`);
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
    viewport: {
        width: 1920,
        height: 1080,
    },
});

console.log('Opening website...');

await page.goto(URL, {
    waitUntil: 'networkidle',
});

// Initial loading
await page.waitForTimeout(2000);

// Prepare frame directory
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
const topPause = 3000;
const bottomPause = 1500;

let frame = 0;

// ─────────────────────────────────────────────
// Helper: capture frame
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

// Capture several frames while paused at top
const topFrames = Math.round(topPause / frameDelay);

for (let i = 0; i < topFrames; i++) {
    await captureFrame();
    await page.waitForTimeout(frameDelay);
}

// ─────────────────────────────────────────────
// Scroll smoothly
// ─────────────────────────────────────────────

console.log('Recording smooth scroll...');

const viewportHeight = 1080;

const totalHeight = await page.evaluate(() => {
    return document.documentElement.scrollHeight;
});

const maxScroll = totalHeight - viewportHeight;

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

// ─────────────────────────────────────────────
// Create PNG after triggering animations
// ─────────────────────────────────────────────

console.log('Returning to top for PNG...');

await page.evaluate(() => {
    window.scrollTo({
        top: 0,
        behavior: 'auto',
    });
});

await page.waitForTimeout(2000);

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
// Convert frames → GIF
// ─────────────────────────────────────────────

console.log('Creating smooth GIF...');

const ffmpegCommand = [
    'ffmpeg',
    '-y',
    '-framerate 12.5',
    `-i "${framesDir}/frame-%05d.png"`,
    '-vf "fps=12.5,scale=1920:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=256[p];[s1][p]paletteuse=dither=sierra2_4a"',
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
// Clean temporary frames
// ─────────────────────────────────────────────

fs.rmSync(framesDir, {
    recursive: true,
    force: true,
});

console.log('');
console.log('Done!');
console.log(`PNG: ${pngPath}`);
console.log(`GIF: ${gifPath}`);
import { useEffect, useRef } from "react";
import { MockAnalyticsChartData } from "../../data/exampleData";

export default function AnalyticsChart() {
  const canvasRef = useRef(null);
  const data = MockAnalyticsChartData;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    // Set canvas size for high DPI displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Get theme colors
    const isDark = document.documentElement.classList.contains("dark");
    const lineColor = isDark ? "#fe7141" : "#fe7141";
    const gridColor = isDark
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(0, 0, 0, 0.1)";
    const textColor = isDark
      ? "rgba(255, 255, 255, 0.6)"
      : "rgba(0, 0, 0, 0.6)";

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Find max values
    const maxRevenue = Math.max(...data.map((d) => d.revenue));
    const step = chartWidth / (data.length - 1);

    // Draw grid lines
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding + (chartHeight / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw area under curve
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);

    data.forEach((point, idx) => {
      const x = padding + idx * step;
      const y =
        padding + chartHeight - (point.revenue / maxRevenue) * chartHeight;
      if (idx === 0) {
        ctx.lineTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.lineTo(width - padding, height - padding);
    ctx.closePath();

    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
    gradient.addColorStop(
      0,
      isDark ? "rgba(254, 113, 65, 0.2)" : "rgba(254, 113, 65, 0.15)",
    );
    gradient.addColorStop(
      1,
      isDark ? "rgba(254, 113, 65, 0)" : "rgba(254, 113, 65, 0)",
    );
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw line
    ctx.beginPath();
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    data.forEach((point, idx) => {
      const x = padding + idx * step;
      const y =
        padding + chartHeight - (point.revenue / maxRevenue) * chartHeight;

      if (idx === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Draw points
    data.forEach((point, idx) => {
      const x = padding + idx * step;
      const y =
        padding + chartHeight - (point.revenue / maxRevenue) * chartHeight;

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = lineColor;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.strokeStyle = isDark ? "#fe7141" : "#fe7141";
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Draw labels
    ctx.fillStyle = textColor;
    ctx.font = "12px sans-serif";
    ctx.textAlign = "center";

    data.forEach((point, idx) => {
      const x = padding + idx * step;
      ctx.fillText(point.month, x, height - padding + 20);
    });

    // Draw Y-axis labels
    ctx.textAlign = "right";
    for (let i = 0; i <= 4; i++) {
      const value = (maxRevenue / 4) * (4 - i);
      const y = padding + (chartHeight / 4) * i;
      ctx.fillText(`$${(value / 1000).toFixed(0)}k`, padding - 10, y + 4);
    }
  }, [data]);

  return (
    <div className="bg-primary-white dark:bg-primary-dark-card rounded-lg border border-primary-black/10 dark:border-primary-white/10 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-primary-black dark:text-primary-white">
            Revenue Analytics
          </h3>
          <p className="text-sm text-primary-black/60 dark:text-primary-white/60 mt-1">
            Monthly revenue trend
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-xs font-medium rounded-lg bg-primary-orange text-primary-white">
            Revenue
          </button>
          <button className="px-3 py-1 text-xs font-medium rounded-lg text-primary-black/60 dark:text-primary-white/60 hover:bg-primary-black/5 dark:hover:bg-primary-white/5 transition-colors">
            Users
          </button>
        </div>
      </div>

      <div className="relative" style={{ height: "320px" }}>
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
}

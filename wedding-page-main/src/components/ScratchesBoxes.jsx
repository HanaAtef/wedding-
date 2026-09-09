import React, { useRef, useEffect, useState, useCallback } from 'react';

/**
 * ScratchCard
 * A single gold "scratch to reveal" box. Draws a scratchable gold
 * overlay on a <canvas> sitting on top of the real content. Dragging
 * (mouse or touch) erases the overlay with a round brush. Once enough
 * of the canvas is cleared, it fades out entirely to reveal the content.
 *
 * Props:
 *  - value: string | number  -> the content to reveal (e.g. "09")
 *  - label: string           -> caption under the box (e.g. "DAY")
 *  - threshold: number       -> 0-1, % scratched before auto-reveal (default 0.45)
 *  - brushSize: number       -> radius of the scratch brush in px (default 22)
 *  - onReveal: () => void    -> optional callback fired once when revealed
 */
function ScratchCard({
  value,
  label,
  threshold = 0.45,
  brushSize = 22,
  onReveal,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const isScratching = useRef(false);
  const revealed = useRef(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const drawOverlay = useCallback((ctx, width, height) => {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#f3d98b');
    gradient.addColorStop(0.5, '#d4a94a');
    gradient.addColorStop(1, '#b8862f');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(255,255,255,0.35)';
    ctx.lineWidth = 2;
    for (let x = -height; x < width; x += 10) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + height, height);
      ctx.stroke();
    }

    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.font = '600 13px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('scratch', width / 2, height / 2);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      const ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawOverlay(ctx, rect.width, rect.height);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    return () => observer.disconnect();
  }, [drawOverlay]);

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const point = e.touches ? e.touches[0] : e;
    return { x: point.clientX - rect.left, y: point.clientY - rect.top };
  };

  const scratch = (e) => {
    if (revealed.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { x, y } = getPos(e, canvas);

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';

    checkRevealProgress(ctx, canvas);
  };

  const checkRevealProgress = (ctx, canvas) => {
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width;
    const h = canvas.height;
    const sampleStep = 8 * dpr;
    const pixels = ctx.getImageData(0, 0, w, h).data;
    let cleared = 0;
    let total = 0;
    for (let i = 3; i < pixels.length; i += 4 * sampleStep) {
      total++;
      if (pixels[i] === 0) cleared++;
    }
    if (total > 0 && cleared / total > threshold) {
      finishReveal(canvas);
    }
  };

  const finishReveal = (canvas) => {
    if (revealed.current) return;
    revealed.current = true;
    canvas.style.transition = 'opacity 400ms ease';
    canvas.style.opacity = '0';
    setTimeout(() => setIsRevealed(true), 400);
    onReveal && onReveal();
  };

  const handleStart = (e) => {
    isScratching.current = true;
    scratch(e);
  };
  const handleMove = (e) => {
    if (!isScratching.current) return;
    e.preventDefault();
    scratch(e);
  };
  const handleEnd = () => {
    isScratching.current = false;
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        ref={containerRef}
        className="relative aspect-[3/4] w-full max-w-[160px] overflow-hidden rounded-2xl border border-[color:var(--secondary)]/40 bg-[#f4e7db] shadow-sm"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-semibold tracking-wide text-[color:var(--primary)]">
            {value}
          </span>
        </div>

        {!isRevealed && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full touch-none rounded-2xl select-none"
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
          />
        )}
      </div>
      <span className="text-xs font-medium tracking-[0.2em] text-[color:var(--secondary)]">
        {label}
      </span>
    </div>
  );
}

/**
 * ScratchDateReveal
 * Groups three ScratchCard boxes (day / month / year) with the
 * "Scratch to reveal the date" heading, matching the reference layout.
 *
 * Props:
 *  - date: Date | string  -> the date to reveal, defaults to today
 */
export default function ScratchDateReveal({ date }) {
  const d = date ? new Date(date) : new Date();
  const day = String(d.getDate()).padStart(2, '0');
  const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const year = d.getFullYear();

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl bg-[color:var(--surface)] px-6 py-8">
      <h2 className="mb-6 flex items-center justify-center gap-2 text-center text-lg font-medium text-[color:var(--secondary)]">
        <span className="text-[color:var(--primary)]">✦</span>
        Scratch to reveal the date
        <span className="text-[color:var(--primary)]">✦</span>
      </h2>
      <div className="grid grid-cols-3 gap-3">
        <ScratchCard value={day} label="DAY" />
        <ScratchCard value={month} label="MONTH" />
        <ScratchCard value={year} label="YEAR" />
      </div>
    </div>
  );
}

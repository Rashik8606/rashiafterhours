"use client";

import { useEffect, useRef } from "react";

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    const blobs: {
      x: number;
      y: number;
      r: number;
      dx: number;
      dy: number;
      c1: string;
      c2: string;
    }[] = [];

    const rand = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = window.devicePixelRatio || 1;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.scale(dpr, dpr);
    }

    function initBlobs() {
      blobs.length = 0;
      const count = Math.max(10, Math.round(Math.min(width, height) / 60));
      for (let i = 0; i < count; i++) {
        blobs.push({
          x: rand(0, width),
          y: rand(0, height),
          r: rand(40, 140),
          dx: rand(-0.6, 0.6),
          dy: rand(-0.6, 0.6),
          c1: `hsl(${rand(250, 290)}, 80%, 60%)`,
          c2: `hsl(${rand(300, 330)}, 80%, 60%)`,
        });
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      for (const b of blobs) {
        const grd = ctx!.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        grd.addColorStop(0, b.c1);
        grd.addColorStop(1, "transparent");
        ctx!.globalCompositeOperation = "lighter";
        ctx!.fillStyle = grd;
        ctx!.beginPath();
        ctx!.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx!.fill();

        b.x += b.dx;
        b.y += b.dy;
        if (b.x < -b.r) b.x = width + b.r;
        if (b.x > width + b.r) b.x = -b.r;
        if (b.y < -b.r) b.y = height + b.r;
        if (b.y > height + b.r) b.y = -b.r;
      }
      requestAnimationFrame(draw);
    }

    const onResize = () => {
      resize();
      initBlobs();
    };

    window.addEventListener("resize", onResize);
    resize();
    initBlobs();
    const frame = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="bg-canvas"
      className="fixed inset-0 -z-10 opacity-70"
      aria-hidden
    />
  );
}

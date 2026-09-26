"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
  twinkleSpeed: number;
  vx: number;
  vy: number;
}

export function CelestialCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener("resize", handleResize);

    const starCount = Math.min(120, Math.floor((width * height) / 14000));
    let stars: Star[] = [];

    const initStars = () => {
      stars = [];
      for (let i = 0; i < starCount; i++) {
        const baseAlpha = Math.random() * 0.6 + 0.15;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.2 + 0.4,
          alpha: baseAlpha,
          baseAlpha,
          twinkleSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
        });
      }
    };

    initStars();

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect stars that are near each other or mouse
      for (let i = 0; i < stars.length; i++) {
        const s1 = stars[i];

        // Move
        s1.x += s1.vx;
        s1.y += s1.vy;
        if (s1.x < 0) s1.x = width;
        if (s1.x > width) s1.x = 0;
        if (s1.y < 0) s1.y = height;
        if (s1.y > height) s1.y = 0;

        // Twinkle
        s1.alpha += s1.twinkleSpeed;
        if (s1.alpha > 0.85 || s1.alpha < 0.15) {
          s1.twinkleSpeed = -s1.twinkleSpeed;
        }

        // Draw Star
        ctx.beginPath();
        ctx.arc(s1.x, s1.y, s1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244, 244, 246, ${Math.max(0, Math.min(1, s1.alpha))})`;
        ctx.fill();

        // Connect to mouse if nearby
        const distMouse = Math.hypot(s1.x - mouseX, s1.y - mouseY);
        if (distMouse < 140) {
          ctx.beginPath();
          ctx.moveTo(s1.x, s1.y);
          ctx.lineTo(mouseX, mouseY);
          const mouseAlpha = (1 - distMouse / 140) * 0.18;
          ctx.strokeStyle = `rgba(216, 178, 110, ${mouseAlpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }

        // Subtle constellation links
        for (let j = i + 1; j < stars.length; j++) {
          const s2 = stars[j];
          const dist = Math.hypot(s1.x - s2.x, s1.y - s2.y);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(s1.x, s1.y);
            ctx.lineTo(s2.x, s2.y);
            const lineAlpha = (1 - dist / 90) * 0.08;
            ctx.strokeStyle = `rgba(228, 228, 231, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60"
    />
  );
}

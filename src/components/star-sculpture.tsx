"use client";

import { useEffect, useRef } from "react";

export function StarSculpture() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = 160);
    let height = (canvas.height = 160);

    // 3D 8-pointed star polyhedron geometry
    // Center point (0,0,0) and 8 points extending outwards in 3D space
    const vertices: { x: number; y: number; z: number }[] = [
      { x: 0, y: -58, z: 0 },   // Top peak
      { x: 0, y: 58, z: 0 },    // Bottom peak
      { x: -58, y: 0, z: 0 },   // Left peak
      { x: 58, y: 0, z: 0 },    // Right peak
      { x: 0, y: 0, z: -58 },   // Front peak
      { x: 0, y: 0, z: 58 },    // Back peak
      // Mid corner diamond nodes
      { x: 26, y: -26, z: 26 },
      { x: -26, y: -26, z: 26 },
      { x: 26, y: 26, z: 26 },
      { x: -26, y: 26, z: 26 },
      { x: 26, y: -26, z: -26 },
      { x: -26, y: -26, z: -26 },
      { x: 26, y: 26, z: -26 },
      { x: -26, y: 26, z: -26 },
    ];

    // Edges connecting peaks to inner nodes
    const edges: [number, number][] = [
      [0, 6], [0, 7], [0, 10], [0, 11],
      [1, 8], [1, 9], [1, 12], [1, 13],
      [2, 7], [2, 9], [2, 11], [2, 13],
      [3, 6], [3, 8], [3, 10], [3, 12],
      [4, 10], [4, 11], [4, 12], [4, 13],
      [5, 6], [5, 7], [5, 8], [5, 9],
      // Outer ring cross beams
      [6, 7], [7, 9], [9, 8], [8, 6],
      [10, 11], [11, 13], [13, 12], [12, 10],
      [6, 10], [7, 11], [8, 12], [9, 13],
    ];

    let rotX = 0.3;
    let rotY = 0.5;
    let targetRotX = 0.3;
    let targetRotY = 0.5;

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const rect = canvas.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      targetRotY = (clientX - centerX) * 0.005;
      targetRotX = -(clientY - centerY) * 0.005;
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });

    let t = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Auto rotation + responsive tracking
      t += 0.018;
      rotX += (targetRotX - rotX) * 0.05 + 0.004;
      rotY += (targetRotY - rotY) * 0.05 + 0.012;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      // Project vertices
      const projected = vertices.map((v) => {
        // Rotate Y
        const x1 = v.x * cosY + v.z * sinY;
        const z1 = -v.x * sinY + v.z * cosY;
        // Rotate X
        const y2 = v.y * cosX - z1 * sinX;
        const z2 = v.y * sinX + z1 * cosX;

        // Perspective projection
        const fov = 180;
        const distance = fov / (fov + z2 + 80);
        return {
          x: width / 2 + x1 * distance,
          y: height / 2 + y2 * distance,
          z: z2,
        };
      });

      // Outer golden aura ring around the star
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 48 + Math.sin(t * 2) * 3, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 85, 0, 0.18)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw 3D Edges
      for (const [i1, i2] of edges) {
        const p1 = projected[i1];
        const p2 = projected[i2];
        const avgZ = (p1.z + p2.z) / 2;
        const alpha = Math.max(0.2, Math.min(0.85, (avgZ + 60) / 120));

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(255, 85, 0, ${alpha * 0.75})`;
        ctx.lineWidth = avgZ > 0 ? 1.4 : 0.8;
        ctx.stroke();
      }

      // Draw Star Nodes with Glowing Electric Orange Sparks
      for (const p of projected) {
        const radius = p.z > 0 ? 2.5 : 1.6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = p.z > 20 ? "#FFF9F2" : "#FF5500";
        ctx.shadowColor = "#FF5500";
        ctx.shadowBlur = p.z > 0 ? 10 : 3;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("touchmove", onPointerMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center w-28 h-28 sm:w-36 sm:h-36 shrink-0 my-1">
      <canvas
        ref={canvasRef}
        width={160}
        height={160}
        className="w-full h-full object-contain pointer-events-none drop-shadow-[0_0_20px_rgba(255,85,0,0.5)]"
      />
    </div>
  );
}

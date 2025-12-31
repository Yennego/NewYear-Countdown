"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    alpha: number;
    color: string;
    size: number;
    decay: number;
}

export const FireworkEngine: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId: number;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createFirework = (x: number, y: number) => {
            const colors = ["#D4AF37", "#FFFFFF", "#F5F5DC"];
            const isCross = Math.random() < 0.2; // 20% chance for a cross burst
            const count = isCross ? 80 : 150;

            for (let i = 0; i < count; i++) {
                let vx, vy;

                if (isCross) {
                    // Cross logic: horizontal or vertical speed
                    const isHorizontal = Math.random() > 0.5;
                    const speed = (Math.random() - 0.5) * 15;
                    vx = isHorizontal ? speed : 0;
                    vy = isHorizontal ? 0 : speed;
                } else {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = Math.random() * 8 + 2;
                    vx = Math.cos(angle) * speed;
                    vy = Math.sin(angle) * speed;
                }

                particles.push({
                    x,
                    y,
                    vx,
                    vy,
                    alpha: 1,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    size: Math.random() * 3 + 1,
                    decay: Math.random() * 0.015 + 0.005,
                });
            }
        };

        const draw = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles = particles.filter((p) => p.alpha > 0);

            particles.forEach((p) => {
                ctx.globalAlpha = p.alpha;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.05; // Gravity
                p.alpha -= p.decay;
            });

            if (Math.random() < 0.05) {
                createFirework(
                    Math.random() * canvas.width,
                    Math.random() * canvas.height * 0.5
                );
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener("resize", resize);
        resize();
        draw();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

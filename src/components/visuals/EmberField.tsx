"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
    color: string;
}

export const EmberField: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticles = () => {
            const count = 50;
            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 3 + 1,
                    speedX: Math.random() * 0.2 - 0.1,
                    speedY: -Math.random() * 0.5 - 0.2, // Move upwards like embers
                    opacity: Math.random() * 0.5 + 0.2,
                    color: Math.random() > 0.5 ? "#D4AF37" : "#FF4500", // Gold or Orange-Red
                });
            }
        };

        const drawParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                ctx.globalAlpha = p.opacity;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                p.x += p.speedX;
                p.y += p.speedY;
                p.opacity -= 0.001;

                if (p.opacity <= 0 || p.y < 0) {
                    p.y = canvas.height + 10;
                    p.x = Math.random() * canvas.width;
                    p.opacity = Math.random() * 0.5 + 0.2;
                }
            });

            animationFrameId = requestAnimationFrame(drawParticles);
        };

        window.addEventListener("resize", resize);
        resize();
        createParticles();
        drawParticles();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ filter: "blur(2px)" }}
        />
    );
};

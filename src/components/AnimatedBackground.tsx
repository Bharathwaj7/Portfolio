'use client';

import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
}

export default function AnimatedBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        const particles: Particle[] = [];
        const PARTICLE_COUNT = 80;
        const CONNECTION_DISTANCE = 140;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = document.body.scrollHeight;
        };
        resize();

        // Init particles
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.5 + 0.1,
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            for (const p of particles) {
                p.x += p.vx;
                p.y += p.vy;

                // Wrap around
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                // Draw dot — mostly white/grey, occasional red
                const isRed = Math.random() < 0.005; // rare flash
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = isRed
                    ? `rgba(225, 6, 0, ${p.opacity})`
                    : `rgba(255, 255, 255, ${p.opacity * 0.6})`;
                ctx.fill();
            }

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < CONNECTION_DISTANCE) {
                        const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.12;
                        // Occasionally draw a red connection
                        const isRedLine = dist < 60 && Math.random() < 0.002;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = isRedLine
                            ? `rgba(225, 6, 0, ${alpha * 2})`
                            : `rgba(255, 255, 255, ${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            animationId = requestAnimationFrame(draw);
        };

        draw();

        const handleResize = () => {
            resize();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0, opacity: 0.7 }}
        />
    );
}

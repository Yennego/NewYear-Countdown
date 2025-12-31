"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WATCHNIGHT_CONFIG } from "@/config/watchnight.config";

export const CountdownRadial: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [progress, setProgress] = useState(0);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    useEffect(() => {
        const calculateTime = () => {
            const now = new Date();
            const target = new Date();
            const t = WATCHNIGHT_CONFIG.theme.targetDate;
            target.setFullYear(t.year, t.month, t.day);
            target.setHours(t.hour, t.minute, t.second, 0);

            const diff = target.getTime() - now.getTime();

            if (diff <= 0) {
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
                setProgress(1);
                return;
            }

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft({ hours, minutes, seconds });

            // Progress within the last hour (for the radial bar)
            const currentSeconds = (minutes * 60) + seconds;
            setProgress(1 - (currentSeconds / 3600));
        };

        calculateTime();
        const interval = setInterval(calculateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const radius = 120;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress * circumference);

    if (!hasMounted) return null;

    return (
        <div className="relative flex items-center justify-center">
            {/* Radial Progress */}
            <svg className="w-[300px] h-[300px] -rotate-90">
                <circle
                    cx="150"
                    cy="150"
                    r={radius}
                    stroke="rgba(255, 255, 255, 0.05)"
                    strokeWidth="4"
                    fill="transparent"
                />
                <motion.circle
                    cx="150"
                    cy="150"
                    r={radius}
                    stroke="#D4AF37"
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray={circumference}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1, ease: "linear" }}
                    strokeLinecap="round"
                />
            </svg>

            {/* Timer Text */}
            <div className="absolute flex flex-col items-center">
                <div className="flex gap-4">
                    <TimeUnit value={timeLeft.hours} label="HRS" />
                    <span className="text-4xl text-white/20 mt-2">:</span>
                    <TimeUnit value={timeLeft.minutes} label="MIN" />
                    <span className="text-4xl text-white/20 mt-2">:</span>
                    <TimeUnit value={timeLeft.seconds} label="SEC" />
                </div>
            </div>
        </div>
    );
};

const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center min-w-[60px]">
        <motion.span
            key={value}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-6xl font-light tracking-tighter text-white tabular-nums text-glow-white"
        >
            {value.toString().padStart(2, "0")}
        </motion.span>
        <span className="text-[10px] tracking-[0.3em] text-gold mt-2 font-bold opacity-60">
            {label}
        </span>
    </div>
);

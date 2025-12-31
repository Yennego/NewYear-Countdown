"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { WATCHNIGHT_CONFIG } from "@/config/watchnight.config";

export const PropheticTimer: React.FC<{ isAuto?: boolean }> = ({ isAuto }) => {
    const [seconds, setSeconds] = useState(60);
    const [word, setWord] = useState("");
    const wordRef = useRef<HTMLDivElement>(null);
    const numberRef = useRef<HTMLDivElement>(null);
    const words = WATCHNIGHT_CONFIG.phases.sacred.propheticWords;
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    useEffect(() => {
        const calculateSeconds = () => {
            const now = new Date();
            const target = new Date();
            const t = WATCHNIGHT_CONFIG.theme.targetDate;
            target.setFullYear(t.year, t.month, t.day);
            target.setHours(t.hour, t.minute, t.second, 0);

            const diff = target.getTime() - now.getTime();
            const remainingSeconds = Math.max(0, Math.floor(diff / 1000));
            setSeconds(remainingSeconds);
        };

        calculateSeconds();
        const interval = setInterval(calculateSeconds, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Reveal word behind number for the last 10 seconds
        if (words[seconds as keyof typeof words]) {
            setWord(words[seconds as keyof typeof words]);

            // Animation sequence
            const tl = gsap.timeline();
            tl.to(numberRef.current, { scale: 1.2, duration: 0.2, ease: "power2.out" })
                .to(wordRef.current, { opacity: 1, filter: "blur(0px)", y: -20, duration: 0.4 }, "-=0.1")
                .to(wordRef.current, { opacity: 0, filter: "blur(5px)", y: -40, duration: 0.4, delay: 0.2 });
        } else {
            setWord("");
            gsap.to(numberRef.current, { scale: 1, duration: 0.2 });
        }
    }, [seconds, words]);

    if (!hasMounted) return null;

    return (
        <div className="relative flex flex-col items-center justify-center">
            {/* Background Pulse */}
            <div className="absolute w-[500px] h-[500px] bg-gold/5 rounded-full animate-heartbeat scale-150 blur-3xl" />

            {/* Prophetic Word */}
            <div
                ref={wordRef}
                className="absolute -top-32 text-4xl md:text-6xl font-bold tracking-[0.4em] text-gold opacity-0 filter blur-lg pointer-events-none"
            >
                {word}
            </div>

            {/* Main Countdown Number */}
            <div
                ref={numberRef}
                className="text-[12rem] md:text-[18rem] font-light tracking-tighter text-white tabular-nums text-glow-white leading-none"
            >
                {seconds}
            </div>

            <div className="mt-8 text-gold tracking-[1em] uppercase text-sm font-bold opacity-40">
                SECONDS TO DESTINY
            </div>
        </div>
    );
};

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FireworkEngine } from "./FireworkEngine";
import { WATCHNIGHT_CONFIG } from "@/config/watchnight.config";
import { Watermark } from "./Watermark";

export const MidnightMoment: React.FC<{ isAuto?: boolean }> = ({ isAuto }) => {
    const [showFlash, setShowFlash] = useState(true);
    const config = WATCHNIGHT_CONFIG.phases.midnight;

    useEffect(() => {
        const timer = setTimeout(() => setShowFlash(false), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
            <AnimatePresence>
                {showFlash && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="fixed inset-0 bg-white z-[100]"
                    />
                )}
            </AnimatePresence>

            <FireworkEngine />

            <div className="z-10 flex flex-col items-center text-center px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                >
                    <h1 className="text-5xl md:text-8xl font-black tracking-[0.2em] text-white text-glow-white mb-4">
                        {config.declaration}
                    </h1>
                    <h2 className="text-2xl md:text-4xl font-bold tracking-[0.4em] text-gold uppercase text-glow-gold">
                        {config.subtext}
                    </h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 0.8, y: 0 }}
                        transition={{ duration: 1, delay: 2 }}
                        className="mt-12 text-xl md:text-2xl italic font-light max-w-2xl text-white/80"
                    >
                        “{config.quote}”
                    </motion.p>
                </motion.div>
            </div>

            <Watermark />
        </div>
    );
};

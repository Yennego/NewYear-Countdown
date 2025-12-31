"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WATCHNIGHT_CONFIG } from "@/config/watchnight.config";

export const ScriptureLoop: React.FC = () => {
    const [index, setIndex] = useState(0);
    const scriptures = WATCHNIGHT_CONFIG.phases.waiting.scriptures;

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((current) => (current + 1) % scriptures.length);
        }, 12000); // 12 seconds per scripture

        return () => clearInterval(interval);
    }, [scriptures.length]);

    return (
        <div className="relative h-64 flex items-center justify-center text-center px-12">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                    className="max-w-4xl"
                >
                    <h2 className="text-3xl md:text-5xl font-light leading-relaxed text-white text-glow-white mb-6">
                        “{scriptures[index].text}”
                    </h2>
                    {scriptures[index].reference && (
                        <p className="text-gold text-xl md:text-2xl font-medium tracking-widest uppercase italic">
                            — {scriptures[index].reference}
                        </p>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

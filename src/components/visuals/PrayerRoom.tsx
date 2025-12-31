"use client";

import React from "react";
import { motion } from "framer-motion";
import { EmberField } from "./EmberField";
import { WATCHNIGHT_CONFIG } from "@/config/watchnight.config";
import { Watermark } from "./Watermark";

export const PrayerRoom: React.FC = () => {
    const config = WATCHNIGHT_CONFIG.phases.prayer;

    return (
        <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#050000] overflow-hidden">
            <EmberField />

            <div className="z-10 flex flex-col items-center text-center max-w-4xl px-8">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="space-y-8"
                >
                    {config.declarations.map((text, i) => (
                        <motion.h2
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.5, delay: i * 0.8 }}
                            className="text-3xl md:text-5xl font-light tracking-wide text-white/90"
                        >
                            {text}
                        </motion.h2>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ duration: 2, delay: 5 }}
                    className="mt-20 pt-8 border-t border-gold/30 w-full"
                >
                    <p className="text-gold tracking-[0.5em] uppercase font-bold text-sm">
                        {config.footer}
                    </p>
                </motion.div>
            </div>

            <Watermark />
        </div>
    );
};

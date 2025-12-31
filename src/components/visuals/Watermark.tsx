"use client";

import React from "react";
import { WATCHNIGHT_CONFIG } from "@/config/watchnight.config";

export const Watermark: React.FC = () => {
    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none z-50">
            <div className="flex flex-col items-center">
                <div className="text-2xl font-bold tracking-[0.5em] text-white uppercase italic">
                    {WATCHNIGHT_CONFIG.theme.name}
                </div>
                <div className="h-[1px] w-full bg-gold mt-2" />
                <div className="text-sm font-light tracking-[0.3em] text-gold mt-1">
                    WATCHNIGHT {WATCHNIGHT_CONFIG.theme.year}
                </div>
            </div>
        </div>
    );
};

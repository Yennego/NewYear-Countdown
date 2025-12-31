"use client";

import React, { useState, useEffect } from "react";
import { WaitingRoom } from "@/components/visuals/WaitingRoom";
import { AwakeningRoom } from "@/components/visuals/AwakeningRoom";
import { SacredMoment } from "@/components/visuals/SacredMoment";
import { MidnightMoment } from "@/components/visuals/MidnightMoment";
import { PrayerRoom } from "@/components/visuals/PrayerRoom";
// Other phases will be imported as they are built

type Phase = "waiting" | "awakening" | "sacred" | "midnight" | "prayer";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("waiting");
  const [isAuto, setIsAuto] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!isAuto) return;

    const checkTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      // Phase Transitions Logic
      // Awakening: 11:00 PM (23:00)
      // Sacred: 11:59 PM (23:59)
      // Midnight: 12:00 AM (00:00)

      if (hours === 0 && minutes >= 0) {
        setPhase("midnight");
      } else if (hours === 23 && minutes === 59) {
        setPhase("sacred");
      } else if (hours === 23 && minutes >= 0) {
        setPhase("awakening");
      } else {
        setPhase("waiting");
      }
    };

    const interval = setInterval(checkTime, 1000);
    checkTime(); // Initial check
    return () => clearInterval(interval);
  }, [isAuto]);

  // For development: Keyboard shortcuts to switch phases
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["1", "2", "3", "4", "5"].includes(e.key)) {
        setIsAuto(false); // Disable auto-mode if user manually overrides
      }

      switch (e.key) {
        case "1": setPhase("waiting"); break;
        case "2": setPhase("awakening"); break;
        case "3": setPhase("sacred"); break;
        case "4": setPhase("midnight"); break;
        case "5": setPhase("prayer"); break;
        case "a": setIsAuto(true); break; // Press 'A' to re-enable auto-mode
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!hasMounted) return null;

  return (
    <main className="relative min-h-screen w-full bg-black text-white font-sans selection:bg-gold selection:text-black">
      {/* Auto-mode indicator (subtle) */}
      <div className="fixed top-4 right-4 z-[100] text-[10px] tracking-widest text-white/20 uppercase pointer-events-none">
        {isAuto ? "Mode: Automatic (Clock Sync)" : "Mode: Manual (Override Active - Press 'A' for Auto)"}
      </div>

      {phase === "waiting" && <WaitingRoom />}
      {phase === "awakening" && <AwakeningRoom />}
      {phase === "sacred" && <SacredMoment isAuto={isAuto} />}
      {phase === "midnight" && <MidnightMoment isAuto={isAuto} />}
      {phase === "prayer" && <PrayerRoom />}

      {/* Placeholder for other phases */}
      {phase !== "waiting" && (
        <div className="flex h-screen items-center justify-center cinematic-bg">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-[0.2em] text-gold uppercase animate-pulse">
              Phase: {phase.toUpperCase()}
            </h1>
            <p className="mt-4 text-white/50 italic">Implementing this phase soon...</p>
            <p className="mt-8 text-xs text-white/20">Press 1-5 to switch phases manually</p>
          </div>
        </div>
      )}
    </main>
  );
}

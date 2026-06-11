"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const hasPreloaded = sessionStorage.getItem("hasPreloaded");
    if (hasPreloaded) {
      setShow(false);
    } else {
      // Hide the preloader after 1.6s
      const timer = setTimeout(() => {
        setShow(false);
        sessionStorage.setItem("hasPreloaded", "true");
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.6, ease: "easeInOut" }
          }}
          className="preloader-container fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950"
        >
          {/* Subtle ambient light behind loader */}
          <div className="absolute w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative flex flex-col items-center z-10">
            {/* Elegant SVG Spinner */}
            <div className="relative w-24 h-24">
              {/* Outer decorative ring */}
              <svg className="w-full h-full animate-[spin_3s_linear_infinite]" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="stroke-orange-500/20 fill-none stroke-[2]"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="stroke-orange-500 fill-none stroke-[3]"
                  strokeDasharray="260"
                  strokeDashoffset="180"
                  strokeLinecap="round"
                />
              </svg>
              {/* Inner fast ring (reverse) */}
              <div className="absolute inset-3 animate-[spin_1.5s_linear_infinite_reverse]">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-amber-400 fill-none stroke-[3]"
                    strokeDasharray="240"
                    strokeDashoffset="120"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              {/* Pulsing Core dot */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-orange-500 rounded-full animate-ping opacity-75" />
                <div className="absolute w-3.5 h-3.5 bg-orange-500 rounded-full" />
              </div>
            </div>

            {/* Brand details */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-8 text-xl font-bold tracking-[0.3em] text-white uppercase text-center"
            >
              Sabka Saathi
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-400"
            >
              Digital Excellence
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

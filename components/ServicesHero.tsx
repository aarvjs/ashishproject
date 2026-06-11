"use client";

import { motion } from "framer-motion";

export function ServicesHero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-4 md:pt-12 max-w-5xl mx-auto px-4 z-10">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/45 px-6 py-12 md:py-16 text-center shadow-[0_20px_50px_rgba(39,83,166,0.04)] backdrop-blur-xl">
        {/* Subtle background mesh dot patterns */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{
            backgroundImage: "radial-gradient(#ff9500 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }} 
        />
        {/* Soft background glow blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-orange-400/5 blur-[100px] rounded-full pointer-events-none -z-10" />

        <div className="relative z-10 flex flex-col items-center gap-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 text-[10px] font-black uppercase tracking-widest"
          >
            Capabilities
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-3xl sm:text-5xl md:text-7.5xl font-black text-slate-955 tracking-tight leading-tight"
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500 italic">Expertise</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-xs sm:text-sm md:text-lg leading-relaxed text-slate-600 font-medium max-w-xl mx-auto px-2"
          >
            High-performance digital products built with modern stacks to drive real-world business outcomes.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

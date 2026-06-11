"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import OrbitImages from "./OrbitImages";

import { Briefcase, MapPin, Users } from "lucide-react";

function StatCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, value, { duration: 2, ease: "easeOut" });
    return controls.stop;
  }, [value, count]);

  return (
    <div className="flex items-baseline justify-center">
      <motion.span className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
        {rounded}
      </motion.span>
      <span className="text-xl font-black text-orange-500 ml-0.5">{suffix}</span>
    </div>
  );
}

const images = [
  "https://picsum.photos/id/1/300/300",
  "https://picsum.photos/id/2/300/300",
  "https://picsum.photos/id/3/300/300",
  "https://picsum.photos/id/4/300/300",
  "https://picsum.photos/id/5/300/300",
  "https://picsum.photos/id/6/300/300",
];

export function StatsShowcase() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50/50 py-16 md:py-24">
      {/* Background Orbits - Deep Layer (Desktop only) */}
      <div className="absolute inset-0 pointer-events-none opacity-30 select-none overflow-hidden hidden md:block">
        <div className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <OrbitImages
            images={images}
            shape="ellipse"
            radiusX={800}
            radiusY={600}
            rotation={-8}
            duration={40}
            itemSize={120}
            responsive={true}
            showPath={false}
          />
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4 max-w-5xl">
        <div className="flex flex-col items-center gap-12 text-center">
          
          {/* Main Title Block */}
          <div className="max-w-2xl mx-auto text-center">
             <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-orange-500">Milestones</p>
             <h2 className="text-3xl font-black text-slate-900 md:text-4xl tracking-tight leading-tight">
               Local Businesses Served Across India
             </h2>
             <p className="mt-3 text-slate-500 font-medium text-xs md:text-sm leading-relaxed">
               Empowering startups, retail brands, and regional companies with modern technology.
             </p>
          </div>

          {/* 3 Compact Cards Grid */}
          <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            
            {/* Card 1: Served Clients */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5 }}
               className="group relative rounded-2xl border border-orange-100/50 bg-white/60 p-5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:bg-white hover:border-orange-300 hover:-translate-y-1 hover:shadow-md"
            >
               <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600 mb-3.5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="flex items-baseline justify-center">
                    <StatCounter value={100} suffix="+" />
                  </div>
                  <h3 className="mt-2 text-base font-bold text-slate-900">Local Businesses</h3>
                  <p className="mt-1.5 text-xs text-slate-500 font-medium leading-relaxed">Empowering local entrepreneurs and startups to launch online.</p>
               </div>
            </motion.div>

            {/* Card 2: Projects Delivered */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: 0.08 }}
               className="group relative rounded-2xl border border-orange-100/50 bg-white/60 p-5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:bg-white hover:border-orange-300 hover:-translate-y-1 hover:shadow-md"
            >
               <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600 mb-3.5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div className="flex items-baseline justify-center">
                    <StatCounter value={50} suffix="+" />
                  </div>
                  <h3 className="mt-2 text-base font-bold text-slate-900">Projects Delivered</h3>
                  <p className="mt-1.5 text-xs text-slate-500 font-medium leading-relaxed">High-fidelity web designs and custom mobile applications.</p>
               </div>
            </motion.div>

            {/* Card 3: Strategic Hubs */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: 0.16 }}
               className="group relative rounded-2xl border border-orange-100/50 bg-white/60 p-5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:bg-white hover:border-orange-300 hover:-translate-y-1 hover:shadow-md"
            >
               <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600 mb-3.5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex items-baseline justify-center">
                    <StatCounter value={3} suffix=" Hubs" />
                  </div>
                  <div className="mt-2.5 flex flex-wrap gap-1 justify-center">
                    {["Gujarat", "Bihar", "Maharashtra"].map(state => (
                      <span key={state} className="rounded bg-orange-50 px-2 py-0.5 text-[8px] font-black text-orange-600 border border-orange-100/70 uppercase tracking-wider">
                        {state}
                      </span>
                    ))}
                  </div>
                  <p className="mt-2.5 text-xs text-slate-500 font-medium leading-relaxed">Strategic development offices providing local support.</p>
               </div>
            </motion.div>

          </div>

          {/* Mobile static brand grid */}
          <div className="md:hidden mt-4 w-full">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 text-center">
              Trusted Partner Networks
            </p>
            <div className="grid grid-cols-3 gap-3 max-w-[280px] mx-auto">
              {images.map((src, idx) => (
                <div key={idx} className="aspect-square rounded-2xl bg-white/40 border border-white/60 p-1.5 shadow-sm backdrop-blur-sm flex items-center justify-center overflow-hidden">
                  <img
                    src={src}
                    alt={`Partner Logo ${idx + 1}`}
                    className="w-full h-full object-cover rounded-xl"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Subtle floor gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent shadow-[0_4px_20px_rgba(255,149,0,0.1)]" />
    </section>
  );
}

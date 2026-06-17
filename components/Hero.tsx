"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

function AnimatedNumber({ value }: { value: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  
  useEffect(() => {
    const controls = animate(count, value, { duration: 2, ease: "easeOut" });
    return controls.stop;
  }, [value, count]);

  return <motion.span>{rounded}</motion.span>;
}
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Rocket, Users, ChevronDown } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section id="home" className="-mt-24 relative overflow-hidden min-h-screen flex items-center pt-44 pb-12 md:pb-24 lg:pb-32 z-0">
      {/* Fullscreen Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      >
        <source src="/images/herobagourdveido.mp4" type="video/mp4" />
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260518_003132_8b7edcb6-c64d-4a52-a9ca-879942e122ad.mp4" type="video/mp4" />
      </video>

      {/* Light White/Cream/Orange Overlay - Clear & High Contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/35 via-orange-50/20 to-white/40 z-10 pointer-events-none" />

      {/* Background Gradients from website theme */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,149,0,0.06),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(255,210,0,0.04),transparent_35%)] z-15" />

      <div className="container mx-auto max-w-7xl px-4 relative z-20 w-full">
        <div className="relative flex min-h-[auto] md:min-h-[calc(100vh-180px)] max-h-[900px] flex-col items-center justify-between overflow-hidden px-4 py-10 md:py-16 md:px-16 w-full">

          {/* Central Content Stack with Staggered Entrance Animations */}
          <div className="relative z-30 flex flex-col items-center text-center gap-5 mt-8 md:mt-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="w-fit">Next-Gen Digital Solutions</Badge>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="max-w-4xl text-3xl sm:text-4xl md:text-6xl lg:text-7.5xl font-black leading-tight text-slate-955 tracking-tight"
            >
              Building Digital Excellence with <span className="text-orange-600">Sabka Saathi</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              className="max-w-2xl text-xs sm:text-sm md:text-lg leading-relaxed text-slate-600 font-medium px-2"
            >
              We transform your ideas into powerful, scalable software. From custom web 
              platforms to cutting-edge mobile apps, we deliver solutions that drive growth.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col items-center justify-center gap-3.5 sm:flex-row mt-4 w-full max-w-sm sm:max-w-none px-4"
            >
              <Link href="/contact" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto rounded-full px-10 py-4 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300">
                  Start a Project
                </Button>
              </Link>
              <Link href="#portfolio" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto rounded-full px-10 py-4 bg-white/50 backdrop-blur-sm border-white/60 hover:bg-white/80">
                  Our Portfolio
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Live Performance Panel - Bottom Left */}
          <motion.div 
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-10 bottom-10 z-40 hidden flex-col gap-5 2xl:flex"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="group relative w-56 overflow-hidden rounded-2xl border border-white/70 bg-white/20 p-5 shadow-[0_12px_40px_rgba(255,149,0,0.08)] backdrop-blur-md"
            >
              {/* Pulsing Live Indicator */}
              <div className="absolute right-4 top-4 flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-orange-500/80">Live</span>
              </div>

              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Live Projects</p>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600">
                  <Rocket className="w-4 h-4" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-slate-900 group-hover:scale-110 transition-transform duration-300">
                    <AnimatedNumber value={8} />
                  </span>
                </div>
              </div>
              <p className="mt-1 text-[10px] text-slate-400">Successfully running</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="group relative w-56 overflow-hidden rounded-2xl border border-white/70 bg-white/20 p-5 shadow-[0_12px_40px_rgba(255,149,0,0.08)] backdrop-blur-md"
            >
               {/* Pulsing Live Indicator */}
               <div className="absolute right-4 top-4 flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-500/80">Live</span>
              </div>

              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Active Experts</p>
              <div className="mt-3 flex items-center gap-2 text-3xl font-bold text-slate-900">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                  <Users className="w-4 h-4" />
                </div>
                <span className="group-hover:scale-110 transition-transform duration-300">
                   <AnimatedNumber value={30} />
                </span>
              </div>
              <div className="mt-2 flex gap-3 text-[9px] font-bold text-slate-500">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-orange-400" /> <span className="text-slate-900">17</span> Developers</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> <span className="text-slate-900">13</span> Designers</span>
              </div>
              
              {/* Subtle background glow for the card */}
              <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-orange-400/5 blur-3xl" />
            </motion.div>
          </motion.div>

          <div className="absolute right-5 bottom-10 hidden h-32 w-32 items-center justify-center md:flex z-40">
            <svg className="absolute h-full w-full animate-[spin_15s_linear_infinite]" viewBox="0 0 100 100">
              <defs>
                <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
              </defs>
              <text className="fill-slate-500 font-mono text-[8px] font-bold uppercase tracking-[0.2em]">
                <textPath xlinkHref="#circlePath">
                  • Scroll Down • Scroll Down • Scroll Down
                </textPath>
              </text>
            </svg>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/30 text-slate-600 backdrop-blur-sm shadow-sm">
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

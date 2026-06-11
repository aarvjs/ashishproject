"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { User } from "lucide-react";

export function FounderSection() {
  return (
    <section className="py-12 md:py-16 relative overflow-hidden bg-white/50 border-t border-slate-100/80">
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100/30 blur-[100px] rounded-full -mr-48 -mt-48 pointer-events-none" />
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Compact yet large photo container */}
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-[320px] sm:max-w-sm">
              <div className="absolute -inset-3 bg-gradient-to-tr from-orange-500/15 to-rose-500/15 blur-xl rounded-[2.5rem] -rotate-3 pointer-events-none" />
              <div className="relative aspect-[4/5] rounded-[2rem] bg-slate-950 border-4 border-white shadow-2xl overflow-hidden group flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-slate-950/10 to-transparent z-10 pointer-events-none" />
                <Image
                  src="/team/ashish-kumar.jpeg"
                  alt="Ashish Kumar - Founder of Sabka Saathi"
                  fill
                  sizes="(max-w-768px) 320px, 384px"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
                  onError={(e) => {
                    (e.target as any).style.display = 'none';
                  }}
                />
                <User className="w-16 h-16 text-slate-800" />
                
                {/* Premium Card Overlay Badge - Overlayed at bottom of image for both mobile and desktop */}
                <div className="absolute bottom-4 left-4 right-4 z-20 bg-slate-950/80 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-xl transition-all duration-300 group-hover:bg-slate-950/90 text-left">
                  <h4 className="text-base sm:text-lg font-black text-white leading-tight">Ashish Kumar</h4>
                  <p className="text-orange-400 font-bold uppercase tracking-widest text-[8px] sm:text-[9px] mt-1">Founder, Sabka Saathi</p>
                  <div className="mt-2.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider">Verified Identity</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column: Content */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-[10px] font-black uppercase tracking-widest mb-4">Our Vision</div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Making Digital Growth <span className="text-orange-500 italic">Accessible</span></h2>
              <div className="space-y-4 text-slate-600 font-medium text-sm md:text-base leading-relaxed">
                <p>
                  &quot;Sabka Saathi Digital Services was started with a simple vision — to make digital growth accessible for every business, especially those in small towns and local markets.&quot;
                </p>
                <p>
                  <strong>Ashish Kumar</strong>&nbsp;recognized that many businesses &amp; Startups have the potential to grow but lack the right digital support. This platform was built to bridge that gap and provide simple, effective, and practical digital solutions.
                </p>
                <p className="text-slate-900 font-bold">
                  The goal is clear — to empower thousands of businesses to build a strong online presence and unlock new growth opportunities.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Link href="/trust">
                <Button variant="outline" className="rounded-xl px-8 py-3.5 border-slate-200 hover:bg-slate-50 text-xs uppercase tracking-wider font-bold">Legal & Trust Info</Button>
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

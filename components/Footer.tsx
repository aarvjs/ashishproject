"use client";

import Link from "next/link";
import { Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 py-16 md:py-24 text-white relative z-10 overflow-hidden border-t border-white/5">
      {/* Large Subtle Outline SVG Watermark Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none select-none opacity-[0.02] sm:opacity-[0.025]">
        <svg viewBox="0 0 1000 300" className="w-full h-full max-h-[85%]">
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-black tracking-[0.2em] text-[110px] sm:text-[130px] fill-none stroke-white stroke-[2]"
          >
            SABKA SAATHI
          </text>
        </svg>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-10 lg:gap-16">
          
          {/* Logo Column - full span on mobile, 4 cols on desktop */}
          <div className="col-span-2 md:col-span-4 text-left">
            <h3 className="text-2xl font-black mb-4 tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">
              SABKA SAATHI
            </h3>
            <p className="text-slate-400 max-w-sm mb-6 text-sm font-medium leading-relaxed">
              Premium software development agency specializing in Next.js, CRM automation, and high-fidelity digital transformation.
            </p>
            <div className="flex gap-3">
              <a 
                href="tel:+919431673018" 
                aria-label="Call Sabka Saathi" 
                className="h-11 w-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all shadow-lg active:scale-95 text-slate-400"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a 
                href="mailto:helpsabkasaathi@gmail.com" 
                aria-label="Email Sabka Saathi" 
                className="h-11 w-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all shadow-lg active:scale-95 text-slate-400"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          {/* Platform Links - 1 col on mobile, 2 cols on desktop */}
          <div className="col-span-1 md:col-span-2 text-left">
            <h4 className="font-black mb-6 uppercase tracking-[0.2em] text-orange-500 text-[10px]">Platform</h4>
            <ul className="space-y-3.5 text-slate-350 font-bold text-xs">
              <li><Link href="/" className="hover:text-white hover:translate-x-1.5 transition-all inline-block">Home</Link></li>
              <li><Link href="/services" className="hover:text-white hover:translate-x-1.5 transition-all inline-block">Services</Link></li>
              <li><Link href="/industries" className="hover:text-white hover:translate-x-1.5 transition-all inline-block">Industries</Link></li>
              <li><Link href="/trust" className="hover:text-white hover:translate-x-1.5 transition-all inline-block">Legal & Trust</Link></li>
              <li><Link href="/about" className="hover:text-white hover:translate-x-1.5 transition-all inline-block">About Us</Link></li>
              <li><Link href="/faq" className="hover:text-white hover:translate-x-1.5 transition-all inline-block">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact Links - 1 col on mobile, 3 cols on desktop */}
          <div className="col-span-1 md:col-span-3 text-left">
            <h4 className="font-black mb-6 uppercase tracking-[0.2em] text-orange-500 text-[10px]">Contact</h4>
            <ul className="space-y-3.5 text-slate-350 font-bold text-xs">
              <li><Link href="/contact" className="hover:text-white hover:translate-x-1.5 transition-all inline-block">Get a Quote</Link></li>
              <li><a href="https://wa.me/919431673018" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:translate-x-1.5 transition-all inline-block">WhatsApp Support</a></li>
              <li className="text-slate-500 font-medium select-all">9431673018</li>
              <li className="text-slate-500 font-medium lowercase select-all text-ellipsis overflow-hidden">helpsabkasaathi@gmail.com</li>
            </ul>
          </div>
          
          {/* Regional Hubs - full width on mobile, 3 cols on desktop */}
          <div className="col-span-2 md:col-span-3 text-left">
            <h4 className="font-black mb-6 uppercase tracking-[0.2em] text-orange-500 text-[10px]">Regional Hubs</h4>
            <ul className="space-y-4.5 text-slate-350 font-bold text-xs">
              <li className="flex flex-col gap-0.5">
                <Link href="/location/bihar" className="hover:text-white transition-colors">Bihar Hub</Link>
                <span className="text-[10px] font-medium text-slate-500">Patna, Muzaffarpur, Gaya, Sheikhpura</span>
              </li>
              <li className="flex flex-col gap-0.5">
                <Link href="/location/gujarat" className="hover:text-white transition-colors">Gujarat Hub</Link>
                <span className="text-[10px] font-medium text-slate-500">Surat, Ahmedabad, Rajkot, Bhavnagar</span>
              </li>
              <li className="flex flex-col gap-0.5">
                <Link href="/location/maharashtra" className="hover:text-white transition-colors">Maharashtra Tech Pivot</Link>
                <span className="text-[10px] font-medium text-slate-500">Pune, Mumbai, Nagpur</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 text-[9px] font-black uppercase tracking-[0.2em]">
          <p>© 2026 SABKA SAATHI. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6 items-center">
            <p className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-slate-400">GSTIN: 10LAHPK8872L1Z3</p>
          </div>
        </div>
      </div>
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none -translate-x-1/2 translate-y-1/2" />
    </footer>
  );
}

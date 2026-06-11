"use client";

import { motion } from "framer-motion";
import { Card } from "./ui/Card";
import Link from "next/link";
import { 
  Brain, 
  Compass, 
  Palette, 
  Code, 
  Terminal, 
  Link as LinkIcon, 
  ShieldCheck, 
  Rocket, 
  BarChart3, 
  RefreshCw, 
  Zap 
} from "lucide-react";

interface ProcessStep {
  title: string;
  subtitle: string;
  description: string;
  output: string;
  slug: string;
  isImportant?: boolean;
}

const steps: ProcessStep[] = [
  {
    title: "Discovery",
    subtitle: "Requirement Phase",
    description: "Understand needs, audience, and budget. Output: SRS Document.",
    output: "SRS",
    slug: "discovery"
  },
  {
    title: "Strategy",
    subtitle: "Sitemap & Features",
    description: "Plan features, tech stack (Next.js), and SEO roadmap.",
    output: "Roadmap",
    slug: "strategy"
  },
  {
    title: "UI/UX",
    subtitle: "High-Fidelity",
    description: "Figma design with a mobile-first, premium branding approach.",
    output: "Final Design",
    slug: "ui-ux"
  },
  {
    title: "Frontend",
    subtitle: "Interactive UI",
    description: "Next.js UI development with smooth animations and UX polish.",
    output: "Live UI",
    slug: "frontend"
  },
  {
    title: "Backend",
    subtitle: "Database & Logic",
    description: "API build, Authentication, and Database (MongoDB) setup.",
    output: "Full Logic",
    slug: "backend"
  },
  {
    title: "Integration",
    subtitle: "Connection",
    description: "Payment gateways (Razorpay/Stripe) and Email systems.",
    output: "Connected App",
    slug: "integration"
  },
  {
    title: "Testing",
    subtitle: "Quality Check",
    description: "Rigorous bug, speed, and security testing for stability.",
    output: "Stable Build",
    slug: "testing"
  },
  {
    title: "Deployment",
    subtitle: "Launch",
    description: "VPS/Cloud setup with Domain, SSL, and CI/CD pipelines.",
    output: "Live Product",
    slug: "deployment"
  },
  {
    title: "CRM System",
    subtitle: "REVENUE CORE",
    description: "MOST IMPORTANT: Admin dashboard, Automation, and Analytics.",
    output: "Growth Engine",
    isImportant: true,
    slug: "crm-system"
  },
  {
    title: "Scaling",
    subtitle: "Maintenance",
    description: "Regular updates, backups, and future scaling upgrades.",
    output: "Long-term Value",
    slug: "maintenance"
  }
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "discovery": Brain,
  "strategy": Compass,
  "ui-ux": Palette,
  "frontend": Code,
  "backend": Terminal,
  "integration": LinkIcon,
  "testing": ShieldCheck,
  "deployment": Rocket,
  "crm-system": BarChart3,
  "maintenance": RefreshCw
};

export function ProcessSection({ hideHeader = false }: { hideHeader?: boolean }) {
  const phase1Steps = steps.slice(0, 5);
  const phase2Steps = steps.slice(5, 10);

  return (
    <section id="how-it-works" className="py-12 md:py-16 overflow-hidden w-full">
      {/* Title block */}
      {!hideHeader && (
        <div className="container mx-auto px-4 mb-10">
          <div className="flex flex-col items-center text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-black uppercase tracking-[0.3em] text-orange-500"
            >
              Epic Journey
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-3 text-3xl font-black text-slate-900 md:text-5xl tracking-tight"
            >
              The Product Roadmap
            </motion.h2>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-8 md:gap-12 w-full">
        {/* Phase 1: Core Build (Moves Right-to-Left) */}
        <div className="relative w-full">
          <div className="container mx-auto px-6 mb-3">
            <h3 className="text-lg md:text-xl font-black text-slate-900 flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-orange-500 text-white text-xs font-black">01</span>
              Phase 01: Core Development
            </h3>
          </div>
          
          {/* Infinite Marquee Container */}
          <div className="w-full overflow-hidden relative">
            {/* Left and Right blur overlay gradient for marquee depth */}
            <div className="absolute top-0 bottom-0 left-0 w-12 md:w-24 bg-gradient-to-r from-[#fffdf5] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-12 md:w-24 bg-gradient-to-l from-[#fffdf5] to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee-left flex gap-6 py-4 px-4">
              {/* Sliced elements duplicated to produce a seamless loop */}
              {phase1Steps.map((step, index) => (
                <StepCard key={`p1-${step.slug}-${index}`} step={step} index={index} />
              ))}
              {phase1Steps.map((step, index) => (
                <StepCard key={`p1-dup-${step.slug}-${index}`} step={step} index={index + 5} />
              ))}
            </div>
          </div>
        </div>

        {/* Phase 2: Success & Scale (Moves Left-to-Right) */}
        <div className="relative w-full">
          <div className="container mx-auto px-6 mb-3">
            <h3 className="text-lg md:text-xl font-black text-slate-900 flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-orange-500 text-white text-xs font-black">02</span>
              Phase 02: Growth & Scaling
            </h3>
          </div>

          {/* Infinite Marquee Container */}
          <div className="w-full overflow-hidden relative">
            {/* Left and Right blur overlay gradient for marquee depth */}
            <div className="absolute top-0 bottom-0 left-0 w-12 md:w-24 bg-gradient-to-r from-[#fffdf5] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-12 md:w-24 bg-gradient-to-l from-[#fffdf5] to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee-right flex gap-6 py-4 px-4">
              {/* Sliced elements duplicated to produce a seamless loop */}
              {phase2Steps.map((step, index) => (
                <StepCard key={`p2-${step.slug}-${index}`} step={step} index={index} />
              ))}
              {phase2Steps.map((step, index) => (
                <StepCard key={`p2-dup-${step.slug}-${index}`} step={step} index={index + 5} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, index }: { step: ProcessStep; index: number }) {
  const IconComponent = iconMap[step.slug] || Brain;
  const isImportant = step.isImportant;

  return (
    <div className="w-[280px] md:w-[320px] flex-shrink-0 group relative">
      <Link href={`/process/${step.slug}`}>
        <Card className={`flex flex-col h-[200px] md:h-[220px] rounded-[2rem] p-5 md:p-6 transition-all duration-500 hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1 ${
          isImportant ? "border-orange-500 bg-orange-50/70" : "bg-white/80 border-white/60"
        } backdrop-blur-xl border`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <IconComponent className="w-5 h-5 md:w-6 md:h-6" />
              </span>
              <div>
                <p className="text-[8px] font-black uppercase tracking-widest text-orange-500">Step {String((index % 5) + 1).padStart(2, '0')}</p>
                <h4 className="text-sm md:text-base font-black text-slate-900 group-hover:text-orange-600 transition-colors">{step.title}</h4>
              </div>
            </div>
            {isImportant && (
              <span className="rounded-full bg-orange-500 px-2.5 py-0.5 text-[7px] font-black text-white uppercase tracking-wider flex items-center gap-0.5 animate-pulse">
                <Zap className="w-2 h-2 fill-white" />
                HOT
              </span>
            )}
          </div>

          <div className="mt-4 flex-1">
             <div className="flex items-center gap-1 mb-1">
               {isImportant && <Zap className="w-2.5 h-2.5 text-orange-500 fill-orange-500" />}
               <p className="text-[8px] md:text-[9px] font-black uppercase tracking-wider text-slate-400">{step.subtitle}</p>
             </div>
             <p className="text-[11px] md:text-xs leading-relaxed text-slate-500 font-medium line-clamp-3 group-hover:line-clamp-none transition-all">{step.description}</p>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-slate-100/50 pt-3.5">
             <div className="flex items-center gap-2">
               <span className="text-[8px] font-black text-orange-600 uppercase tracking-wider">Deliverable:</span>
               <span className="text-[9px] md:text-[10px] font-black text-slate-800">{step.output}</span>
             </div>
             <span className="text-[9px] md:text-[10px] text-slate-300 font-black">0{String((index % 5) + 1)}</span>
          </div>
        </Card>
      </Link>
    </div>
  );
}

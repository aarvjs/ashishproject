import { Metadata } from "next";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ProcessSection } from "@/components/ProcessSection";
import { Navbar } from "@/components/Navbar";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { expertiseContent } from "@/lib/content";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { ProjectsShowcase } from "@/components/ProjectsShowcase";
import { Globe, Smartphone, Cpu, Calculator, Briefcase, Megaphone, Search, CheckCircle2 } from "lucide-react";

// Android Icon component fallback
const AndroidIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 2v2M5 11h14M6 11c0-3.3 2.7-6 6-6s6 2.7 6 6M6 11v6c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-6M9 19v3M15 19v3M4 12v3M20 12v3" />
  </svg>
);

const iconMap: Record<string, React.ComponentType<any>> = {
  Globe: Globe,
  Smartphone: Smartphone,
  Android: AndroidIcon,
  Cpu: Cpu,
  Calculator: Calculator,
  Briefcase: Briefcase,
  Megaphone: Megaphone,
  Search: Search,
};

export const metadata: Metadata = {
  title: "Our Services | Web & App Development - Sabka Saathi",
  description: "Explore our software engineering capabilities: custom web development, mobile apps, SaaS, cloud services, and custom CRM systems designed for growth.",
  alternates: {
    canonical: "https://sabkasathi.com/services",
  },
  openGraph: {
    title: "Our Services | Web & App Development - Sabka Saathi",
    description: "Explore our software engineering capabilities: custom web development, mobile apps, SaaS, cloud services, and custom CRM systems designed for growth.",
    url: "https://sabkasathi.com/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Services | Web & App Development - Sabka Saathi",
    description: "Explore our software engineering capabilities: custom web development, mobile apps, SaaS, cloud services, and custom CRM systems designed for growth.",
  },
};

export default function ServicesPage() {
  const expertiseAreas = Object.values(expertiseContent);
  return (
    <div className="flex min-h-screen flex-col">
      <InteractiveBackground />
      <Navbar />
      <main className="flex-1 pt-0">
        {/* Header Section */}
        <PageHero
          badge="What We Build"
          title="Our Expertise &"
          titleHighlight="Capabilities"
          subtitle="High-performance digital products built with modern stacks to drive real-world business outcomes."
          type="services"
          ctaText="Start a Project"
          ctaHref="/contact"
        />

        {/* Services Grid Section */}
        <section className="py-16 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {expertiseAreas.map((area) => {
              const IconComponent = iconMap[area.icon] || Cpu;
              return (
                <Link key={area.slug} href={`/expertise/${area.slug}`} className="block h-full">
                  <div className="service-card-liquid group relative flex flex-col justify-between h-full bg-white border border-slate-100/80 rounded-[2rem] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.015)] hover:border-transparent hover:shadow-[0_20px_50px_rgba(255,149,0,0.15)] transition-all duration-500 cursor-pointer">
                    
                    {/* Visual Image/Illustration */}
                    <div className="relative w-full h-40 rounded-2xl overflow-hidden mb-6 bg-slate-50 border border-slate-100/50">
                      <img
                        src={`/images/services/${area.slug}.png`}
                        alt={area.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    {/* Title and Icon */}
                    <div className="flex items-center gap-3 mb-4 z-10 relative">
                      <div className="p-2.5 rounded-xl bg-orange-50 text-orange-500 border border-orange-100/50 group-hover:bg-white/20 group-hover:text-white group-hover:border-white/10 transition-all duration-500 shrink-0">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-black text-slate-800 tracking-tight leading-tight group-hover:text-white transition-colors duration-500">
                        {area.title}
                      </h3>
                    </div>

                    {/* Short Description */}
                    <p className="text-[11px] text-slate-500 font-semibold leading-relaxed mb-5 group-hover:text-orange-50 transition-colors duration-500 z-10 relative">
                      {area.description}
                    </p>

                    {/* Feature Points */}
                    <ul className="space-y-2.5 mb-6 flex-1 z-10 relative">
                      {area.features?.slice(0, 4).map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-[11px] font-bold text-slate-600 group-hover:text-white transition-colors duration-500">
                          <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 group-hover:text-orange-200 transition-colors duration-500 shrink-0" />
                          <span className="truncate">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <div className="mt-auto pt-2 z-10 relative">
                      <div className="w-full py-3 rounded-xl border border-slate-200 bg-slate-50 text-center text-[10px] font-black uppercase tracking-widest text-slate-650 group-hover:bg-white group-hover:text-orange-600 group-hover:border-white transition-all duration-500 shadow-xs">
                        Learn More
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Dynamic Projects Showcase */}
        <section className="py-16 bg-gradient-to-b from-transparent via-orange-50/10 to-transparent border-y border-slate-100/40">
          <ProjectsShowcase />
        </section>

        <FeaturesSection />
        
        <div className="container mx-auto px-4">
            <ProcessSection />
        </div>
        
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sabka Saathi - High-Performance Software Development & CRM Automation",
  description: "Accelerate your business with Sabka Saathi. We build custom Next.js web applications, mobile apps, and CRM systems for startups and local businesses across India.",
  keywords: [
    "software development company",
    "next.js development",
    "custom software bihar",
    "software agency pune",
    "web development gujarat",
    "CRM automation india",
    "mobile app development",
    "startup website builders",
    "GST registered software agency"
  ],
  openGraph: {
    title: "Sabka Saathi - High-Performance Software Development & CRM Automation",
    description: "Accelerate your business with Sabka Saathi. We build custom Next.js web applications, mobile apps, and CRM systems for startups and local businesses across India.",
    url: "https://sabkasathi.com",
    siteName: "Sabka Saathi",
    images: [{ url: "/logo.png", width: 800, height: 600, alt: "Sabka Saathi Digital Services Logo" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sabka Saathi - High-Performance Software Development & CRM Automation",
    description: "Accelerate your business with Sabka Saathi. Custom Next.js web applications, mobile apps, and CRM systems.",
    images: ["/logo.png"],
  },
};

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ContactSection } from "@/components/ContactSection";
import { Hero } from "@/components/Hero";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { Navbar } from "@/components/Navbar";
import { StatsShowcase } from "@/components/StatsShowcase";
import { ProcessSection } from "@/components/ProcessSection";
import { FounderSection } from "@/components/FounderSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { PortfolioShowcase } from "@/components/PortfolioShowcase";
import Link from "next/link";
import { ShoppingBag, Heart, GraduationCap, Briefcase } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <InteractiveBackground />
      <Navbar />
      <main className="flex-1">
        <Hero />

        {/* SEO Internal Linking: Regional Success */}
        <section className="bg-orange-50/30 py-16 border-y border-orange-100/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 blur-3xl rounded-full -mr-32 -mt-32" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              Premier Software Development in <span className="text-orange-500">Gujarat, Maharashtra & Bihar</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { name: "Gujarat", slug: "gujarat", cities: "Ahmedabad, Surat, Rajkot, Bhavnagar" },
                { name: "Maharashtra", slug: "maharashtra", cities: "Pune, Mumbai, Nagpur" },
                { name: "Bihar", slug: "bihar", cities: "Patna, Muzaffarpur, Gaya, Sheikhpura" }
              ].map((region) => (
                <Link 
                  key={region.name} 
                  href={`/location/${region.slug}`}
                  className="group flex flex-col p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-orange-100 shadow-sm hover:shadow-xl hover:border-orange-300 transition-all duration-300 min-w-[240px]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl font-bold text-slate-800 group-hover:text-orange-600 transition-colors">{region.name}</span>
                    <span className="text-orange-400 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium text-left">{region.cities}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <StatsShowcase />

        <PortfolioShowcase />

        <div className="py-12 bg-white/30 border-y border-slate-100">
          <div className="container mx-auto px-4">
             <div className="flex flex-col items-center mb-10">
                <h2 className="text-4xl font-black text-slate-900 text-center mb-4">Our <span className="text-orange-500">Process</span></h2>
                <p className="text-slate-600 font-medium text-center max-w-2xl mb-6">Detailed discovery, agile development, and continuous delivery to ensure your project&apos;s success.</p>
                <Link href="/services">
                  <Button className="rounded-full px-10 border-orange-500 text-orange-600 animate-pulse hover:animate-none" variant="outline">Explore Services →</Button>
                </Link>
             </div>
             <ProcessSection hideHeader />
          </div>
        </div>

        <div className="pt-10 pb-16 md:pt-14 md:pb-20 bg-gradient-to-b from-slate-50/20 to-white">
           <div className="container mx-auto px-4 max-w-5xl">
              <div className="flex flex-col items-center mb-12 text-center">
                <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-orange-500">Market Reach</p>
                <h2 className="text-3xl md:text-4.5xl font-black text-slate-900 mb-4">Industries We <span className="text-orange-500 italic font-black">Empower</span></h2>
                <p className="text-slate-500 font-medium text-xs md:text-sm max-w-xl leading-relaxed">From Healthcare to E-commerce, we serve 50+ business sectors with custom-tailored technology.</p>
              </div>

              {/* 4 Industries Preview Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
                {[
                  {
                    title: "Startups & Retail",
                    desc: "Digital setup, branding, and e-commerce growth strategies for new business ideas.",
                    icon: ShoppingBag,
                    colorClass: "border-l-4 border-l-orange-500/80 hover:border-orange-500 liquid-card-orange",
                    iconColor: "text-orange-600 bg-orange-500/10",
                  },
                  {
                    title: "Medical & Healthcare",
                    desc: "Patient reach, appointment scheduling, and custom practice management systems.",
                    icon: Heart,
                    colorClass: "border-l-4 border-l-rose-500/80 hover:border-rose-500 liquid-card-rose",
                    iconColor: "text-rose-600 bg-rose-500/10",
                  },
                  {
                    title: "Education & Learning",
                    desc: "LMS, student portals, and operational management tools for schools and academies.",
                    icon: GraduationCap,
                    colorClass: "border-l-4 border-l-amber-500/80 hover:border-amber-500 liquid-card-amber",
                    iconColor: "text-amber-600 bg-amber-500/10",
                  },
                  {
                    title: "Professional Services",
                    desc: "Corporate landing pages, lead generation pipelines, and dashboard software.",
                    icon: Briefcase,
                    colorClass: "border-l-4 border-l-blue-500/80 hover:border-blue-500 liquid-card-blue",
                    iconColor: "text-blue-600 bg-blue-500/10",
                  }
                ].map((ind, idx) => {
                  const Icon = ind.icon;
                  return (
                    <Card key={idx} className={`p-6 h-full bg-white/60 border border-slate-100/50 backdrop-blur-md hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-300 rounded-3xl group flex flex-col items-center text-center liquid-card ${ind.colorClass}`}>
                      <div className={`w-11 h-11 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ${ind.iconColor}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-black text-slate-900 mb-2 transition-colors">{ind.title}</h3>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{ind.desc}</p>
                    </Card>
                  );
                })}
              </div>

              <div className="flex justify-center">
                <Link href="/industries">
                  <Button variant="primary" size="lg" className="rounded-full shadow-xl shadow-orange-500/15">
                    View All 50+ Industries →
                  </Button>
                </Link>
              </div>
           </div>
        </div>

        <FounderSection />

        <section className="py-24 bg-slate-50/50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-black text-slate-900 mb-6">Common <span className="text-orange-500">Questions</span></h2>
              <p className="text-lg text-slate-600 font-medium">Clear answers to help you start your digital journey with confidence.</p>
            </div>
            <FAQSection limit={4} />
            <div className="mt-12 text-center">
              <Link href="/faq">
                <Button variant="outline" className="rounded-2xl px-10 border-slate-200 hover:bg-slate-50">View All FAQs →</Button>
              </Link>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

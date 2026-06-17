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
import { BrowserPortfolioShowcase } from "@/components/BrowserPortfolioShowcase";
import { BiharServicesSEO } from "@/components/BiharServicesSEO";
import Link from "next/link";
import { Code2, Server, Smartphone, Cloud } from "lucide-react";
import { TechPhysicsBox } from "@/components/TechPhysicsBox";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <InteractiveBackground />
      <Navbar />
      <main className="flex-1">
        <Hero />

        <StatsShowcase />

        <PortfolioShowcase />

        <BrowserPortfolioShowcase />

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

        <section className="pt-12 pb-20 md:py-28 bg-gradient-to-b from-slate-50/20 to-white relative overflow-hidden" id="technology">
           <div className="container mx-auto px-4 max-w-6xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                 
                 {/* Left Side: Content & Features */}
                 <div className="lg:col-span-5 flex flex-col justify-center text-left">
                    <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-orange-500">Our Stack</p>
                    <h2 className="text-3xl md:text-4.5xl font-black text-slate-900 mb-4">
                      Technology We <span className="text-orange-500 italic font-black">Use</span>
                    </h2>
                    <div className="max-w-xl pr-2 md:pr-4">
                      <p className="text-slate-600 font-medium text-[15px] md:text-[17px] leading-relaxed mb-3.5 md:mb-5">
                        We engineer high-performance web applications, robust server architectures, and native cross-platform mobile solutions. From next-generation AI integrations and machine learning pipelines to DevOps automation and secure blockchain networks, we use handpicked, enterprise-grade tools to build business-ready products.
                      </p>
                      <p className="text-slate-500 font-medium text-[13px] md:text-[14px] leading-relaxed">
                        Our handpicked technology stack is optimized to maximize page load speeds, SEO visibility, and cloud deployment efficiency. Whether you need a secure, containerized web dashboard, a fast e-commerce platform, or a native Android and iOS mobile app, we leverage industry-grade frameworks to ensure your digital ecosystem scales effortlessly.
                      </p>
                    </div>
                 </div>

                 {/* Right Side: Interactive Physics Box */}
                 <div className="lg:col-span-7 w-full">
                    <TechPhysicsBox />
                 </div>

              </div>
           </div>
        </section>

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
        <BiharServicesSEO />
      </main>
      <Footer />
    </div>
  );
}

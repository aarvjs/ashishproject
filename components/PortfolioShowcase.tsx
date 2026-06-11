"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Eye, Smartphone, Laptop, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

const projects = [
  {
    title: "EcoSphere SaaS Dashboard",
    category: "Web Development",
    image: "/projects/web-1.png",
    type: "Web",
    icon: <Laptop className="w-4 h-4" />,
    description: "A comprehensive sustainability tracking platform for corporate environmental impact.",
    tags: ["React", "Next.js", "Three.js"],
    color: "from-blue-600 to-cyan-500"
  },
  {
    title: "FinFlow Mobile Wallet",
    category: "Mobile App",
    image: "/projects/mobile-1.png",
    type: "Mobile",
    icon: <Smartphone className="w-4 h-4" />,
    description: "Next-generation fintech application featuring real-time crypto tracking and instant payments.",
    tags: ["React Native", "Firebase", "Web3"],
    color: "from-rose-500 to-orange-500"
  },
  {
    title: "LuxeFashion E-commerce",
    category: "Web Development",
    image: "/projects/web-2.png",
    type: "Web",
    icon: <Laptop className="w-4 h-4" />,
    description: "High-end retail experience with immersive 3D product previews and seamless checkout.",
    tags: ["Next.js", "Tailwind", "Shopify"],
    color: "from-emerald-500 to-teal-400"
  },
  {
    title: "HealthTrack Pro",
    category: "Mobile App",
    image: "/projects/mobile-2.png",
    type: "Mobile",
    icon: <Smartphone className="w-4 h-4" />,
    description: "Integrated health monitoring system with wearable sync and AI-driven insights.",
    tags: ["Flutter", "Node.js", "AI"],
    color: "from-indigo-600 to-purple-500"
  }
];

const ctaBackgrounds = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200",
  "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1200",
  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1200"
];

export function PortfolioShowcase() {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % ctaBackgrounds.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="portfolio" className="py-16 md:py-24 relative overflow-hidden bg-white">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-slate-50 rounded-full blur-[120px] -mr-1/4 -mt-1/4" />
      
      <div className="container mx-auto max-w-5xl px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-[10px] font-black uppercase tracking-widest mb-4"
            >
              <Sparkles className="w-3 h-3" />
              Work Done
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Website & Mobile <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500 italic">Excellence.</span>
            </h2>
          </div>
          <p className="text-slate-500 font-medium max-w-sm text-sm md:text-base leading-relaxed">
            A curated selection of our most impactful digital transformations. We build products that define market standards.
          </p>
        </div>

        {/* Scattered/Asymmetric Creative Grid Layout - Alternating Desktop layouts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {projects.map((project, index) => {
            const isHorizontal = index === 0 || index === 3;
            const gridSpan = isHorizontal ? "md:col-span-2" : "md:col-span-1";
            
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
                className={`${gridSpan} h-full`}
              >
                <Card className="group relative overflow-hidden rounded-[2rem] bg-white border border-slate-100/80 shadow-xl shadow-slate-200/40 hover:shadow-orange-500/5 transition-all duration-500 h-full flex flex-col justify-between">
                  
                  {/* Outer container adjusting for horizontal vs vertical layout */}
                  <div className={`flex flex-col h-full ${isHorizontal ? (index === 0 ? "md:flex-row" : "md:flex-row-reverse") : "flex-col"}`}>
                    
                    {/* Image Area with Creative Positioning */}
                    <div className={`relative flex-shrink-0 ${isHorizontal ? "w-full md:w-[45%] aspect-[16/10] md:aspect-auto md:self-stretch" : "w-full aspect-[16/10]"} overflow-hidden bg-slate-50 border-b md:border-b-0 border-slate-100`}>
                      <Image
                        src={project.image}
                        alt={`${project.title} screenshot - Sabka Saathi Portfolio`}
                        fill
                        sizes={isHorizontal ? "(max-w-768px) 100vw, 45vw" : "(max-w-768px) 100vw, 50vw"}
                        loading="lazy"
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
                      
                      <div className="absolute top-3.5 left-3.5">
                        <Badge className="bg-white/95 backdrop-blur-md text-slate-950 border-none px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1.5 text-[8px] font-black">
                          {project.icon}
                          {project.type}
                        </Badge>
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                        <div className="flex gap-2.5">
                          <div className="w-9 h-9 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-md cursor-pointer hover:scale-110 transition-transform">
                            <Eye className="w-4 h-4" />
                          </div>
                          <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-md cursor-pointer hover:scale-110 transition-transform">
                            <ExternalLink className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Section - Compact and clean padding */}
                    <div className="p-5 md:p-6 lg:p-8 flex-1 flex flex-col justify-between">
                      <div>
                        <span className={`text-[8px] font-black uppercase tracking-[0.25em] bg-clip-text text-transparent bg-gradient-to-r ${project.color} mb-1.5 block`}>
                          {project.category}
                        </span>
                        <h3 className="text-base md:text-lg font-black text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-slate-500 font-medium text-xs leading-relaxed mb-4">
                          {project.description}
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 pt-3 border-t border-slate-50">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 rounded-full bg-slate-50 text-slate-400 text-[8px] font-bold uppercase tracking-wider border border-slate-100">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Improved Premium Ready to Build Masterpiece CTA Section with automatic background image slideshow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-col items-center rounded-[2.5rem] p-6 py-12 md:p-16 relative overflow-hidden text-center border border-white/5 shadow-2xl"
        >
          {/* Slideshow background layers */}
          {ctaBackgrounds.map((bg, idx) => (
            <div
              key={bg}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out -z-20 ${
                idx === bgIndex ? "opacity-55" : "opacity-0"
              }`}
              style={{ backgroundImage: `url(${bg})` }}
            />
          ))}

          {/* Premium Gradient Overlay Wrapper */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/70 via-slate-900/60 to-orange-950/40 -z-10 pointer-events-none" />

          {/* Dot patterns layer */}
          <div 
            className="absolute inset-0 opacity-[0.06] pointer-events-none" 
            style={{
              backgroundImage: "radial-gradient(#ff9500 1px, transparent 1px)",
              backgroundSize: "20px 20px"
            }} 
          />
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full -mr-48 -mt-48 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-500/10 blur-[120px] rounded-full -ml-48 -mb-48 pointer-events-none" />
          
          <h3 className="text-2xl sm:text-3xl md:text-4.5xl font-black text-white mb-5 relative z-10 leading-tight">
            Ready to Build Your <br />
            Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-50 to-orange-400 italic">Masterpiece?</span>
          </h3>
          <p className="text-slate-200 max-w-lg mx-auto mb-8 text-xs sm:text-sm md:text-base font-medium relative z-10 leading-relaxed px-4">
            Let&apos;s turn your vision into high-performance, scale-ready digital solutions. Partner with India&apos;s leading technology professionals.
          </p>
          <div className="relative z-10">
            <Link href="/contact">
              <Button variant="primary" size="lg" className="rounded-2xl shadow-xl shadow-orange-500/20 px-10 py-4.5 text-base md:text-lg">
                Get Started Now
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

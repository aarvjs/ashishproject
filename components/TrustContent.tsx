"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Globe, Loader2 } from "lucide-react";

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface Developer {
  id: string;
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  skills: string[];
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  order: number;
}

export function TrustContent() {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActiveDevelopers = async () => {
      try {
        const q = query(
          collection(db, "developers"),
          where("status", "==", "active")
        );
        const snapshot = await getDocs(q);
        const activeDevs: Developer[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          activeDevs.push({
            id: docSnap.id,
            name: data.name || "",
            role: data.role || "",
            description: data.description || "",
            imageUrl: data.imageUrl || "",
            skills: data.skills || [],
            linkedinUrl: data.linkedinUrl || "",
            githubUrl: data.githubUrl || "",
            portfolioUrl: data.portfolioUrl || "",
            order: typeof data.order === "number" ? data.order : 0,
          });
        });
        // Sort in memory by order ascending to prevent index errors
        activeDevs.sort((a, b) => a.order - b.order);
        setDevelopers(activeDevs);
      } catch (err) {
        console.error("Error fetching active developers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveDevelopers();
  }, []);

  return (
    <>
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-bold text-xs uppercase tracking-widest shadow-sm mb-6">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
            </span>
            Verified & Trusted
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
            Trust & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">Transparency</span>
          </h1>
          <p className="text-xl text-slate-600 font-medium leading-relaxed">
            We believe in honest communication, clear processes, and building long-term trust with every client. No false promises, just real work.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        
        {/* About Founder & Vision */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-8"
        >
          <Card className="h-full p-8 md:p-12 bg-white/70 backdrop-blur-2xl border-white/60 rounded-[3rem] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-3xl rounded-full -mr-32 -mt-32" />
            <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-4">
              <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 text-2xl">💼</span>
              About Founder
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
              <div className="md:col-span-8 prose prose-lg prose-slate text-slate-600 font-medium">
                <p className="text-xl md:text-2xl text-slate-800 leading-snug font-bold mb-6 italic">
                  &quot;Sabka Saathi Digital Services was started with a simple vision — to make digital growth accessible for every business, especially those in small towns and local markets.&quot;
                </p>
                <p>
                  <strong>Ashish Kumar</strong>&nbsp;recognized that many businesses &amp; Startups have the potential to grow but lack the right digital support. This platform was built to bridge that gap and provide simple, effective, and practical digital solutions.
                </p>
                <p>
                  The goal is clear — to empower thousands of businesses to build a strong online presence and unlock new growth opportunities.
                </p>
              </div>
              <div className="md:col-span-4 relative group">
                <div className="absolute -inset-4 bg-orange-500/10 blur-2xl rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <Image
                    src="/team/ashish-kumar.jpeg"
                    alt="Ashish Kumar - Founder"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mt-4 text-center">
                   <p className="text-sm font-black text-slate-900">Ashish Kumar</p>
                   <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest leading-tight">Founder & CEO</p>
                </div>
              </div>
            </div>
            <div className="mt-10 p-6 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
              <span className="font-bold text-slate-700">Want to take your business online?</span>
              <Link href="/#contact">
                <Button className="rounded-xl px-8 shadow-lg shadow-orange-500/20 active:scale-95">Connect with us today</Button>
              </Link>
            </div>
          </Card>
        </motion.div>

        {/* Company Details Bento Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-4"
        >
          <Card className="h-full p-8 bg-white border-slate-200 rounded-[3rem] shadow-xl relative overflow-hidden flex flex-col group">
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-orange-500/5 to-transparent pointer-events-none" />
            <h3 className="text-2xl font-black text-slate-900 mb-2 flex items-center gap-3">
              🏢 Company Details
            </h3>
            <p className="text-slate-500 text-sm font-medium mb-8">We operate with complete transparency and a professional approach.</p>
            
            <ul className="space-y-5 text-sm font-medium mb-auto relative z-10">
              <li className="flex justify-between border-b border-slate-100 pb-3">
                <span className="text-slate-500">Business Name</span>
                <span className="font-bold text-slate-900 text-right">Sabka Saathi Digital Services</span>
              </li>
              <li className="flex justify-between border-b border-slate-100 pb-3">
                <span className="text-slate-500">Founder</span>
                <span className="font-bold text-slate-900">Ashish Kumar</span>
              </li>
              <li className="flex justify-between border-b border-slate-100 pb-3">
                <span className="text-slate-500">Type</span>
                <span className="font-bold text-slate-900">Proprietorship</span>
              </li>
              <li className="flex justify-between border-b border-slate-100 pb-3">
                <span className="text-slate-500">Location</span>
                <span className="font-bold text-slate-900">India</span>
              </li>
              <li className="flex justify-between border-b border-slate-100 pb-3">
                <span className="text-slate-500">Contact</span>
                <a href="tel:9431673018" className="font-bold text-orange-600 hover:text-orange-500 transition-colors">9431673018</a>
              </li>
              <li className="flex justify-between pb-3">
                <span className="text-slate-500">Email</span>
                <a href="mailto:helpsabkasaathi@gmail.com" className="font-bold text-orange-600 hover:text-orange-500 break-all text-right max-w-[140px] transition-colors">helpsabkasaathi@gmail.com</a>
              </li>
            </ul>

            <div className="mt-8 space-y-3 relative z-10">
              <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 group-hover:border-emerald-200 transition-colors">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold">✓</div>
                <span className="font-bold text-sm text-slate-700">Verified Business Presence</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 group-hover:border-emerald-200 transition-colors">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold">✓</div>
                <span className="font-bold text-sm text-slate-700">Professional Service Provider</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>



      {/* Social Proof & Service Commitment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="h-full p-8 md:p-10 bg-white border-slate-100 rounded-[2.5rem] shadow-lg shadow-slate-200/50 hover:shadow-xl transition-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-2xl rounded-full -mr-10 -mt-10" />
            <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <span className="p-2 rounded-xl bg-blue-100 text-blue-600">📊</span>
              Social Proof & Results
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-3xl font-black text-slate-900 mb-1">100+</div>
                <div className="text-sm font-bold text-slate-500">Businesses Served</div>
              </div>
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-3xl font-black text-slate-900 mb-1">50+</div>
                <div className="text-sm font-bold text-slate-500">Digital Projects</div>
              </div>
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 sm:col-span-2">
                <div className="text-xl font-black text-slate-900 mb-1">Pan-India</div>
                <div className="text-sm font-bold text-slate-500">Growing Client Network</div>
              </div>
            </div>
            <p className="text-slate-600 font-medium">We focus on consistent results and long-term client relationships to ensure growth.</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="h-full p-8 md:p-10 bg-white border-slate-100 rounded-[2.5rem] shadow-lg shadow-slate-200/50 hover:shadow-xl transition-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 blur-2xl rounded-full -mr-10 -mt-10" />
            <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <span className="p-2 rounded-xl bg-rose-100 text-rose-600">🚫</span>
              Service Commitment
            </h3>
            <p className="text-lg font-bold text-slate-800 mb-6 italic">&quot;We believe in real work, not false promises.&quot;</p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-rose-500 text-xl font-bold mt-1">×</span>
                <span className="font-medium text-slate-600 leading-snug">We do not make unrealistic guarantees.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 font-bold mt-1">✓</span>
                <span className="font-medium text-slate-600 leading-snug">Results may vary depending on business type, market conditions, and implementation.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500 font-bold mt-1">✓</span>
                <span className="font-medium text-slate-600 leading-snug">Our focus is on strategy, consistency, and long-term growth.</span>
              </li>
            </ul>
          </Card>
        </motion.div>
      </div>

      {/* Meet Our Developers Section */}
      <div className="mb-8 sm:mb-10">
        <div className="flex flex-col items-center mb-5 sm:mb-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-bold text-xs uppercase tracking-widest mb-4 shadow-sm"
          >
            Our Technical Workforce
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-3 uppercase">
            Meet Our Developers
          </h2>
          <p className="text-slate-550 font-semibold max-w-2xl text-xs sm:text-sm leading-relaxed text-slate-500">
            The people behind our digital products, websites, apps, and business solutions.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
          </div>
        ) : developers.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
            <p className="text-sm font-bold text-slate-500">
              Our team profiles will be updated soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {developers.map((dev, index) => (
              <motion.div
                key={dev.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="h-full"
              >
                <div className="group relative overflow-hidden bg-white border border-slate-200/60 rounded-[1.5rem] shadow-sm shadow-slate-100/40 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full">
                  {/* Smooth bottom-to-top gradient wave hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-500/[0.06] via-orange-500/[0.01] to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none z-0" />
                  
                  {/* Image at the top (full-width, cropped, rounded-t-3xl) */}
                  <div className="relative w-full h-[170px] sm:h-[190px] md:h-[230px] overflow-hidden rounded-t-[1.4rem] shrink-0 bg-slate-50 border-b border-slate-100/50 z-10">
                    {dev.imageUrl ? (
                      <Image
                        src={dev.imageUrl}
                        alt={dev.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 50vw, 25vw"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-slate-350 font-bold text-xs uppercase tracking-wider">No Image</div>
                    )}
                  </div>

                  {/* Content block with tight margins and compact internal padding */}
                  <div className="p-3.5 sm:p-4 flex flex-col flex-1 min-w-0 justify-between relative z-10">
                    <div className="mb-3">
                      {/* Name & Role */}
                      <h3 className="text-sm sm:text-base font-black text-slate-900 mb-0.5 group-hover:text-orange-600 transition-colors duration-300 truncate">
                        {dev.name}
                      </h3>
                      <p className="text-[9px] sm:text-[10px] font-bold text-orange-500 uppercase tracking-widest leading-none mb-2 truncate">
                        {dev.role}
                      </p>
                      
                      {/* Description - clamped strictly to 3 lines */}
                      <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-3 group-hover:text-slate-700 transition-colors duration-300">
                        {dev.description}
                      </p>
                    </div>

                    <div>
                      {/* Skills/Tags */}
                      {dev.skills && dev.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {dev.skills.slice(0, 3).map((skill, i) => (
                            <span
                              key={i}
                              className="px-1.5 py-0.5 bg-slate-50 border border-slate-200/50 text-[9px] font-bold text-slate-500 rounded group-hover:bg-orange-50/50 group-hover:text-orange-700 group-hover:border-orange-100/40 transition-colors duration-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Social Links */}
                      {(dev.linkedinUrl || dev.githubUrl || dev.portfolioUrl) && (
                        <div className="flex gap-2 pt-2.5 border-t border-slate-100 group-hover:border-orange-100/40 transition-colors duration-300">
                          {dev.linkedinUrl && (
                            <a
                              href={dev.linkedinUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-7.5 h-7.5 rounded-lg bg-slate-50 hover:bg-orange-500 hover:text-white border border-slate-200/60 text-slate-400 flex items-center justify-center transition-all duration-300"
                            >
                              <LinkedinIcon className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {dev.githubUrl && (
                            <a
                              href={dev.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-7.5 h-7.5 rounded-lg bg-slate-50 hover:bg-orange-500 hover:text-white border border-slate-200/60 text-slate-400 flex items-center justify-center transition-all duration-300"
                            >
                              <GithubIcon className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {dev.portfolioUrl && (
                            <a
                              href={dev.portfolioUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-7.5 h-7.5 rounded-lg bg-slate-50 hover:bg-orange-500 hover:text-white border border-slate-200/60 text-slate-400 flex items-center justify-center transition-all duration-300"
                            >
                              <Globe className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
          <div className="bg-orange-500/10 border border-orange-500/20 p-6 md:p-8 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="text-4xl">⚠️</div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-1">Important Notice</h4>
                <p className="text-slate-700 font-medium text-sm md:text-base">
                  Beware of fake agencies. Sabka Saathi Digital Services is a verified and trusted service provider focused on delivering genuine digital solutions.
                </p>
              </div>
            </div>
          </div>
      </motion.div>

      {/* Legal Policies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="h-full p-8 md:p-10 bg-white/60 backdrop-blur-xl border-white/80 rounded-[2.5rem] shadow-xl">
            <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <span className="p-2 rounded-xl bg-slate-100 text-slate-600">📜</span>
              Privacy Policy
            </h3>
            <p className="text-sm font-bold text-slate-500 mb-6 uppercase tracking-widest">We respect your privacy</p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                <span className="text-slate-600 font-medium">Personal details like name, phone number, and email are used only for communication and service purposes.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                <span className="text-slate-600 font-medium">We do not sell, rent, or share your data with third parties.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                <span className="text-slate-600 font-medium">All information shared with us is handled securely.</span>
              </li>
            </ul>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="h-full p-8 md:p-10 bg-white/60 backdrop-blur-xl border-white/80 rounded-[2.5rem] shadow-xl">
            <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <span className="p-2 rounded-xl bg-slate-100 text-slate-600">📄</span>
              Terms & Conditions
            </h3>
            <p className="text-sm font-bold text-slate-500 mb-6 uppercase tracking-widest">Clearly defined scope</p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                <span className="text-slate-600 font-medium">All services are provided based on a clearly defined scope of work.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                <span className="text-slate-600 font-medium">Project timelines may vary depending on requirements and communication.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                <span className="text-slate-600 font-medium">Any additional requests beyond the agreed scope will be handled separately.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                <span className="text-slate-600 font-medium">We ensure professional standards in every project we deliver.</span>
              </li>
            </ul>
          </Card>
        </motion.div>
      </div>

      {/* Contact & Presence Bottom CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-slate-900 text-white rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-2xl shadow-slate-900/50"
      >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 blur-[100px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 blur-[80px] rounded-full pointer-events-none -translate-x-1/2 translate-y-1/2" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Support & Presence</h2>
              <p className="text-slate-400 text-lg md:text-xl font-medium mb-8">
                We operate across India and serve clients remotely with smooth communication and delivery. Have questions or want to start your project?
              </p>
              
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 w-fit backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center text-2xl shadow-lg">📞</div>
                  <div>
                    <span className="block text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">Call / WhatsApp</span>
                    <a href="tel:9431673018" className="text-2xl font-black text-white hover:text-orange-400 transition-colors">9431673018</a>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-slate-300 font-medium">
                    <span className="text-emerald-400">✓</span> Quick Response
                  </li>
                  <li className="flex items-center gap-3 text-slate-300 font-medium">
                    <span className="text-emerald-400">✓</span> Professional Guidance
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="bg-white/10 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-md w-full max-w-md text-center">
                <div className="text-5xl mb-6">📍</div>
                <h4 className="text-2xl font-bold text-white mb-4">Location</h4>
                <p className="text-slate-300 font-medium mb-8">
                  Location details available upon request for detailed project discussions.
                </p>
                <Link href="/#contact">
                  <Button size="lg" className="w-full rounded-2xl py-8 text-lg font-bold bg-white text-slate-900 hover:bg-orange-50 transition-colors border-none">
                    Talk to an Expert →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
      </motion.div>
    </>
  );
}

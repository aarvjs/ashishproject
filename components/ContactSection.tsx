"use client";

import { useForm, ValidationError } from "@formspree/react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useEffect, useState } from "react";
import { ShieldCheck, Zap, HeartHandshake, CheckCircle } from "lucide-react";

interface SubmissionData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
}

export function ContactSection() {
  const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || "xlgoknzw";
  const [state, handleSubmit] = useForm(FORMSPREE_ID);
  const [lastSubmission, setLastSubmission] = useState<SubmissionData | null>(null);
  const [phone, setPhone] = useState("");

  const handleInquirySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const values = Object.fromEntries(data.entries()) as unknown as SubmissionData;
    setLastSubmission(values);
    handleSubmit(e);
  };

  useEffect(() => {
    if (state.succeeded && lastSubmission) {
      const { name, email, phone, company, service, budget, timeline, message } = lastSubmission;

      const lines = [
        `🔔 *New Project Inquiry — Sabka Saathi*`,
        ``,
        `👤 *Name:* ${name}`,
        `📧 *Email:* ${email}`,
        `📱 *Phone:* ${phone || "Not provided"}`,
        `🏢 *Company:* ${company || "Not provided"}`,
        ``,
        `🛠️ *Service:* ${service}`,
        `💰 *Budget:* ${budget}`,
        `⏳ *Timeline:* ${timeline}`,
        ``,
        `💬 *Message:*`,
        message,
        ``,
        `_Submitted from sabkasaathi.com_ 🌐`,
      ];

      const encodedMsg = encodeURIComponent(lines.join("\n"));
      const whatsappUrl = `https://wa.me/919431673018?text=${encodedMsg}`;

      const redirectTimer = setTimeout(() => {
        window.open(whatsappUrl, "_blank");
      }, 1500);

      return () => clearTimeout(redirectTimer);
    }
  }, [state.succeeded, lastSubmission]);

  if (state.succeeded) {
    const wa = lastSubmission ? (() => {
      const { name, email, phone, company, service, budget, timeline, message } = lastSubmission;
      const lines = [
        `🔔 *New Project Inquiry — Sabka Saathi*`,
        ``,
        `👤 *Name:* ${name}`,
        `📧 *Email:* ${email}`,
        `📱 *Phone:* ${phone || "Not provided"}`,
        `🏢 *Company:* ${company || "Not provided"}`,
        ``,
        `🛠️ *Service:* ${service}`,
        `💰 *Budget:* ${budget}`,
        `⏳ *Timeline:* ${timeline}`,
        ``,
        `💬 *Message:*`,
        message,
        ``,
        `_Submitted from sabkasaathi.com_ 🌐`,
      ];
      return `https://wa.me/919431673018?text=${encodeURIComponent(lines.join("\n"))}`;
    })() : "https://wa.me/919431673018";

    return (
      <section id="contact" className="py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto"
          >
            <Card className="rounded-3xl p-8 md:p-12 text-center shadow-2xl bg-white/80 backdrop-blur-xl border-white/60">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Inquiry Submitted!</h2>
              <p className="mt-4 text-base text-slate-600">
                We&apos;ve received your message. Opening WhatsApp automatically — if it didn&apos;t open, click below.
              </p>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-black text-base px-8 py-3.5 rounded-2xl shadow-xl shadow-green-500/30 transition-all hover:scale-105 active:scale-95"
              >
                Open WhatsApp Chat
              </a>
              <div className="mt-6">
                <Button variant="outline" onClick={() => window.location.reload()} className="text-xs">
                  Submit Another Inquiry
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="rounded-[2.5rem] p-5 md:p-8 lg:p-12 shadow-2xl bg-white/70 backdrop-blur-xl border-white/80 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              
              {/* Left Column: Premium Dark Trust Panel */}
              <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-br from-slate-900 to-slate-950 p-6 sm:p-8 rounded-[2rem] text-white relative overflow-hidden">
                {/* Ambient glow inside dark column */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full pointer-events-none -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none -ml-32 -mb-32" />
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-orange-400 text-[9px] font-black uppercase tracking-widest mb-4">
                    Partner With Us
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black leading-tight text-white">
                    Let&apos;s build <br />something <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">extraordinary.</span>
                  </h3>
                  <p className="mt-4 text-slate-350 text-xs leading-relaxed font-medium">
                    Collaborate with India&apos;s professional technology agency. Get high-performance custom web development, mobile apps, and automated workflows.
                  </p>
                </div>

                {/* Trust Points */}
                <div className="my-8 space-y-5 relative z-10">
                  {[
                    { 
                      title: "GST Registered Agency", 
                      desc: "Transparent corporate billing, contracts, and compliant timelines.",
                      icon: ShieldCheck
                    },
                    { 
                      title: "Free Maintenance Policy", 
                      desc: "Complete bug fixes and code monitoring post-launch without support fees.",
                      icon: HeartHandshake
                    },
                    { 
                      title: "Direct Access to Engineers", 
                      desc: "Direct coordination with your design and development squad via Slack/WhatsApp.",
                      icon: Zap
                    }
                  ].map((pt, idx) => {
                    const Icon = pt.icon;
                    return (
                      <div key={idx} className="flex gap-3.5 items-start">
                        <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-400 flex-shrink-0 mt-0.5">
                          <Icon className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-white uppercase tracking-wider">{pt.title}</h4>
                          <p className="text-[10px] text-slate-400 leading-relaxed mt-0.5">{pt.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Contact Footer Inside Panel */}
                <div className="mt-auto pt-5 border-t border-white/5 relative z-10 flex flex-col gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Office Hotline: 9431673018
                  </div>
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Average SLA: Under 2 Hours</div>
                </div>
              </div>

              {/* Right Column: Inquiry Form */}
              <div className="lg:col-span-7 flex flex-col justify-center text-left">
                <div className="mb-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-orange-500">Get In Touch</p>
                  <h2 className="mt-1 text-2xl font-black text-slate-900 md:text-3.5xl tracking-tight">Talk To Our Experts</h2>
                  <p className="mt-1 text-slate-500 font-medium text-xs leading-relaxed">Tell us about your project goals. We will build a customized roadmap.</p>
                </div>

                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label htmlFor="name" className="text-[9px] font-black uppercase tracking-wider text-slate-400 ml-1">Full Name</label>
                      <input
                        id="name"
                        name="name"
                        placeholder="e.g. Parth Patel"
                        required
                        className="w-full rounded-xl border border-slate-200/80 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-orange-500/60 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/5 transition-all shadow-sm"
                      />
                      <ValidationError prefix="Name" field="name" errors={state.errors} className="text-[10px] text-red-500 mt-0.5 ml-1 font-bold" />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="email" className="text-[9px] font-black uppercase tracking-wider text-slate-400 ml-1">Email Address</label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        placeholder="parth@example.com"
                        className="w-full rounded-xl border border-slate-200/80 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-orange-500/60 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/5 transition-all shadow-sm"
                      />
                      <ValidationError prefix="Email" field="email" errors={state.errors} className="text-[10px] text-red-500 mt-0.5 ml-1 font-bold" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label htmlFor="phone" className="text-[9px] font-black uppercase tracking-wider text-slate-400 ml-1">Phone / WhatsApp</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        maxLength={10}
                        pattern="[0-9]{10}"
                        value={phone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                          setPhone(val);
                        }}
                        placeholder="9876543210"
                        className="w-full rounded-xl border border-slate-200/80 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-orange-500/60 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/5 transition-all shadow-sm"
                      />
                      <ValidationError prefix="Phone" field="phone" errors={state.errors} className="text-[10px] text-red-500 mt-0.5 ml-1 font-bold" />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="company" className="text-[9px] font-black uppercase tracking-wider text-slate-400 ml-1">Company Name</label>
                      <input
                        id="company"
                        name="company"
                        placeholder="Your Business Name"
                        className="w-full rounded-xl border border-slate-200/80 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-orange-500/60 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/5 transition-all shadow-sm"
                      />
                      <ValidationError prefix="Company" field="company" errors={state.errors} className="text-[10px] text-red-500 mt-0.5 ml-1 font-bold" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label htmlFor="service" className="text-[9px] font-black uppercase tracking-wider text-slate-400 ml-1">Interested In</label>
                      <div className="relative group">
                        <select
                          id="service"
                          name="service"
                          required
                          defaultValue=""
                          className="w-full appearance-none rounded-xl border border-slate-200/80 bg-slate-50/50 px-4 py-3 text-sm text-slate-950 focus:border-orange-500/60 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/5 transition-all shadow-sm"
                        >
                          <option value="" disabled>Select a service</option>
                          <option value="Web Development">Web Development</option>
                          <option value="Mobile App Development">Mobile App Development</option>
                          <option value="Cloud Solutions">Cloud Solutions</option>
                          <option value="CRM & Automation">CRM & Automation</option>
                          <option value="UI/UX Design">UI/UX Design</option>
                          <option value="Maintenance">Free Maintenance Policy</option>
                          <option value="Other">Other Query</option>
                        </select>
                        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                        </div>
                      </div>
                      <ValidationError prefix="Service" field="service" errors={state.errors} className="text-[10px] text-red-500 mt-0.5 ml-1 font-bold" />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="budget" className="text-[9px] font-black uppercase tracking-wider text-slate-400 ml-1">Project Budget</label>
                      <div className="relative group">
                        <select
                          id="budget"
                          name="budget"
                          required
                          defaultValue=""
                          className="w-full appearance-none rounded-xl border border-slate-200/80 bg-slate-50/50 px-4 py-3 text-sm text-slate-950 focus:border-orange-500/60 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/5 transition-all shadow-sm"
                        >
                          <option value="" disabled>Select budget range</option>
                          <option value="Under ₹50k">Under ₹50,000</option>
                          <option value="₹50k - ₹2L">₹50,000 - ₹2,00,000</option>
                          <option value="₹2L - ₹5L">₹2,00,000 - ₹5,00,000</option>
                          <option value="₹5L+">₹5,00,000+</option>
                          <option value="Not Decided">Not Decided yet</option>
                        </select>
                        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                        </div>
                      </div>
                      <ValidationError prefix="Budget" field="budget" errors={state.errors} className="text-[10px] text-red-500 mt-0.5 ml-1 font-bold" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 ml-1">Timeline</label>
                    <div className="flex flex-wrap gap-2 pt-0.5">
                      {["Immediate", "1-2 Months", "3+ Months", "Just Exploring"].map((time) => (
                        <label 
                          key={time} 
                          className="relative flex cursor-pointer items-center justify-center rounded-xl border border-slate-250 bg-slate-50 px-3.5 py-2.5 text-[10px] font-bold text-slate-600 transition-all hover:bg-slate-100 has-[:checked]:border-orange-500/50 has-[:checked]:bg-orange-500/5 has-[:checked]:text-orange-600 has-[:checked]:ring-2 has-[:checked]:ring-orange-500/5"
                        >
                          <input type="radio" name="timeline" value={time} className="sr-only" required />
                          {time}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="message" className="text-[9px] font-black uppercase tracking-wider text-slate-400 ml-1">Detailed Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      placeholder="Tell us about your project goals or any specific features you need..."
                      rows={3}
                      className="w-full rounded-xl border border-slate-200/80 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-orange-500/60 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/5 transition-all shadow-sm resize-none"
                    />
                    <ValidationError prefix="Message" field="message" errors={state.errors} className="text-[10px] text-red-500 mt-0.5 ml-1 font-bold" />
                  </div>

                  <div className="pt-2">
                    <Button 
                      type="submit" 
                      disabled={state.submitting} 
                      className="w-full py-4 rounded-xl text-sm font-bold shadow-xl shadow-orange-500/15 active:scale-[0.98] transition-transform"
                    >
                      {state.submitting ? "Processing Inquiry..." : "Submit Project Inquiry"}
                    </Button>
                  </div>

                  {state.errors && !state.succeeded && (
                    <p className="mt-3 text-center text-xs font-semibold text-red-500 bg-red-50 py-2 rounded-xl border border-red-100 italic">
                      Something went wrong. Please check your fields and try again.
                    </p>
                  )}
                </form>
              </div>

            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

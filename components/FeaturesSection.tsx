"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { Scale, MapPin, Globe, Building2 } from "lucide-react";

const features = [
  {
    icon: "🌐",
    title: "Web Development",
    description: "Modern, responsive web applications built with React & Next.js. We focus on scalability and world-class UX.",
    gradient: "from-blue-600 to-indigo-500",
    span: "lg:col-span-2",
    glow: "blue",
    slug: "web-development"
  },
  {
    icon: "📱",
    title: "Mobile App Development",
    description: "Native and cross-platform mobile apps for iOS and Android.",
    gradient: "from-rose-500 to-orange-500",
    span: "lg:col-span-2",
    glow: "rose",
    slug: "mobile-app"
  },
  {
    icon: "☁️",
    title: "Cloud Solutions",
    description: "Scalable infrastructure and cloud-native services.",
    gradient: "from-emerald-500 to-teal-400",
    span: "lg:col-span-2",
    glow: "emerald",
    slug: "cloud-solutions"
  },
  {
    icon: "💎",
    title: "Premium Hosting",
    description: "1 year of high-performance hosting zero cost.",
    gradient: "from-violet-600 to-purple-500",
    span: "lg:col-span-2",
    glow: "violet",
    slug: "hosting"
  },
  {
    icon: "⚙️",
    title: "Maintenance",
    description: "1 year of complimentary maintenance.",
    gradient: "from-amber-500 to-orange-400",
    span: "lg:col-span-2",
    glow: "amber",
    slug: "maintenance"
  },
  {
    icon: "⚡",
    title: "Ultra-Fast Delivery",
    description: "Experience rapid development cycles and on-time delivery for every project milestone.",
    gradient: "from-sky-500 to-blue-400",
    span: "lg:col-span-2",
    glow: "sky",
    slug: "delivery"
  },
];

export function FeaturesSection() {
  const branches = [
    { name: "Bihar", slug: "bihar", cities: "Patna, Gaya, Biharsharif, Lakhisarai, Sheikhpura, Nawada, Warsaliganj, Nalanda, Munger, Jamui", isMain: true },
    { name: "Gujarat", slug: "gujarat", cities: "Gandhinagar, Surat, Ahmedabad" },
    { name: "Uttar Pradesh" },
    { name: "Haryana", cities: "Gurugram etc" },
    { name: "Uttarakhand" },
    { name: "Madhya Pradesh" },
    { name: "Maharashtra", slug: "maharashtra" },
    { name: "Delhi" },
    { name: "Goa" },
    { name: "Jharkhand", cities: "Tata, Jamshedpur etc" },
    { name: "Chattisgarh" },
    { name: "Rajasthan", cities: "Jaipur etc" },
    { name: "West Bengal", cities: "Kolkata etc" },
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-slate-50/50 relative overflow-hidden">
      {/* Ambient Lighting Orbs */}
      <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-rose-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        {/* About Company Heading */}
        <div className="mx-auto max-w-3xl text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-4 py-1.5 border border-orange-500/20 mb-6 backdrop-blur-sm">
             <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
             <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">Corporate Identity</span>
          </div>
          <h2 className="text-4xl font-bold text-slate-900 md:text-5xl flex flex-col gap-2 tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500 italic">Our Company</span>
          </h2>
          <p className="mt-4 text-slate-600 font-medium text-sm md:text-base leading-relaxed">
            A GST registered agency committed to delivering premium digital solutions 
            across India with verified legal and administrative transparency.
          </p>
        </div>

        {/* Main Info Grid - Bento grid layout balancing widths & heights */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 lg:gap-8 items-stretch">
          
          {/* Row 1, Card 1: Branch Network (Bordered Glass, spans 4 columns) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 bg-white/70 border border-slate-200/50 rounded-[2rem] p-6 md:p-8 backdrop-blur-xl shadow-lg shadow-slate-100/50 hover:shadow-orange-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="mb-6 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600">
                  <Globe className="w-4.5 h-4.5" />
                </div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Our Strategic Locations</h3>
              </div>
  
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {branches.map((branch) => (
                  branch.slug ? (
                    <Link
                      key={branch.name}
                      href={`/location/${branch.slug}`}
                      className={`flex flex-col justify-center p-3 rounded-xl border transition-all duration-300 ${
                        branch.isMain 
                          ? "bg-orange-500 text-white border-orange-400 shadow-lg shadow-orange-500/25 hover:bg-orange-600" 
                          : "bg-slate-50 text-slate-700 border-slate-200/60 hover:border-orange-500/50 hover:bg-white hover:shadow-md"
                      }`}
                    >
                      <span className={`${branch.isMain ? "text-xs font-black" : "text-[10px] font-bold"} leading-tight`}>{branch.name}</span>
                      {branch.isMain && (
                        <span className="mt-0.5 text-[7px] text-orange-100 uppercase font-black tracking-wider">Main Hub</span>
                      )}
                    </Link>
                  ) : (
                    <div
                      key={branch.name}
                      className="flex flex-col justify-center p-3 rounded-xl border bg-slate-50/40 text-slate-400 border-slate-100 cursor-not-allowed opacity-50"
                    >
                      <span className="text-[10px] font-bold leading-tight">{branch.name}</span>
                    </div>
                  )
                ))}
              </div>
            </div>
          </motion.div>

          {/* Row 1, Card 2: Official Registration Card (spans 2 columns) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card className="rounded-[2rem] p-6 md:p-8 shadow-lg shadow-slate-100/50 border-slate-200/50 bg-white/70 backdrop-blur-2xl relative overflow-hidden group hover:shadow-orange-500/5 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between">
              <div className="absolute right-6 top-6 h-10 w-10 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-12">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-[9px] font-bold uppercase tracking-widest text-emerald-600">Verified Legal Info</p>
                </div>
                <h4 className="text-lg font-black text-slate-900 leading-tight">Official Registration</h4>
              </div>
              <div className="mt-6">
                 <p className="text-[9px] font-black text-slate-450 uppercase tracking-widest mb-1">GST Identification Number</p>
                 <p className="text-base font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500 tracking-tighter">10LAHPK8872L1Z3</p>
              </div>
            </Card>
          </motion.div>

          {/* Row 2, Card 1: Principal Place of Business (spans 3 columns) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <Card className="rounded-[2rem] p-6 md:p-8 shadow-lg shadow-slate-100/50 border-slate-200/50 bg-white/70 backdrop-blur-2xl group hover:shadow-orange-500/5 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 group-hover:rotate-12 transition-transform">
                  <Building2 className="w-4.5 h-4.5" />
                </div>
                <h4 className="text-lg font-black text-slate-900 leading-tight">Principal Place of Business</h4>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Building No.", val: "0241" },
                  { label: "Street", val: "Bypass Road" },
                  { label: "Locality", val: "Maharani Puram", span: true },
                  { label: "District", val: "Sheikhpura" },
                  { label: "State", val: "Bihar" },
                ].map((item) => (
                  <div key={item.label} className={item.span ? "col-span-2" : ""}>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-0.5">{item.label}</p>
                    <p className="text-xs font-bold text-slate-700">{item.val}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Row 2, Card 2: Regional Office: Gujarat (spans 3 columns) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <Card className="rounded-[2rem] p-6 md:p-8 shadow-lg shadow-slate-100/50 border-slate-200/50 bg-white/70 backdrop-blur-2xl group hover:shadow-orange-500/5 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 group-hover:rotate-12 transition-transform">
                  <MapPin className="w-4.5 h-4.5" />
                </div>
                <h4 className="text-lg font-black text-slate-900 leading-tight">Regional Office</h4>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-0.5">Locality</p>
                  <p className="text-xs font-bold text-slate-700">Akshardham</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-0.5">City</p>
                    <p className="text-xs font-bold text-slate-700">Bhavnagar</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-0.5">State</p>
                    <p className="text-xs font-bold text-slate-700">Gujarat</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

        </div>

        {/* Bento Grid Expertise Section */}
        <div className="mt-32 lg:mt-48 scroll-mt-32" id="expertise">
          <div className="mx-auto max-w-4xl text-center mb-12 border-y border-orange-500/20 py-10 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-slate-900 md:text-5xl leading-tight tracking-tight">
              Design <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-rose-500 to-orange-500 italic">Redefined.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 lg:gap-4 items-stretch">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="h-full"
              >
                <Link
                  href={`/expertise/${feature.slug}`}
                  className="group relative overflow-hidden bg-white/70 border border-white/60 backdrop-blur-xl rounded-[1.5rem] transition-all duration-500 hover:bg-white hover:shadow-xl hover:shadow-orange-500/5 h-full flex flex-col"
                >
                  {/* Neon Ambient Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
                  
                  <div className="flex-1 w-full p-6 lg:p-5 flex flex-col justify-between relative z-10 h-full">
                    <div className="flex flex-col">
                      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-[1.2rem] bg-gradient-to-br ${feature.gradient} text-xl text-white shadow-[0_10px_30px_rgba(249,115,22,0.15)] group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                        {feature.icon}
                      </div>
                      
                      <h3 className="mt-5 text-lg lg:text-[0.9rem] font-black text-slate-900 leading-[1.3]">
                        {feature.title}
                      </h3>
                    </div>

                    <div className="mt-auto pt-5">
                       <p className="text-xs lg:text-[0.65rem] text-slate-500 leading-relaxed font-semibold">
                          {feature.description}
                       </p>

                        <div className="mt-6 flex items-center gap-3 group-hover:gap-4 transition-all duration-500">
                          <div className={`h-[2px] rounded-full bg-gradient-to-r ${feature.gradient} w-10 lg:w-4 group-hover:w-20 lg:group-hover:w-12 transition-all duration-500`} />
                          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 group-hover:text-orange-600 transition-colors">Learn More</span>
                       </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import { 
  ShoppingBag, 
  Heart, 
  GraduationCap, 
  Briefcase, 
  Home as HomeIcon, 
  Factory, 
  Camera, 
  Utensils, 
  Globe 
} from "lucide-react";

const categoryIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "Business & Retail": ShoppingBag,
  "Medical & Wellness": Heart,
  "Education": GraduationCap,
  "Professional": Briefcase,
  "Home & Local": HomeIcon,
  "Industrial": Factory,
  "Creative & Media": Camera,
  "Food & Hospitality": Utensils
};

const categories = [
  "All",
  "Business & Retail",
  "Medical & Wellness",
  "Education",
  "Professional",
  "Home & Local",
  "Industrial",
  "Creative & Media",
];

const industries = [
  { id: 1, category: "Business & Retail", icon: "🚀", title: "Startups & New Businesses", desc: "Digital setup, branding, and growth strategies for new ideas." },
  { id: 2, category: "Medical & Wellness", icon: "🏥", title: "Medical & Healthcare", desc: "Patient reach and management for clinics and hospitals." },
  { id: 3, category: "Education", icon: "🎓", title: "Education & Coaching", desc: "Management systems for schools and coaching centers." },
  { id: 4, category: "Business & Retail", icon: "🛒", title: "E-commerce & Retail", desc: "Online store development and marketing for sales growth." },
  { id: 5, category: "Business & Retail", icon: "🏪", title: "Local Shops", desc: "Attracting nearby customers through local digital presence." },
  { id: 6, category: "Professional", icon: "🧑‍💼", title: "Service Providers", desc: "Branding and lead generation for consultants and freelancers." },
  { id: 7, category: "Professional", icon: "🏗️", title: "Real Estate", desc: "Property listing platforms and lead systems for builders." },
  { id: 8, category: "Food & Hospitality", icon: "🍽️", title: "Food & Restaurant", desc: "Online menus and ordering systems to boost growth." },
  { id: 9, category: "Food & Hospitality", icon: "🏨", title: "Hotels & Hospitality", desc: "Websites and booking systems for stays and guest houses." },
  { id: 10, category: "Food & Hospitality", icon: "✈️", title: "Travel & Tourism", desc: "Digital platforms for agencies to attract more clients." },
  { id: 11, category: "Home & Local", icon: "🚗", title: "Automobile & Services", desc: "Online presence for vehicle dealers and service centers." },
  { id: 12, category: "Medical & Wellness", icon: "🏋️", title: "Fitness & Gym", desc: "Websites and marketing for wellness centers and trainers." },
  { id: 13, category: "Medical & Wellness", icon: "💄", title: "Beauty & Salon", desc: "Booking systems for salons and beauty professionals." },
  { id: 14, category: "Industrial", icon: "📦", title: "Logistics & Delivery", desc: "Solutions for courier, transport, and supply chain." },
  { id: 15, category: "Business & Retail", icon: "🧵", title: "Fashion & Clothing", desc: "E-commerce and branding for boutiques and fashion brands." },
  { id: 16, category: "Professional", icon: "🏢", title: "Corporate & Offices", desc: "Professional websites and systems for modern companies." },
  { id: 17, category: "Professional", icon: "🧾", title: "Finance & Accounting", desc: "Digital tools and presence for CA firms and advisors." },
  { id: 18, category: "Home & Local", icon: "🏠", title: "Home Services", desc: "Lead generation for electricians, plumbers, and local fixers." },
  { id: 19, category: "Home & Local", icon: "🎤", title: "Event Management", desc: "Online presence and booking systems for event planners." },
  { id: 20, category: "Creative & Media", icon: "🎨", title: "Personal Brands", desc: "Brand building and growth for public figures and creators." },
  { id: 21, category: "Industrial", icon: "🏭", title: "Manufacturing", desc: "Digital solutions for factories and production units." },
  { id: 22, category: "Education", icon: "📚", title: "Book Stores", desc: "Online platforms for book sellers and publishers." },
  { id: 23, category: "Medical & Wellness", icon: "🧪", title: "Pharma & Distributors", desc: "Systems for medicine distributors and pharma businesses." },
  { id: 24, category: "Industrial", icon: "🐄", title: "Agriculture", desc: "Digital tools for agri-business, farmers, and dairy." },
  { id: 25, category: "Medical & Wellness", icon: "🐾", title: "Pet Care", desc: "Websites and booking systems for pet services." },
  { id: 26, category: "Professional", icon: "🏫", title: "NGOs", desc: "Digital presence for social organizations and trusts." },
  { id: 27, category: "Professional", icon: "⚖️", title: "Legal Services", desc: "Professional websites for lawyers and legal advisors." },
  { id: 28, category: "Education", icon: "🧠", title: "Competitive Exam", desc: "Online systems for UPSC, SSC, and banking coaching." },
  { id: 29, category: "Professional", icon: "🏦", title: "Banking & Finance", desc: "Digital support for financial institutions and advisors." },
  { id: 30, category: "Business & Retail", icon: "🛍️", title: "Wholesale Businesses", desc: "Online systems for bulk sellers and distributors." },
  { id: 31, category: "Business & Retail", icon: "🧰", title: "Hardware Shops", desc: "Digital presence for hardware and electrical stores." },
  { id: 32, category: "Home & Local", icon: "🪑", title: "Furniture & Interior", desc: "Showcase and marketing for furniture businesses." },
  { id: 33, category: "Home & Local", icon: "🏡", title: "Home Decor", desc: "Online branding for home decor products and services." },
  { id: 34, category: "Medical & Wellness", icon: "🧴", title: "Cosmetics", desc: "E-commerce and marketing for beauty products." },
  { id: 35, category: "Home & Local", icon: "🧼", title: "Cleaning Services", desc: "Lead generation and booking for cleaning businesses." },
  { id: 36, category: "Industrial", icon: "🧯", title: "Security Services", desc: "Systems for security agencies and CCTV providers." },
  { id: 37, category: "Creative & Media", icon: "📸", title: "Photography", desc: "Portfolio websites for photographers and studios." },
  { id: 38, category: "Creative & Media", icon: "🎬", title: "Media & Production", desc: "Digital presence for video and media companies." },
  { id: 39, category: "Creative & Media", icon: "🎧", title: "Music & Audio", desc: "Platforms for music studios and professionals." },
  { id: 40, category: "Education", icon: "🧑‍🏫", title: "Online Tutors", desc: "Personal websites and systems for educators." },
  { id: 41, category: "Industrial", icon: "🧳", title: "Import & Export", desc: "Global business platforms for international traders." },
  { id: 42, category: "Industrial", icon: "🧊", title: "Cold Storage", desc: "Visibility solutions for storage and warehousing." },
  { id: 43, category: "Industrial", icon: "🚚", title: "Transport Services", desc: "Digital systems for transport and logistics fleets." },
  { id: 44, category: "Professional", icon: "🏢", title: "Co-working Spaces", desc: "Websites and booking systems for shared offices." },
  { id: 45, category: "Business & Retail", icon: "🖨️", title: "Printing Shops", desc: "Online presence for printing and advertising services." },
  { id: 46, category: "Home & Local", icon: "🪪", title: "ID Services", desc: "Platforms for ID card and documentation providers." },
  { id: 47, category: "Home & Local", icon: "🧑‍🔧", title: "Repair Services", desc: "Online booking and lead systems for repair services." },
  { id: 48, category: "Home & Local", icon: "🧑‍🌾", title: "Nursery & Plants", desc: "E-commerce and branding for nursery businesses." },
  { id: 49, category: "Food & Hospitality", icon: "🧑‍🍳", title: "Catering Services", desc: "Online booking and promotion for catering." },
  { id: 50, category: "Education", icon: "🧑‍🏭", title: "Skill Training", desc: "Websites and systems for vocational institutes." },
  { id: 51, category: "Creative & Media", icon: "🎯", title: "Digital Creators", desc: "Brand building and growth for YouTubers and creators." },
  { id: 52, category: "Professional", icon: "🧑‍💻", title: "IT & Tech Firms", desc: "Advanced digital solutions for technology companies." },
  { id: 53, category: "Professional", icon: "🧾", title: "Tax Consultants", desc: "Professional platforms for tax and GST advisors." },
  { id: 54, category: "Professional", icon: "🧍", title: "HR Agencies", desc: "Online systems for recruitment and staffing." },
  { id: 55, category: "Business & Retail", icon: "🏪", title: "Franchise Businesses", desc: "Multi-location management and branding." },
];

export function IndustriesSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredIndustries = activeCategory === "All" 
    ? industries 
    : industries.filter(item => item.category === activeCategory);

  return (
    <section className="py-24 relative overflow-hidden bg-slate-50/50 scroll-mt-48" id="industries">
      <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-[10px] font-black uppercase tracking-widest mb-4">
              Our Footprint
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight ring-offset-orange-500">
              Industries We <span className="text-orange-500 italic text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500 underline decoration-orange-200 decoration-8 underline-offset-4">Serve</span>
            </h2>
            <p className="text-lg text-slate-600 font-medium">
              We provide customized digital solutions for businesses across a wide range of industries. 
              From startups to established enterprises — we help you grow with the right technology.
            </p>
          </motion.div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 border uppercase tracking-wider",
                activeCategory === cat
                  ? "bg-slate-900 text-white border-slate-900 shadow-lg scale-105"
                  : "bg-white text-slate-500 border-slate-200 hover:border-orange-500 hover:text-orange-500 shadow-sm"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Industries Grid */}
        <div className="relative min-h-[400px]">
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredIndustries.map((item) => {
                const IconComponent = categoryIconMap[item.category] || Globe;
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="p-5 h-full bg-white border border-slate-100/80 hover:border-orange-200 transition-all hover:shadow-lg hover:shadow-orange-500/5 group rounded-3xl">
                      <div className="flex items-start gap-4">
                        <div className="text-orange-600 bg-orange-50/70 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 flex-shrink-0">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-900 mb-1 group-hover:text-orange-600 transition-colors text-sm md:text-base">
                            {item.title}
                          </h4>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide mb-2">
                            {item.category}
                          </p>
                          <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-medium">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Support Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-8 rounded-[3rem] bg-orange-50 border border-orange-100 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-black text-slate-900 italic">
              &quot;Every business is unique — and we create solutions that fit your goals.&quot;
            </h3>
            <p className="font-bold text-orange-600 flex items-center gap-2 justify-center md:justify-start">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              Serving Local Shops, Startups & Large Enterprises
            </p>
          </div>
          <div className="flex flex-col gap-3 min-w-[200px]">
            <a href="#contact" className="px-8 py-4 bg-orange-500 text-white rounded-2xl font-black text-center shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-all active:scale-95">
              Launch Online →
            </a>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </section>
  );
}

"use client";

import React, { useEffect, useState, useRef } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ExternalLink, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface Project {
  id: string;
  name: string;
  category: string;
  projectUrl: string;
  description: string;
  technologies: string[];
  status: "active" | "hidden";
  order: number;
}

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="w-[285px] sm:w-[320px] shrink-0 project-card-waterfill group rounded-[24px] bg-white/40 backdrop-blur-md border border-white/60 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-400 flex flex-col justify-between h-full">
      <div className="z-10 relative flex flex-col h-full justify-between flex-1">
        <div>
          {/* Category Badge */}
          <div className="bg-orange-50 text-orange-600 border border-orange-100/30 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider group-hover:bg-white/20 group-hover:text-white group-hover:border-white/10 transition-colors duration-400 w-fit inline-block mb-4">
            {project.category}
          </div>

          {/* Project Name */}
          <h3 className="text-base sm:text-lg font-black text-slate-800 tracking-tight leading-snug group-hover:text-white transition-colors duration-400 mb-2 truncate">
            {project.name}
          </h3>

          {/* Short Description (Capped at 2 lines) */}
          <p className="text-xs text-slate-500 font-semibold leading-relaxed group-hover:text-orange-50 transition-colors duration-400 line-clamp-2 mb-4">
            {project.description}
          </p>
        </div>

        <div>
          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mb-5 max-h-[32px] overflow-hidden">
            {project.technologies.slice(0, 4).map((tech, idx) => (
              <span
                key={idx}
                className="bg-white/50 border border-slate-100 text-slate-600 px-2 py-0.5 rounded-md text-[9px] font-bold group-hover:bg-white/10 group-hover:border-white/10 group-hover:text-white transition-colors duration-400"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-[9px] font-bold text-slate-405 group-hover:text-orange-100 px-1.5 py-0.5 transition-colors duration-400">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* View Project Button */}
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-xl bg-orange-500 text-white hover:bg-orange-600 group-hover:bg-white group-hover:text-orange-600 group-hover:hover:bg-orange-50 group-hover:hover:text-orange-700 hover:shadow-md hover:shadow-orange-500/10 flex items-center justify-center gap-1.5 text-[10px] font-black uppercase tracking-widest transition-all duration-400"
          >
            View Project
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({ items, direction = "left" }: { items: Project[]; direction: "left" | "right" }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    const updateScrollBounds = () => {
      if (containerRef.current) {
        const scrollW = containerRef.current.scrollWidth;
        const clientW = containerRef.current.clientWidth;
        setMaxScroll(Math.max(0, scrollW - clientW));
      }
    };
    
    // Initial measure
    updateScrollBounds();
    
    // Remeasure on window resize
    window.addEventListener("resize", updateScrollBounds);
    return () => window.removeEventListener("resize", updateScrollBounds);
  }, [items]);

  const animationClass = direction === "left" ? "animate-mirror-left" : "animate-mirror-right";

  return (
    <div className="w-full overflow-hidden" ref={containerRef}>
      <div
        className={`${animationClass} flex gap-6 py-2`}
        style={{ "--max-scroll": `-${maxScroll}px` } as React.CSSProperties}
      >
        {items.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

export function ProjectsShowcase() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(
          collection(db, "projects"),
          where("status", "==", "active")
        );
        const snapshot = await getDocs(q);
        const fetched: Project[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          fetched.push({
            id: doc.id,
            name: data.name || "",
            category: data.category || "",
            projectUrl: data.projectUrl || "",
            description: data.description || "",
            technologies: data.technologies || [],
            status: data.status || "active",
            order: typeof data.order === "number" ? data.order : 0,
          });
        });
        // Sort client-side by custom order
        fetched.sort((a, b) => a.order - b.order);
        setProjects(fetched);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500 mb-2" />
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Loading Projects Showcase...</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return null;
  }

  const isMarqueeEnabled = projects.length >= 7;
  const row1 = projects.slice(0, 7);
  const row2 = projects.slice(7);

  return (
    <div className="w-full overflow-hidden py-6">
      {/* Title Section */}
      <div className="container mx-auto px-4 mb-12 text-center max-w-[1400px]">
        <span className="text-[10px] font-black uppercase tracking-widest text-orange-500 bg-orange-50 border border-orange-100/50 px-3 py-1.5 rounded-full">
          Portfolio
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-4 tracking-tight">
          Our Recent Projects
        </h2>
        <p className="text-slate-500 text-xs md:text-sm font-semibold mt-2 max-w-lg mx-auto">
          Explore real projects delivered for businesses, startups, and local brands.
        </p>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block max-w-[1400px] mx-auto px-4">
        {isMarqueeEnabled ? (
          <div className="flex flex-col gap-6 relative w-full overflow-hidden">
            <MarqueeRow items={row1} direction="right" />
            {row2.length > 0 && <MarqueeRow items={row2} direction="left" />}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>

      {/* Mobile & Tablet Swipe Layout */}
      <div className="flex md:hidden w-full overflow-x-auto snap-x snap-mandatory gap-6 px-4 py-4 scrollbar-none">
        {projects.map((project) => (
          <div key={project.id} className="snap-start shrink-0">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}

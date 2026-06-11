"use client";

import { useEffect, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

const blobs = [
  { top: "8%", left: "6%", delay: 0, size: "18rem" },
  { top: "58%", left: "78%", delay: 1.1, size: "16rem" },
  { top: "70%", left: "10%", delay: 0.6, size: "14rem" },
  { top: "24%", left: "72%", delay: 1.8, size: "12rem" },
];

const strokes = [
  { top: "12%", left: "12%", delay: 0 },
  { top: "32%", left: "85%", delay: 1.2 },
  { top: "78%", left: "72%", delay: 0.7 },
  { top: "85%", left: "18%", delay: 1.6 },
  { top: "45%", left: "5%", delay: 2.2 },
];

interface DoodleType {
  top: string;
  left: string;
  icon: string;
  delay: number;
}

const doodles: DoodleType[] = [
  { top: "10%", left: "20%", icon: "{ }", delay: 0.5 },
  { top: "40%", left: "90%", icon: "</>", delay: 1.5 },
  { top: "75%", left: "5%", icon: "#", delay: 2.5 },
  { top: "25%", left: "75%", icon: ";", delay: 1.0 },
  { top: "60%", left: "82%", icon: "!!", delay: 3.0 },
];

function Doodle({ doodle }: { doodle: DoodleType }) {
  const [rotation, setRotation] = useState(0);
  
  useEffect(() => {
    // Generate random rotation only on the client inside a requestAnimationFrame
    // to avoid cascading render lint warning while preventing hydration mismatch.
    const r = Math.random() * 20 - 10;
    requestAnimationFrame(() => setRotation(r));
  }, []);

  return (
    <div
      className="absolute text-primary/25 font-mono text-4xl select-none pointer-events-none"
      style={{
        top: doodle.top,
        left: doodle.left,
        animation: `strokeDrift 10s ease-in-out infinite`,
        animationDelay: `${doodle.delay}s`,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {doodle.icon}
    </div>
  );
}

export function InteractiveBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 28, stiffness: 160 });
  const smoothY = useSpring(mouseY, { damping: 28, stiffness: 160 });

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches || 
                     ('ontouchstart' in window) || 
                     (navigator.maxTouchPoints > 0);
                     
    if (isMobile) return;

    const onMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, [mouseX, mouseY]);

  const cursorGlowTransform = useMotionTemplate`translate3d(calc(${smoothX}px - 11rem), calc(${smoothY}px - 11rem), 0)`;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(255,210,0,0.2),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(255,149,0,0.15),transparent_28%),linear-gradient(180deg,#fffdf5_0%,#fff9e6_55%,#fffcf0_100%)]" />

      <motion.div
        aria-hidden
        className="absolute h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(255,210,0,0.25)_0%,rgba(255,149,0,0.12)_35%,transparent_70%)] blur-2xl"
        style={{ transform: cursorGlowTransform }}
      />

      {blobs.map((blob) => (
        <div
          key={`${blob.top}-${blob.left}`}
          className="graffiti-blob"
          style={{
            top: blob.top,
            left: blob.left,
            width: blob.size,
            height: blob.size,
            animationDelay: `${blob.delay}s`,
          }}
        />
      ))}

      {strokes.map((stroke) => (
        <svg
          key={`${stroke.top}-${stroke.left}`}
          className="graffiti-stroke"
          style={{ top: stroke.top, left: stroke.left, animationDelay: `${stroke.delay}s` }}
          width="160"
          height="100"
          viewBox="0 0 160 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 85C25 60 50 25 85 30C115 35 125 80 150 75"
            stroke="url(#gradient-stroke)"
            strokeOpacity="0.6"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="gradient-stroke" x1="10" y1="85" x2="150" y2="75" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF9500" />
              <stop offset="1" stopColor="#FFD200" />
            </linearGradient>
          </defs>
        </svg>
      ))}

      {doodles.map((doodle) => (
        <Doodle key={`${doodle.top}-${doodle.left}`} doodle={doodle} />
      ))}


      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.22),rgba(255,255,255,0.02)_28%,rgba(255,255,255,0.3)_100%)]" />
    </div>
  );
}

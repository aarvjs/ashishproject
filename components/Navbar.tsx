"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Trust", href: "/trust" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler as EventListener);
    return () => window.removeEventListener("beforeinstallprompt", handler as EventListener);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      alert("App is already installed or your browser doesn't support PWA installation.");
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
    }
  };

  return (
    <header className="sticky top-4 z-50 px-4">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-full border border-white/60 bg-white/30 px-5 py-3 shadow-[0_8px_35px_rgba(35,72,145,0.2)] backdrop-blur-xl md:px-7">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Sabka Saathi - Professional Software Development Logo"
            width={40}
            height={40}
            className="h-10 w-auto object-contain scale-110"
            priority
          />
          <span className="text-xl font-bold tracking-tight text-slate-900 uppercase">
            SABKA-SAATHI
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-700 hover:text-orange-600 transition-colors">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Button onClick={handleInstall}>Download App</Button>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/60 bg-white/70 text-slate-800 md:hidden hover:bg-white transition-colors"
          onClick={() => setOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop Overlay with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm md:hidden"
            />

            {/* Sliding Drawer Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 max-w-[80vw] bg-white/85 border-l border-white/20 shadow-2xl backdrop-blur-2xl p-6 flex flex-col justify-between md:hidden"
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  {/* Top Bar inside Menu */}
                  <div className="flex items-center justify-between pb-5 border-b border-slate-100/80">
                    <span className="text-sm font-black text-slate-900 tracking-wider uppercase">Menu</span>
                    <button
                      type="button"
                      aria-label="Close menu"
                      onClick={() => setOpen(false)}
                      className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 transition-colors"
                    >
                      <X className="w-4.5 h-4.5" />
                    </button>
                  </div>

                  {/* Navigation Links list */}
                  <div className="flex flex-col gap-3.5 py-6 overflow-y-auto max-h-[calc(100vh-200px)]">
                    {links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-orange-50 hover:text-orange-600 transition-all"
                        onClick={() => setOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Bottom App Download Button */}
                <div className="pt-5 border-t border-slate-100/80">
                  <Button onClick={handleInstall} className="w-full py-3.5 rounded-xl font-bold">
                    Download App
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

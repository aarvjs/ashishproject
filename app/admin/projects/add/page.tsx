"use client";

import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";

export default function AddProjectPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  // Form fields
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Website Development");
  const [projectUrl, setProjectUrl] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [status, setStatus] = useState<"active" | "hidden">("active");
  const [order, setOrder] = useState<number>(0);
  
  // UX State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSlugEdited, setIsSlugEdited] = useState(false);

  // Slug generator helper
  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  };

  // Sync name with slug if not manually touched
  useEffect(() => {
    if (!isSlugEdited) {
      setSlug(slugify(name));
    }
  }, [name, isSlugEdited]);

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSlugEdited(true);
    setSlug(slugify(e.target.value));
  };

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Auth gates
    if (authLoading) {
      return triggerError("Authentication is loading, please wait.");
    }
    if (!user || !user.email) {
      return triggerError("You must be logged in as an authorized administrator to perform this action.");
    }

    const allowedEmailsStr = process.env.NEXT_PUBLIC_ADMIN_EMAILS || "";
    const allowedEmails = allowedEmailsStr
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean);

    if (!allowedEmails.includes(user.email.toLowerCase())) {
      return triggerError("Access Denied: Your account is not authorized to create projects.");
    }

    // Validation
    const sanitizedSlug = slugify(slug);
    if (!name.trim()) return triggerError("Project Name is required.");
    if (!sanitizedSlug) return triggerError("Valid slug is required.");
    if (!category.trim()) return triggerError("Category is required.");
    if (!projectUrl.trim()) return triggerError("Project URL is required.");
    if (!validateUrl(projectUrl.trim())) {
      return triggerError("Please enter a valid Project URL (e.g. https://example.com).");
    }
    if (!description.trim()) return triggerError("Short Description is required.");

    try {
      // Duplicate slug check
      const docRef = doc(db, "projects", sanitizedSlug);
      let docSnap;
      try {
        docSnap = await getDoc(docRef);
      } catch (err: any) {
        console.error("Duplicate check Firestore error:", err);
        return triggerError(
          "Firestore database connection failed. Please check your internet connection or Firestore rules."
        );
      }

      if (docSnap && docSnap.exists()) {
        return triggerError("A project with this slug already exists. Please choose a different name or slug.");
      }

      // Convert comma-separated technologies to clean array
      const techArray = technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const projectData = {
        name: name.trim(),
        slug: sanitizedSlug,
        category: category.trim(),
        projectUrl: projectUrl.trim(),
        description: description.trim(),
        technologies: techArray,
        status,
        order: Number(order) || 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await setDoc(docRef, projectData);
      router.push("/admin/projects");
    } catch (err: any) {
      console.error("Save project error:", err);
      setError(err.message || "Failed to save project. Check your connection or permissions.");
      setLoading(false);
    }
  };

  const triggerError = (msg: string) => {
    setError(msg);
    setLoading(false);
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  const allowedEmailsStr = process.env.NEXT_PUBLIC_ADMIN_EMAILS || "";
  const allowedEmails = allowedEmailsStr
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  if (!user || !user.email || !allowedEmails.includes(user.email.toLowerCase())) {
    return (
      <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold flex items-start gap-2.5 shadow-sm">
        <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
        <span>Access Denied: You do not have permissions to view this page.</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-slate-800">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/projects"
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 shadow-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Add New Project</h1>
          <p className="text-xs text-slate-500 font-semibold tracking-wide">Publish a new project to the website showcase</p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold flex items-start gap-2.5 shadow-sm animate-fade-in">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Body & Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/60 backdrop-blur-md border border-white/80 p-6 md:p-8 rounded-3xl space-y-6 shadow-[0_15px_40px_rgba(0,0,0,0.01)]">
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider pb-3 border-b border-slate-100">Project Information</h2>
            
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                Project Name
              </label>
              <input
                type="text"
                required
                disabled={loading}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sabka Saathi Corporate Website"
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                Slug (Auto-generated & Editable)
              </label>
              <input
                type="text"
                required
                disabled={loading}
                value={slug}
                onChange={handleSlugChange}
                placeholder="e.g. sabka-saathi-corporate-website"
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-mono placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                Short Description (Listing Display)
              </label>
              <textarea
                required
                disabled={loading}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Describe what the project does, key business issues solved, and general scope..."
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all leading-relaxed placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Settings & Specs */}
        <div className="space-y-6">
          <div className="bg-white/60 backdrop-blur-md border border-white/80 p-6 rounded-3xl space-y-6 shadow-[0_15px_40px_rgba(0,0,0,0.01)]">
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider pb-3 border-b border-slate-100">Project Configurations</h2>
            
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                Status
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setStatus("active")}
                  className={`py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border transition-all duration-300 ${
                    status === "active"
                      ? "bg-emerald-50 border-emerald-200 text-emerald-600 shadow-sm"
                      : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  Active
                </button>
                <button
                  type="button"
                  onClick={() => setStatus("hidden")}
                  className={`py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border transition-all duration-300 ${
                    status === "hidden"
                      ? "bg-orange-50 border-orange-200 text-orange-650 shadow-sm"
                      : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  Hidden
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-707 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              >
                <option value="Website Development">Website Development</option>
                <option value="Mobile App Development">Mobile App Development</option>
                <option value="Android App Development">Android App Development</option>
                <option value="Custom Software Development">Custom Software Development</option>
                <option value="Billing & Management System">Billing & Management System</option>
                <option value="ERP & CRM Solutions">ERP & CRM Solutions</option>
                <option value="Digital Marketing Services">Digital Marketing Services</option>
                <option value="SEO Services">SEO Services</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                Project URL
              </label>
              <input
                type="text"
                required
                disabled={loading}
                value={projectUrl}
                onChange={(e) => setProjectUrl(e.target.value)}
                placeholder="e.g. https://sabkasathi.com"
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                Display Order (Lower values rank first)
              </label>
              <input
                type="number"
                disabled={loading}
                value={order}
                onChange={(e) => setOrder(Number(e.target.value) || 0)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                Technologies (Comma-separated)
              </label>
              <input
                type="text"
                value={technologies}
                onChange={(e) => setTechnologies(e.target.value)}
                placeholder="Next.js, TypeScript, Firebase, Tailwind"
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-808 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-orange-500/15 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving Project...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Project
                </>
              )}
            </button>
            <Link
              href="/admin/projects"
              className="w-full py-3.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 font-bold text-xs uppercase tracking-widest flex items-center justify-center transition-colors shadow-sm"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

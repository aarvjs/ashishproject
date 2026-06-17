"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc, updateDoc, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { Search, Plus, Edit, Trash2, Check, X, Loader2, Calendar, AlertCircle, ExternalLink } from "lucide-react";
import { useAuth } from "@/lib/auth";

interface FirestoreProject {
  id: string;
  name: string;
  slug: string;
  category: string;
  projectUrl: string;
  description: string;
  technologies: string[];
  status: "active" | "hidden";
  order: number;
  createdAt: string;
}

export default function ProjectsManagementPage() {
  const { user, loading: authLoading } = useAuth();
  const [projects, setProjects] = useState<FirestoreProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Delete Confirmation State
  const [deleteTarget, setDeleteTarget] = useState<FirestoreProject | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  // Status Toggling State
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const fetched: FirestoreProject[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        fetched.push({
          id: docSnap.id,
          name: data.name || "",
          slug: data.slug || "",
          category: data.category || "",
          projectUrl: data.projectUrl || "",
          description: data.description || "",
          technologies: data.technologies || [],
          status: data.status || "active",
          order: typeof data.order === "number" ? data.order : 0,
          createdAt: data.createdAt || "",
        });
      });
      setProjects(fetched);
    } catch (err) {
      console.error("Error fetching projects:", err);
      // Fallback simple fetch
      try {
        const snapshot = await getDocs(collection(db, "projects"));
        const fetched: FirestoreProject[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          fetched.push({
            id: docSnap.id,
            name: data.name || "",
            slug: data.slug || "",
            category: data.category || "",
            projectUrl: data.projectUrl || "",
            description: data.description || "",
            technologies: data.technologies || [],
            status: data.status || "active",
            order: typeof data.order === "number" ? data.order : 0,
            createdAt: data.createdAt || "",
          });
        });
        fetched.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setProjects(fetched);
      } catch (innerErr) {
        console.error("Fallback project fetch failed:", innerErr);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user) {
      fetchProjects();
    }
  }, [authLoading, user]);

  const handleToggleStatus = async (project: FirestoreProject) => {
    setTogglingId(project.id);
    const newStatus = project.status === "active" ? "hidden" : "active";
    try {
      const docRef = doc(db, "projects", project.id);
      await updateDoc(docRef, {
        status: newStatus,
        updatedAt: new Date().toISOString(),
      });
      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? { ...p, status: newStatus } : p))
      );
    } catch (err) {
      console.error("Error toggling project status:", err);
      alert("Failed to update status. Check permissions.");
    } finally {
      setTogglingId(null);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeletingId(deleteTarget.id);
    try {
      await deleteDoc(doc(db, "projects", deleteTarget.id));
      setProjects((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err) {
      console.error("Error deleting project:", err);
      alert("Failed to delete project. Check permissions.");
    } finally {
      setDeletingId(null);
    }
  };

  // Auth validation
  const allowedEmailsStr = process.env.NEXT_PUBLIC_ADMIN_EMAILS || "";
  const allowedEmails = allowedEmailsStr
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  const isAuthorized = user && user.email && allowedEmails.includes(user.email.toLowerCase());

  if (authLoading || (loading && isAuthorized)) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  if (!user || !user.email || !isAuthorized) {
    return (
      <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold flex items-start gap-2.5 shadow-sm animate-fade-in">
        <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
        <span>Access Denied: You do not have permissions to view this page.</span>
      </div>
    );
  }

  const filteredProjects = projects.filter((project) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      project.name.toLowerCase().includes(searchLower) ||
      project.category.toLowerCase().includes(searchLower) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(searchLower));
    
    const matchesStatus =
      statusFilter === "all" ? true : project.status === statusFilter;
      
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 relative text-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Manage Projects</h1>
          <p className="text-xs text-slate-500 font-semibold tracking-wide">Add, update, structure, or remove portfolio projects</p>
        </div>
        <Link
          href="/admin/projects/add"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-50 to-amber-500 hover:from-orange-500 hover:to-amber-500 hover:text-white text-orange-600 border border-orange-100 hover:border-transparent font-bold text-xs uppercase tracking-wider transition-all duration-355 shadow-sm max-w-max animate-fade-in"
        >
          <Plus className="w-3.5 h-3.5" />
          Add New Project
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/60 backdrop-blur-md border border-white/80 p-4 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.01)]">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, category, or tech..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-707 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
          />
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active Only</option>
            <option value="hidden">Hidden Only</option>
          </select>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white/60 backdrop-blur-md border border-white/80 rounded-3xl p-6 md:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.01)]">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No matching projects found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[9px] font-black text-slate-450 uppercase tracking-widest">
                  <th className="pb-3 pr-4">Project Details</th>
                  <th className="pb-3 px-4">Category</th>
                  <th className="pb-3 px-4">Order</th>
                  <th className="pb-3 px-4">Status (Click to toggle)</th>
                  <th className="pb-3 px-4">Date Created</th>
                  <th className="pb-3 pl-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="text-xs text-slate-700 hover:text-slate-900 hover:bg-white/30 transition-all">
                    <td className="py-4 pr-4 font-bold max-w-xs md:max-w-md truncate">
                      <div className="font-bold text-slate-850 truncate">{project.name}</div>
                      <div className="text-[9px] text-slate-400 font-mono mt-0.5 truncate flex items-center gap-1.5">
                        {project.slug}
                        {project.projectUrl && (
                          <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-orange-500 hover:underline"
                          >
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-[10px] font-black uppercase text-slate-500">
                      {project.category}
                    </td>
                    <td className="py-4 px-4 text-[10px] font-black text-slate-600">
                      {project.order}
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleToggleStatus(project)}
                        disabled={togglingId === project.id}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                          project.status === "active"
                            ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-100/50"
                            : "bg-amber-50 hover:bg-orange-50 text-amber-600 border border-orange-100/50"
                        }`}
                      >
                        {togglingId === project.id ? (
                          <Loader2 className="w-2.5 h-2.5 animate-spin" />
                        ) : project.status === "active" ? (
                          <Check className="w-2.5 h-2.5" />
                        ) : (
                          <X className="w-2.5 h-2.5" />
                        )}
                        {project.status}
                      </button>
                    </td>
                    <td className="py-4 px-4 text-[10px] font-bold text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-orange-500" />
                        {project.createdAt
                          ? new Date(project.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : "N/A"}
                      </div>
                    </td>
                    <td className="py-4 pl-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/projects/edit/${project.id}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-orange-50 text-slate-650 hover:text-orange-600 font-bold text-[10px] uppercase transition-colors"
                        >
                          <Edit className="w-3 h-3" />
                          Edit
                        </Link>
                        <button
                          onClick={() => setDeleteTarget(project)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-[10px] uppercase transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-slate-100 rounded-3xl p-6 max-w-md w-full shadow-2xl relative">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-black text-slate-800 uppercase tracking-wider">Delete Project?</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Are you sure you want to delete <strong className="text-slate-800">"{deleteTarget.name}"</strong>? This action is permanent and will remove it from the showcase immediately.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-8">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deletingId !== null}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs uppercase cursor-pointer transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deletingId !== null}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase flex items-center gap-1.5 cursor-pointer transition-all disabled:opacity-50"
              >
                {deletingId ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    Confirm Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

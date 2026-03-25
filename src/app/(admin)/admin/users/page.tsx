"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Mail, Shield, ShieldCheck, MoreVertical, Search, UserPlus } from "lucide-react";
import { users } from "@/lib/db";

export default function UsersAdminPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <DashboardLayout>
            <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight mb-2 font-display">User Management</h1>
                        <p className="text-slate-500 font-medium">Manage user accounts, roles, and platform permissions.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input 
                                type="text" 
                                placeholder="Search users..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                            />
                        </div>
                        <button className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-white/5 text-white text-sm font-bold border border-white/10 hover:bg-white/10 transition-all">
                            <UserPlus className="w-5 h-5" />
                            Add User
                        </button>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-[#0f172a] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/[0.02]">
                                    <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Profile</th>
                                    <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Email Address</th>
                                    <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Role</th>
                                    <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                                    <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-700 to-slate-800 flex items-center justify-center text-xs font-bold text-white border border-white/10 group-hover:rotate-6 transition-transform">
                                                        {user.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-bold text-white leading-tight">{user.name}</div>
                                                        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">ID: #{user.id}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2 text-sm text-slate-300">
                                                    <Mail className="w-4 h-4 text-slate-500" />
                                                    {user.email}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                                    user.role === "admin"
                                                        ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/10"
                                                        : "bg-slate-500/10 text-slate-400 border border-slate-500/10"
                                                }`}>
                                                    {user.role === "admin" ? <ShieldCheck className="w-3 h-3" /> : <Shield className="w-3 h-3" />}
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                    <span className="text-xs font-bold text-emerald-500/80">Active</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <button className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-20 text-center">
                                            <Search className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                                            <div className="text-white font-bold text-lg mb-1">No users found</div>
                                            <div className="text-slate-500 text-sm">We couldn&apos;t find any users matching &quot;{searchQuery}&quot;</div>
                                            <button 
                                                onClick={() => setSearchQuery("")}
                                                className="mt-4 text-xs font-black uppercase tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors"
                                            >
                                                Clear Search
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

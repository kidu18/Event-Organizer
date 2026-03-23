"use client";

import React, { useEffect, useState } from "react";
import { Search, Bell, MessageSquare, ChevronDown } from "lucide-react";
import { useAuthContext } from "@/components/providers/AuthProvider";

export default function Navbar() {
    const { user } = useAuthContext();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <header className="h-20 border-b border-white/5 bg-[#0f172a]/80 backdrop-blur-xl sticky top-0 z-40" />;
    }

    const displayName = user
        ? `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email
        : "User";

    const roleLabel = user?.role?.toUpperCase() === "ADMIN" ? "System Admin" : "Member";
    const initial = user?.firstName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "U";

    return (
        <header className="h-20 border-b border-white/5 bg-[#0f172a]/80 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-40">
            {/* Search */}
            <div className="relative w-96 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input
                    type="text"
                    placeholder="Search events, users or transactions..."
                    className="w-full bg-white/5 border border-white/5 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/20 transition-all font-medium"
                />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <button className="p-2.5 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all relative group">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#0f172a] scale-0 group-hover:scale-100 transition-transform" />
                    </button>
                    <button className="p-2.5 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all relative">
                        <MessageSquare className="w-5 h-5" />
                    </button>
                </div>

                <div className="h-8 w-px bg-white/5" />

                <div className="flex items-center gap-4 group cursor-pointer pl-2">
                    <div className="text-right">
                        <div className="text-sm font-bold text-white leading-tight">{displayName}</div>
                        <div className="text-[10px] font-medium text-slate-500 uppercase tracking-tighter">
                            {roleLabel}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 border-2 border-white/10 overflow-hidden shadow-lg shadow-indigo-500/10 transition-all group-hover:scale-105 group-hover:border-indigo-400/50">
                            <div className="w-full h-full flex items-center justify-center text-sm font-bold text-white">
                                {initial}
                            </div>
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0f172a]" />
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
                </div>
            </div>
        </header>
    );
}

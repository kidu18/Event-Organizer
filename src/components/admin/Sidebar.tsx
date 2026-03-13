"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Calendar,
    Ticket,
    Users,
    PlusCircle,
    Settings,
    HelpCircle
} from "lucide-react";

const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { name: "Events", icon: Calendar, href: "/admin/events" },
    { name: "Bookings", icon: Ticket, href: "/admin/bookings" },
    { name: "Users", icon: Users, href: "/admin/users" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0f172a] border-r border-white/5 flex flex-col z-50">
            {/* Brand */}
            <div className="p-6 mb-4">
                <Link href="/admin" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#6366f1] to-[#8b5cf6] flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:rotate-6 transition-transform">
                        <Ticket className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <div className="text-lg font-bold text-white tracking-tight">EventAdmin</div>
                        <div className="text-[10px] font-medium text-indigo-400 uppercase tracking-widest">Real-time Ops</div>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${isActive
                                ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-inner"
                                : "text-slate-400 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <item.icon className={`w-5 h-5 transition-colors ${isActive ? "text-indigo-400" : "group-hover:text-white"}`} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 mt-auto space-y-4">
                <Link
                    href="/admin/create"
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-bold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all"
                >
                    <PlusCircle className="w-5 h-5" />
                    Create New Event
                </Link>

                <div className="pt-4 border-t border-white/5 space-y-1">
                    <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-2 text-xs font-medium text-slate-500 hover:text-slate-300 transition-colors">
                        <Settings className="w-4 h-4" />
                        Settings
                    </Link>
                    <Link href="/admin/help" className="flex items-center gap-3 px-4 py-2 text-xs font-medium text-slate-500 hover:text-slate-300 transition-colors">
                        <HelpCircle className="w-4 h-4" />
                        Help Center
                    </Link>
                </div>
            </div>
        </aside>
    );
}

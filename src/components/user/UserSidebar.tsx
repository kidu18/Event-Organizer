"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Search,
    Ticket,
    Heart,
    User,
    Settings,
    HelpCircle,
    MapPin,
    LogOut
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
    { name: "Home Feed", icon: LayoutDashboard, href: "/user" },
    { name: "Explore Events", icon: Search, href: "/events" },
    { name: "My Tickets", icon: Ticket, href: "/user/my-tickets" },
    { name: "Watchlist", icon: Heart, href: "/user/watchlist" },
];

export default function UserSidebar() {
    const pathname = usePathname();
    const { logout } = useAuth();

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0f172a] border-r border-white/5 flex flex-col z-50">
            {/* Brand */}
            <div className="p-6 mb-4">
                <Link href="/user" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform">
                        <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <div className="text-lg font-bold text-white tracking-tight">EventPro</div>
                        <div className="text-[10px] font-medium text-blue-400 uppercase tracking-widest">User Portal</div>
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
                                ? "bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-inner"
                                : "text-slate-400 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <item.icon className={`w-5 h-5 transition-colors ${isActive ? "text-blue-400" : "group-hover:text-white"}`} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 mt-auto space-y-4">
                <div className="pt-4 border-t border-white/5 space-y-1">
                    <Link
                        href="/user/profile"
                        className={`flex items-center gap-3 px-4 py-2 text-xs font-medium transition-colors ${pathname === "/user/profile" ? "text-blue-400" : "text-slate-500 hover:text-slate-300"
                            }`}
                    >
                        <User className="w-4 h-4" />
                        My Profile
                    </Link>
                    <Link
                        href="/user/settings"
                        className={`flex items-center gap-3 px-4 py-2 text-xs font-medium transition-colors ${pathname === "/user/settings" ? "text-blue-400" : "text-slate-500 hover:text-slate-300"
                            }`}
                    >
                        <Settings className="w-4 h-4" />
                        Settings
                    </Link>
                    <Link
                        href="/user/help"
                        className={`flex items-center gap-3 px-4 py-2 text-xs font-medium transition-colors ${pathname === "/user/help" ? "text-blue-400" : "text-slate-500 hover:text-slate-300"
                            }`}
                    >
                        <HelpCircle className="w-4 h-4" />
                        Help Center
                    </Link>
                    <button
                        onClick={() => logout()}
                        className="w-full flex items-center gap-3 px-4 py-2 text-xs font-medium text-red-500/70 hover:text-red-400 hover:bg-red-500/5 rounded-lg transition-all"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </div>
        </aside>
    );
}

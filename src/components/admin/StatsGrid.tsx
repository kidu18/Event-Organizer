"use client";

import React from "react";
import { DollarSign, Ticket, Calendar, Users, ArrowUpRight } from "lucide-react";

const stats = [
    {
        name: "Total Revenue",
        value: "$128,430.00",
        change: "+12.5%",
        icon: DollarSign,
        color: "from-emerald-500/20 to-emerald-500/0",
        iconColor: "text-emerald-500",
    },
    {
        name: "Tickets Sold",
        value: "12,450",
        change: "+8.2%",
        icon: Ticket,
        color: "from-blue-500/20 to-blue-500/0",
        iconColor: "text-blue-500",
    },
    {
        name: "Active Events",
        value: "48",
        change: "+4.1%",
        icon: Calendar,
        color: "from-amber-500/20 to-amber-500/0",
        iconColor: "text-amber-500",
    },
    {
        name: "Total Users",
        value: "8,922",
        change: "+15.3%",
        icon: Users,
        color: "from-indigo-500/20 to-indigo-500/0",
        iconColor: "text-indigo-500",
    },
];

export default function StatsGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
                <div
                    key={stat.name}
                    className="group relative bg-[#0f172a] border border-white/5 rounded-3xl p-6 transition-all duration-300 hover:border-white/10 hover:shadow-2xl hover:shadow-indigo-500/5 overflow-hidden"
                >
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br ${stat.color} pointer-events-none`} />

                    <div className="relative flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-2xl bg-white/5 ${stat.iconColor} transition-transform group-hover:scale-110`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                            <ArrowUpRight className="w-3 h-3" />
                            {stat.change}
                        </div>
                    </div>

                    <div className="relative space-y-1">
                        <div className="text-xs font-medium text-slate-500 group-hover:text-slate-400 transition-colors uppercase tracking-wider">
                            {stat.name}
                        </div>
                        <div className="text-2xl font-black text-white tracking-tight">
                            {stat.value}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

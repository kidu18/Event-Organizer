"use client";

import React from "react";

const categories = [
    { name: "Music Festivals", count: "124 Events", color: "from-pink-500/20" },
    { name: "Tech Conferences", count: "86 Events", color: "from-blue-500/20" },
    { name: "Art Exhibitions", count: "42 Events", color: "from-emerald-500/20" },
    { name: "Sports Tournaments", count: "31 Events", color: "from-orange-500/20" },
    { name: "Food & Drink", count: "65 Events", color: "from-yellow-500/20" },
    { name: "Business Summits", count: "19 Events", color: "from-purple-500/20" },
];

export default function Categories() {
    return (
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16">
            <h2 className="text-2xl md:text-3xl font-black mb-8 tracking-tight">Popular Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                {categories.map((cat, i) => (
                    <div key={i} className={`group relative p-6 md:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-br ${cat.color} to-transparent border border-white/5 hover:border-white/10 transition-all cursor-pointer overflow-hidden`}>
                        <div className="relative z-10">
                            <h3 className="text-lg md:text-xl font-bold mb-1 group-hover:text-purple-300 transition-colors tracking-tight">{cat.name}</h3>
                            <p className="text-xs md:text-sm text-slate-500">{cat.count}</p>
                        </div>
                        <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-white/5 rounded-full -translate-y-8 translate-x-8 blur-2xl md:blur-3xl group-hover:bg-white/10 transition-colors" />
                    </div>
                ))}
            </div>
        </section>
    );
}

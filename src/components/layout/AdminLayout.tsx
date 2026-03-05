"use client";

import React from "react";
import Sidebar from "../admin/Sidebar";
import Navbar from "../admin/Navbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
            <Sidebar />
            <div className="pl-64 flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1 p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}

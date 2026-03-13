"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import AdminSidebar from "../admin/Sidebar";
import UserSidebar from "../user/UserSidebar";
import Navbar from "../admin/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="min-h-screen bg-[#020617]" />;
    }

    const isAdmin = session?.user?.role === "admin";

    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
            {isAdmin ? <AdminSidebar /> : <UserSidebar />}

            <div className="pl-64 flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1 p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}

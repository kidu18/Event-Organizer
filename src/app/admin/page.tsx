"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsGrid from "@/components/admin/StatsGrid";
import BookingChart from "@/components/admin/BookingChart";
import RecentBookings from "@/components/admin/RecentBookings";
import { useSession } from "next-auth/react";

export default function AdminDashboardPage() {
    const { data: session } = useSession();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    // Double check admin role
    if (session?.user?.role !== "admin") {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <p className="text-red-400 font-bold uppercase tracking-widest">Access Denied: Admin Only</p>
            </div>
        );
    }

    return (
        <DashboardLayout>
            <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight mb-2">Admin Overview</h1>
                    <p className="text-slate-500 font-medium">Monitoring platform performance and global ticket operations.</p>
                </div>

                <StatsGrid />
                <BookingChart />
                <RecentBookings />
            </div>
        </DashboardLayout>
    );
}

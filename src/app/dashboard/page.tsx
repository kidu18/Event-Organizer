import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import StatsGrid from "@/components/admin/StatsGrid";
import BookingChart from "@/components/admin/BookingChart";
import RecentBookings from "@/components/admin/RecentBookings";

export default function DashboardPage() {
  return (
    <AdminLayout>
      <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2">Overview</h1>
          <p className="text-slate-500 font-medium">Monitoring platform performance and global ticket operations.</p>
        </div>

        <StatsGrid />
        <BookingChart />
        <RecentBookings />
      </div>
    </AdminLayout>
  );
}

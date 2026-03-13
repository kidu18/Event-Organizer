"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useSession } from "next-auth/react";
import { Calendar, Search, Ticket } from "lucide-react";
import Link from "next/link";

export default function UserDashboardPage() {
    const { data: session } = useSession();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <DashboardLayout>
            <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="py-10">
                    <div className="mb-10">
                        <h1 className="text-4xl font-black text-white tracking-tight mb-3">
                            Welcome back, {session?.user?.name?.split(" ")[0]}! 👋
                        </h1>
                        <p className="text-slate-400 text-lg max-w-2xl">
                            Ready for your next adventure? Check out the trending events or manage your upcoming bookings.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link href="/events" className="group bg-[#0f172a] border border-white/5 p-8 rounded-2xl hover:bg-white/5 transition-all">
                            <Search className="w-10 h-10 text-blue-500 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Explore Events</h3>
                            <p className="text-slate-500 text-sm">Find the best tech workshops, concerts, and meetups.</p>
                        </Link>

                        <Link href="/user/my-tickets" className="group bg-[#0f172a] border border-white/5 p-8 rounded-2xl hover:bg-white/5 transition-all">
                            <Ticket className="w-10 h-10 text-cyan-500 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">My Tickets</h3>
                            <p className="text-slate-500 text-sm">Access your QR codes and booking history.</p>
                        </Link>

                        <Link href="/user/watchlist" className="group bg-[#0f172a] border border-white/5 p-8 rounded-2xl hover:bg-white/5 transition-all">
                            <Calendar className="w-10 h-10 text-indigo-500 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Watchlist</h3>
                            <p className="text-slate-500 text-sm">Keep track of events you're interested in.</p>
                        </Link>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

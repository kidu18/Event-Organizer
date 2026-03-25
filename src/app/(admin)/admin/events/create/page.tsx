"use client";

import React from "react";
import CreateEventForm from "@/features/events/components/CreateEventForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function CreateEventPage() {
    return (
        <div className="min-h-screen bg-[#020617] text-white">
            {/* Top Header */}
            <header className="border-b border-slate-800 bg-[#020617]/50 backdrop-blur-md sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/dashboard"
                                className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold tracking-tight">Create New Event</h1>
                                <p className="text-sm text-slate-400">Fill in the details to launch your next big event.</p>
                            </div>
                        </div>

                        <div className="hidden sm:block">
                            <div className="flex items-center space-x-2 text-xs font-medium uppercase tracking-wider text-slate-500">
                                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                                <span>Live Mode</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Main Form Area */}
                    <div className="lg:col-span-12">
                        <CreateEventForm />
                    </div>

                </div>
            </main>

            {/* Background Decorative Elements */}
            <div className="fixed top-0 right-0 -z-10 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="fixed bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none"></div>
        </div>
    );
}

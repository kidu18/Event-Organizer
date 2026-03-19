"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
    Calendar, 
    MapPin, 
    DollarSign, 
    Users, 
    Type, 
    AlignLeft, 
    ChevronRight, 
    Save, 
    X,
    Image as ImageIcon
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateEventPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        date: "",
        price: "",
        totalCapacity: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Mocking the creation process
        setTimeout(() => {
            setIsLoading(false);
            router.push("/admin/events");
        }, 1500);
    };

    const inputClasses = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-black placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all";
    const labelClasses = "block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1";

    return (
        <DashboardLayout>
            <div className="max-w-[1000px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 px-1">
                    <Link href="/admin" className="hover:text-indigo-400 transition-colors">Dashboard</Link>
                    <ChevronRight className="w-3 h-3 text-slate-700" />
                    <Link href="/admin/events" className="hover:text-indigo-400 transition-colors">Events</Link>
                    <ChevronRight className="w-3 h-3 text-slate-700" />
                    <span className="text-white">Create Event</span>
                </div>

                {/* Header */}
                <div className="mb-8 px-1">
                    <h1 className="text-3xl font-black text-white tracking-tight mb-2">Create New Event</h1>
                    <p className="text-slate-500 font-medium">Design and launch your next global ticketed experience.</p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                    {/* Left Column: Core Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-[#0f172a] border border-white/5 rounded-3xl p-8 shadow-2xl">
                            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <AlignLeft className="w-5 h-5 text-indigo-400" />
                                Event Details
                            </h2>
                            
                            <div className="space-y-6">
                                <div>
                                    <label className={labelClasses}>Event Title</label>
                                    <div className="relative">
                                        <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                                        <input
                                            type="text"
                                            required
                                            className={`${inputClasses} pl-11`}
                                            placeholder="e.g. Tomorrowland Winter 2024"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClasses}>Description</label>
                                    <textarea
                                        required
                                        rows={5}
                                        className={inputClasses}
                                        placeholder="Describe the event experience, artists, and key highlights..."
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#0f172a] border border-white/5 rounded-3xl p-8 shadow-2xl">
                            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-indigo-400" />
                                Location & Date
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelClasses}>Venue / City</label>
                                    <input
                                        type="text"
                                        required
                                        className={inputClasses}
                                        placeholder="e.g. Alpe d'Huez, France"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className={labelClasses}>Event Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                                        <input
                                            type="date"
                                            required
                                            className={`${inputClasses} pl-11`}
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Numbers & Publishing */}
                    <div className="space-y-6">
                        <div className="bg-[#0f172a] border border-white/5 rounded-3xl p-8 shadow-2xl">
                            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <DollarSign className="w-5 h-5 text-indigo-400" />
                                Pricing & Capacity
                            </h2>
                            
                            <div className="space-y-6">
                                <div>
                                    <label className={labelClasses}>Ticket Price (USD)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                                        <input
                                            type="number"
                                            required
                                            className={`${inputClasses} pl-11`}
                                            placeholder="0.00"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClasses}>Total Capacity</label>
                                    <div className="relative">
                                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                                        <input
                                            type="number"
                                            required
                                            className={`${inputClasses} pl-11`}
                                            placeholder="e.g. 5000"
                                            value={formData.totalCapacity}
                                            onChange={(e) => setFormData({ ...formData, totalCapacity: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#0f172a] border border-white/5 rounded-3xl p-6 shadow-2xl space-y-3">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:translate-y-0 transition-all"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Save className="w-5 h-5" />
                                        Publish Event
                                    </>
                                )}
                            </button>
                            
                            <Link
                                href="/admin/events"
                                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-white/5 text-slate-400 font-bold hover:bg-white/10 hover:text-white transition-all"
                            >
                                <X className="w-5 h-5" />
                                Discard Draft
                            </Link>
                        </div>
                        
                        <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                                    <ImageIcon className="w-4 h-4" />
                                </div>
                                <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-widest">Image Upload</span>
                            </div>
                            <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                                Professional event posters increase conversion by 40%. Drag and drop or click to upload your artwork.
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}

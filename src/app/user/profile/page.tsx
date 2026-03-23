"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { 
    User, 
    Mail, 
    Shield, 
    Calendar, 
    Edit2, 
    Camera, 
    CheckCircle,
    Copy
} from "lucide-react";

export default function ProfilePage() {
    const { user } = useAuthContext();
    const [isCopying, setIsCopying] = useState(false);

    if (!user) return null;

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setIsCopying(true);
        setTimeout(() => setIsCopying(false), 2000);
    };

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Header Section */}
                <div className="relative mb-8 rounded-3xl overflow-hidden bg-[#0f172a] border border-white/5 h-48">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 mix-blend-overlay" />
                    <div className="absolute -bottom-12 left-8 flex items-end gap-6">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-500 p-1 shadow-2xl">
                                <div className="w-full h-full rounded-xl bg-[#0f172a] flex items-center justify-center overflow-hidden">
                                    <span className="text-4xl font-bold text-white">
                                        {user.firstName?.[0]?.toUpperCase()}{user.lastName?.[0]?.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                            <button className="absolute bottom-2 right-2 p-2 bg-white rounded-lg text-black shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110">
                                <Camera className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="mb-14">
                            <h1 className="text-3xl font-black text-white tracking-tight">
                                {user.firstName} {user.lastName}
                            </h1>
                            <p className="text-slate-400 flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest">
                                    {user.role}
                                </span>
                                <span>•</span>
                                <span className="text-sm">Member since {new Date(user.createdAt).toLocaleDateString()}</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                    {/* Left Column - Stats/Quick Info */}
                    <div className="space-y-6">
                        <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-6">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Account ID</h3>
                            <div className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3 group">
                                <span className="text-xs font-mono text-slate-300 truncate mr-2">{user.id}</span>
                                <button 
                                    onClick={() => copyToClipboard(user.id)}
                                    className="text-slate-500 hover:text-white transition-colors"
                                >
                                    {isCopying ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-6">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Statistics</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 text-sm">Events Attended</span>
                                    <span className="text-white font-bold">12</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 text-sm">Saved Events</span>
                                    <span className="text-white font-bold">5</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 text-sm">Total Spent</span>
                                    <span className="text-green-400 font-bold">$450.00</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Detailed Info */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-[#0f172a] border border-white/5 rounded-2xl overflow-hidden">
                            <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
                                <h3 className="text-lg font-bold text-white">Profile Details</h3>
                                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-white transition-all">
                                    <Edit2 className="w-3.5 h-3.5" />
                                    Edit Profile
                                </button>
                            </div>
                            
                            <div className="p-8 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                            <User className="w-3.5 h-3.5" />
                                            First Name
                                        </label>
                                        <div className="text-white font-medium bg-white/5 rounded-xl px-4 py-3 border border-white/5">
                                            {user.firstName}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                            <User className="w-3.5 h-3.5" />
                                            Last Name
                                        </label>
                                        <div className="text-white font-medium bg-white/5 rounded-xl px-4 py-3 border border-white/5">
                                            {user.lastName}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                        <Mail className="h-3.5 w-3.5" />
                                        Email Address
                                    </label>
                                    <div className="text-white font-medium bg-white/5 rounded-xl px-4 py-3 border border-white/5 flex items-center justify-between">
                                        {user.email}
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">
                                            <CheckCircle className="h-3 w-3" />
                                            VERIFIED
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                            <Shield className="w-3.5 h-3.5" />
                                            Account Role
                                        </label>
                                        <div className="text-white font-medium bg-white/5 rounded-xl px-4 py-3 border border-white/5">
                                            {user.role}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                            <Calendar className="w-3.5 h-3.5" />
                                            Last Updated
                                        </label>
                                        <div className="text-white font-medium bg-white/5 rounded-xl px-4 py-3 border border-white/5">
                                            {new Date(user.updatedAt).toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-2xl p-6 flex items-center justify-between">
                            <div>
                                <h4 className="text-white font-bold mb-1">Security Settings</h4>
                                <p className="text-slate-400 text-sm">Protect your account with session management and 2FA.</p>
                            </div>
                            <button className="px-6 py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-indigo-500/20">
                                Manage Security
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

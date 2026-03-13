"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Link from "next/link";
import { PlusCircle, Calendar, MapPin, Users, Ticket, MoreVertical, Edit2, Trash2, Eye, Clock } from "lucide-react";
import type { Event } from "@/types";
import { eventsService } from "@/features/events/events.service";

export default function EventsAdminPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const fetchedEvents = await eventsService.getAllForAdmin();
                setEvents(fetchedEvents);
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });
    };

    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    };

    const getTicketStats = (event: Event) => {
        const total = event.ticketing.totalTickets;
        const available = event.ticketing.availableTickets;
        const sold = total - available;
        const percentage = total > 0 ? (sold / total) * 100 : 0;
        return { sold, total, percentage };
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="max-w-[1600px] mx-auto space-y-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-black text-white tracking-tight mb-2">Event Management</h1>
                            <p className="text-slate-500">Loading your events...</p>
                        </div>
                    </div>
                    <div className="bg-[#0f172a] border border-white/5 rounded-3xl p-8">
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="h-20 bg-slate-800/50 rounded-lg animate-pulse" />
                            ))}
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="max-w-[1600px] mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight mb-2">Event Management</h1>
                        <p className="text-slate-500">Create, edit, and organize all your upcoming events.</p>
                    </div>
                    <Link
                        href="/admin/create"
                        className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-bold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all w-full md:w-auto"
                    >
                        <PlusCircle className="w-5 h-5" />
                        Create New Event
                    </Link>
                </div>

                {/* Event Table */}
                <div className="bg-[#0f172a] border border-white/5 rounded-3xl overflow-hidden">
                    {events.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="w-24 h-24 bg-slate-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <Calendar className="w-12 h-12 text-slate-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">No Events Created</h3>
                            <p className="text-slate-400 mb-6">
                                You haven't created any events yet. Start by creating your first event!
                            </p>
                            <Link
                                href="/admin/create"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                <PlusCircle className="w-5 h-5" />
                                Create Your First Event
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/5 bg-white/[0.02]">
                                        <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Event Details</th>
                                        <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Date & Location</th>
                                        <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Capacity</th>
                                        <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Price</th>
                                        <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                                        <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {events.map((event) => {
                                        const stats = getTicketStats(event);
                                        return (
                                            <tr key={event.id} className="hover:bg-white/[0.02] transition-colors group">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                                                            <Calendar className="w-6 h-6 text-indigo-400" />
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-bold text-white leading-tight mb-1">{event.title}</div>
                                                            <div className="text-xs text-slate-500 line-clamp-1 max-w-[250px]">{event.description}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                                                            <Calendar className="w-3.5 h-3.5 text-slate-500" />
                                                            {formatDate(event.dateTime.date)}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                                            <Clock className="w-3.5 h-3.5" />
                                                            {formatTime(event.dateTime.startTime)} - {formatTime(event.dateTime.endTime)}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                                            <MapPin className="w-3.5 h-3.5" />
                                                            {event.location.venueName}, {event.location.city}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                                                            <span>{stats.sold} / {stats.total}</span>
                                                            <span>{Math.round(stats.percentage)}%</span>
                                                        </div>
                                                        <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                                            <div
                                                                className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                                                                style={{ width: `${stats.percentage}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-1.5">
                                                        <Ticket className="w-4 h-4 text-emerald-400" />
                                                        <span className="text-sm font-black text-white">
                                                            {event.ticketing.type === 'Free' ? 'Free' : `$${event.ticketing.price}`}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                                                        event.status === 'Published' 
                                                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                            : event.status === 'Draft'
                                                            ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                                                            : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                                                    }`}>
                                                        {event.status}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-2">
                                                        <button className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                                                            <Eye className="w-4 h-4" />
                                                        </button>
                                                        <button className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                                                            <Edit2 className="w-4 h-4" />
                                                        </button>
                                                        <button className="p-2 rounded-lg bg-red-500/5 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}

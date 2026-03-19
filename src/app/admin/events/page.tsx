"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Calendar, MapPin, Users, Ticket, Edit2, Trash2, Eye, Search, Filter, MoreVertical, Clock, DollarSign, AlertCircle, X } from "lucide-react";
import { Event, CreateEventRequest, UpdateEventRequest } from "@/types/event";
import { getAllEvents, createEvent, updateEvent, deleteEvent, searchEvents } from "@/services/eventServices";
import CreateEventForm from "@/features/events/components/CreateEventForm";

export default function EventsManagementPage() {
    const router = useRouter();
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            setError(null);
            const fetchedEvents = await getAllEvents();
            setEvents(fetchedEvents);
            console.log('✅ Events loaded:', fetchedEvents.length);
        } catch (error) {
            console.error('❌ Failed to fetch events:', error);
            setError(error instanceof Error ? error.message : 'Failed to load events');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        if (searchTerm.trim()) {
            try {
                const searchResults = await searchEvents(searchTerm);
                setEvents(searchResults);
            } catch (error) {
                console.error('❌ Search failed:', error);
            }
        } else {
            fetchEvents();
        }
    };

    const closeModal = () => {
        setShowCreateModal(false);
    };

    const handleDeleteEvent = async (eventId: string) => {
        if (!confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
            return;
        }

        try {
            setLoading(true);
            await deleteEvent(eventId);
            console.log('✅ Event deleted:', eventId);
            fetchEvents();
        } catch (error) {
            console.error('❌ Failed to delete event:', error);
            setError(error instanceof Error ? error.message : 'Failed to delete event');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getEventStatus = (event: Event) => {
        const eventDate = new Date(event.eventDate);
        const now = new Date();
        if (eventDate < now) return 'Past';
        if (event.availableSeatsCount === 0) return 'Sold Out';
        return 'Active';
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-800';
            case 'Sold Out': return 'bg-red-100 text-red-800';
            case 'Past': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading && events.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading events...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/admin"
                                className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Back to Dashboard
                            </Link>
                            <div className="border-l border-gray-300 h-6"></div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Events Management</h1>
                                <p className="text-sm text-gray-500">Create and manage your events</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Create Event
                        </button>
                    </div>
                </div>
            </div>

            {/* Error Alert */}
            {error && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                        <div className="flex items-center">
                            <AlertCircle className="w-5 h-5 mr-2" />
                            <span>{error}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Search and Filter */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search events..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
                        />
                    </div>
                    <button
                        onClick={handleSearch}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                    </button>
                    <button
                        onClick={fetchEvents}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Refresh
                    </button>
                </div>
            </div>

            {/* Events List */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                {events.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-8 text-center">
                        <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Events Found</h3>
                        <p className="text-gray-500 mb-4">Get started by creating your first event.</p>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                            Create Event
                        </button>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Location</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {events.map((event) => (
                                        <tr key={event.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-12 w-12">
                                                        <img className="h-12 w-12 rounded-lg object-cover" src={event.imageUrl} alt="" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{event.title}</div>
                                                        <div className="text-sm text-gray-500 line-clamp-1 max-w-xs">{event.description}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{formatDate(event.eventDate)}</div>
                                                <div className="text-sm text-gray-500 flex items-center">
                                                    <MapPin className="w-4 h-4 mr-1" />
                                                    {event.venueName}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {event.soldSeatsCount} / {event.totalRows * event.totalColumns}
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div 
                                                        className="bg-purple-600 h-2 rounded-full" 
                                                        style={{ width: `${(event.soldSeatsCount / (event.totalRows * event.totalColumns)) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 flex items-center">
                                                    <DollarSign className="w-4 h-4 mr-1" />
                                                    {event.seats[0]?.price || 0}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(getEventStatus(event))}`}>
                                                    {getEventStatus(event)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <button className="text-purple-600 hover:text-purple-900">
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button className="text-gray-400 hover:text-gray-600" title="Edit functionality coming soon">
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDeleteEvent(event.id)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Create/Edit Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-[#0f172a] border border-white/10 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl">
                        {/* Modal Header */}
                        <div className="bg-[#0f172a] border-b border-white/10 px-6 py-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white">Create New Event</h2>
                            <button
                                onClick={closeModal}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        {/* Modal Body - Scrollable */}
                        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                            <div className="p-6">
                                <CreateEventForm 
                                    onEventCreated={() => {
                                        fetchEvents(); // Refresh the events list
                                    }}
                                    onClose={closeModal}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

/**
 * CONCEPT: Event Management API Services
 * Handles all event-related API calls with proper error handling and authentication
 */

import { Event, CreateEventRequest, UpdateEventRequest, EventListResponse, EventStats } from '@/types/event';
import { getSession } from '@/lib/custom-auth';

// API Base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

/**
 * Get authentication headers for API requests
 */
const getAuthHeaders = async () => {
    const session = await getSession();
    const token = session ? localStorage.getItem('accessToken') : null;
    
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };
};

/**
 * Handle API errors with proper error messages
 */
const handleApiError = (response: Response, data?: any) => {
    if (response.status === 401) {
        throw new Error('Unauthorized - Please login to continue');
    } else if (response.status === 403) {
        throw new Error('Forbidden - You do not have permission to perform this action');
    } else if (response.status === 404) {
        throw new Error('Event not found');
    } else if (response.status === 400) {
        throw new Error(data?.message || 'Invalid request data');
    } else if (response.status >= 500) {
        throw new Error('Server error - Please try again later');
    } else {
        throw new Error(data?.message || 'Request failed');
    }
};

/**
 * Get all events
 * GET /api/events
 */
export async function getAllEvents(): Promise<Event[]> {
    try {
        console.log('🔍 Fetching all events...');
        
        const headers = await getAuthHeaders();
        const response = await fetch(`${API_BASE_URL}/api/events`, {
            method: 'GET',
            headers
        });

        const data = await response.json();

        if (!response.ok) {
            handleApiError(response, data);
        }

        console.log('✅ Events fetched successfully:', data.length);
        return data;
    } catch (error) {
        console.error('❌ Failed to fetch events:', error);
        throw error;
    }
}

/**
 * Get event by ID
 * GET /api/events/{id}
 */
export async function getEventById(id: string): Promise<Event> {
    try {
        console.log('🔍 Fetching event:', id);
        
        const headers = await getAuthHeaders();
        const response = await fetch(`${API_BASE_URL}/api/events/${id}`, {
            method: 'GET',
            headers
        });

        const data = await response.json();

        if (!response.ok) {
            handleApiError(response, data);
        }

        console.log('✅ Event fetched successfully:', data.title);
        return data;
    } catch (error) {
        console.error('❌ Failed to fetch event:', error);
        throw error;
    }
}

/**
 * Create new event
 * POST /api/events
 */
export async function createEvent(eventData: CreateEventRequest): Promise<Event> {
    try {
        console.log('🔍 Creating event:', eventData.title);
        
        const headers = await getAuthHeaders();
        const response = await fetch(`${API_BASE_URL}/api/events`, {
            method: 'POST',
            headers,
            body: JSON.stringify(eventData)
        });

        const data = await response.json();

        if (!response.ok) {
            handleApiError(response, data);
        }

        console.log('✅ Event created successfully:', data.title);
        return data;
    } catch (error) {
        console.error('❌ Failed to create event:', error);
        throw error;
    }
}

/**
 * Update existing event
 * PATCH /api/events/{id}
 */
export async function updateEvent(id: string, eventData: UpdateEventRequest): Promise<Event> {
    try {
        console.log('🔍 Updating event:', id);
        
        const headers = await getAuthHeaders();
        const response = await fetch(`${API_BASE_URL}/api/events/${id}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify(eventData)
        });

        const data = await response.json();

        if (!response.ok) {
            handleApiError(response, data);
        }

        console.log('✅ Event updated successfully:', data.title);
        return data;
    } catch (error) {
        console.error('❌ Failed to update event:', error);
        throw error;
    }
}

/**
 * Delete event
 * DELETE /api/events/{id}
 */
export async function deleteEvent(id: string): Promise<void> {
    try {
        console.log('🔍 Deleting event:', id);
        
        const headers = await getAuthHeaders();
        const response = await fetch(`${API_BASE_URL}/api/events/${id}`, {
            method: 'DELETE',
            headers
        });

        if (!response.ok) {
            const data = await response.json();
            handleApiError(response, data);
        }

        console.log('✅ Event deleted successfully');
    } catch (error) {
        console.error('❌ Failed to delete event:', error);
        throw error;
    }
}

/**
 * Get event statistics
 * Custom endpoint for dashboard stats
 */
export async function getEventStats(): Promise<EventStats> {
    try {
        console.log('🔍 Fetching event stats...');
        
        // For now, calculate from events list
        const events = await getAllEvents();
        
        const stats: EventStats = {
            totalEvents: events.length,
            activeEvents: events.filter(e => e.eventDate > new Date().toISOString()).length,
            totalCapacity: events.reduce((sum, e) => sum + (e.totalRows * e.totalColumns), 0),
            totalRevenue: events.reduce((sum, e) => sum + (e.soldSeatsCount * e.seats[0]?.price || 0), 0)
        };

        console.log('✅ Event stats calculated:', stats);
        return stats;
    } catch (error) {
        console.error('❌ Failed to fetch event stats:', error);
        throw error;
    }
}

/**
 * Search events by title or description
 */
export async function searchEvents(query: string): Promise<Event[]> {
    try {
        console.log('🔍 Searching events:', query);
        
        const events = await getAllEvents();
        const filteredEvents = events.filter(event => 
            event.title.toLowerCase().includes(query.toLowerCase()) ||
            event.description.toLowerCase().includes(query.toLowerCase())
        );

        console.log('✅ Search completed:', filteredEvents.length, 'results');
        return filteredEvents;
    } catch (error) {
        console.error('❌ Failed to search events:', error);
        throw error;
    }
}

/**
 * Get events by date range
 */
export async function getEventsByDateRange(startDate: string, endDate: string): Promise<Event[]> {
    try {
        console.log('🔍 Fetching events by date range:', startDate, 'to', endDate);
        
        const events = await getAllEvents();
        const filteredEvents = events.filter(event => 
            event.eventDate >= startDate && event.eventDate <= endDate
        );

        console.log('✅ Date range filter completed:', filteredEvents.length, 'events');
        return filteredEvents;
    } catch (error) {
        console.error('❌ Failed to fetch events by date range:', error);
        throw error;
    }
}

/**
 * Upload event image
 * (This would be implemented based on your file upload API)
 */
export async function uploadEventImage(file: File): Promise<string> {
    try {
        console.log('🔍 Uploading event image:', file.name);
        
        const session = await getSession();
        const token = session ? localStorage.getItem('accessToken') : null;
        
        const formData = new FormData();
        formData.append('image', file);
        
        const response = await fetch(`${API_BASE_URL}/api/upload/image`, {
            method: 'POST',
            headers: {
                ...(token && { 'Authorization': `Bearer ${token}` })
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to upload image');
        }

        const data = await response.json();
        console.log('✅ Image uploaded successfully:', data.url);
        return data.url;
    } catch (error) {
        console.error('❌ Failed to upload image:', error);
        throw error;
    }
}

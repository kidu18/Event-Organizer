import { Event } from "@/types";

// Service layer for event management
// This abstracts API calls and provides business logic

export const eventsService = {
    // Get all events
    async getAll(): Promise<Event[]> {
        try {
            const response = await fetch('/api/events');
            if (!response.ok) {
                throw new Error(`Failed to fetch events: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Events service error:', error);
            return [];
        }
    },

    // Get single event by ID
    async getById(id: string): Promise<Event | null> {
        try {
            const response = await fetch(`/api/events/${id}`);
            if (!response.ok) {
                if (response.status === 404) return null;
                throw new Error(`Failed to fetch event: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Event service error:', error);
            return null;
        }
    },

    // Create new event
    async create(eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<Event> {
        try {
            const response = await fetch('/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to create event');
            }

            return await response.json();
        } catch (error) {
            console.error('Create event service error:', error);
            throw error;
        }
    },

    // Update existing event
    async update(id: string, eventData: Partial<Event>): Promise<Event> {
        try {
            const response = await fetch(`/api/events/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to update event');
            }

            return await response.json();
        } catch (error) {
            console.error('Update event service error:', error);
            throw error;
        }
    },

    // Delete event
    async delete(id: string): Promise<boolean> {
        try {
            const response = await fetch(`/api/events/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to delete event');
            }

            return true;
        } catch (error) {
            console.error('Delete event service error:', error);
            throw error;
        }
    },

    // Get events for admin (including drafts)
    async getAllForAdmin(): Promise<Event[]> {
        // In real app, this might use different endpoint or auth
        return this.getAll();
    }
};

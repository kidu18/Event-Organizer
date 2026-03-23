import { Event } from "../../types/event";

// Use API Base URL from environment or default
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export const eventsService = {
  async getAll(): Promise<Event[]> {
    try {
      console.log('🔍 Fetching all events from backend...');
      const response = await fetch(`${API_BASE_URL}/api/events`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Cache the result for 60 seconds (Backend caching)
        next: { revalidate: 60 }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  },
  
  async getById(id: string): Promise<Event | null> {
    try {
      console.log('🔍 Fetching event by ID:', id);
      const response = await fetch(`${API_BASE_URL}/api/events/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error('Failed to fetch event');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching event:', error);
      return null;
    }
  },

  async getAllForAdmin(): Promise<Event[]> {
    // For admin, we might want to skip cache
    try {
      const response = await fetch(`${API_BASE_URL}/api/events`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store'
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching admin events:', error);
      return [];
    }
  }
};

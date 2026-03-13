import { Event } from "../../types/event";

export const eventsService = {
  async getAll(): Promise<Event[]> {
    // Get events from localStorage (mock database)
    if (typeof window === 'undefined') return [];
    
    try {
      const events = JSON.parse(localStorage.getItem('events') || '[]');
      return events.filter((event: Event) => event.status === 'Published');
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  },
  
  async getById(id: string): Promise<Event | null> {
    if (typeof window === 'undefined') return null;
    
    try {
      const events = JSON.parse(localStorage.getItem('events') || '[]');
      return events.find((event: Event) => event.id === id) || null;
    } catch (error) {
      console.error('Error fetching event:', error);
      return null;
    }
  },

  async getAllForAdmin(): Promise<Event[]> {
    // Get all events for admin (including drafts)
    if (typeof window === 'undefined') return [];
    
    try {
      const events = JSON.parse(localStorage.getItem('events') || '[]');
      return events;
    } catch (error) {
      console.error('Error fetching events for admin:', error);
      return [];
    }
  }
};

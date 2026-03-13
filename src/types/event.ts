/**
 * CONCEPT: The Contract Layer.
 * These types reflect the MongoDB schema we designed and ensure the Frontend
 * and Backend speak the same language.
 */

export type EventCategory = 'Technology' | 'Music' | 'Business' | 'Startup' | 'Workshop';

export type EventStatus = 'Draft' | 'Published' | 'Cancelled' | 'Sold Out';

export type TicketType = 'Free' | 'Paid' | 'Invite Only';

export interface EventImage {
    url: string;
    thumbnail?: string;
}

export interface EventDateTime {
    date: string; // ISO String
    startTime: string; // "HH:mm"
    endTime: string; // "HH:mm"
}

export interface EventLocation {
    venueName: string;
    city: string;
    address: string;
    mapLink?: string;
}

export interface EventTicketing {
    type: TicketType;
    price: number;
    totalTickets: number;
    availableTickets: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  image: EventImage;
  organizer: { name: string; userId: string; };
  dateTime: { date: string; startTime: string; endTime: string; };
  location: { venueName: string; city: string; address: string; };
  ticketing: { type: TicketType; price: number; totalTickets: number; availableTickets: number; };
  status: EventStatus;
  qrSupport: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * For the "Create" form, we often use a partial type where some fields
 * are optional until the final 'Publish' step.
 */
export type CreateEventInput = Omit<Event, 'id' | 'createdAt' | 'updatedAt' | 'organizer' | 'image' | 'status' | 'qrSupport'> & {
    image?: File | string | null; // During creation, image might be a File object for previewing
    status?: EventStatus;
    qrSupport?: boolean;
};

// Legacy support for existing components if needed
export type Venue = EventLocation & { id: string; capacity?: number };

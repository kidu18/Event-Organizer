/**
 * CONCEPT: Event Management Types - Backend API Compatible
 * These types match the backend API specification for events management
 */

export type EventStatus = 'ACTIVE' | 'INACTIVE' | 'CANCELLED';
export type SeatStatus = 'AVAILABLE' | 'LOCKED' | 'SOLD';
export type UserRole = 'USER' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}

export interface Seat {
  id: string;
  eventId: string;
  rowNumber: number;
  columnNumber: number;
  status: SeatStatus;
  lockedAt?: string;
  lockedBy?: User;
  price: number;
  createdAt: string;
  updatedAt: string;
  event?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  eventDate: string; // ISO datetime string
  venueName: string;
  imageUrl: string;
  googleMapsUrl: string;
  totalRows: number;
  totalColumns: number;
  createdBy: User;
  createdAt: string;
  updatedAt: string;
  seats: Seat[];
  availableSeatsCount: number;
  lockedSeatsCount: number;
  soldSeatsCount: number;
}

export interface CreateEventRequest {
  title: string;
  description: string;
  date: string; // ISO datetime string
  location: string;
  capacity: number;
  registeredCount: number;
  basePrice: number;
  isActive: boolean;
  imageUrl: string;
  googleMapsUrl: string;
}

export interface UpdateEventRequest {
  title: string;
  description: string;
  date: string; // ISO datetime string
  location: string;
  capacity: number;
  registeredCount: number;
  basePrice: number;
  isActive: boolean;
  imageUrl: string;
  googleMapsUrl: string;
}

export interface EventListResponse {
  events: Event[];
  total: number;
  page: number;
  limit: number;
}

export interface EventStats {
  totalEvents: number;
  activeEvents: number;
  totalCapacity: number;
  totalRevenue: number;
}

// Legacy support for existing components
export type EventCategory = 'Technology' | 'Music' | 'Business' | 'Startup' | 'Workshop';
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

export interface Venue = EventLocation & { id: string; capacity?: number };

import { User, Event, Seat } from './event';

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED';

export interface Booking {
  id: string;
  user: User;
  event: Event;
  totalAmount: number;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
  seats: Seat[];
}

export interface BookSeatsRequest {
  eventId: string;
  seatIds: string[];
}

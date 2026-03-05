import { TicketType } from "./ticket";

export type Venue = {
    id: string;
    name: string;
    address?: string;
    capacity?: number;
};

export type Event = {
    id: string;
    title: string;
    description?: string;
    date?: string;
    venueId?: string;
    image?: string;
    ticketTypes?: TicketType[];
    seating?: { seats: { id: string; label: string; status: string }[] } | null;
};

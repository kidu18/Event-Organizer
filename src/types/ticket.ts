export type TicketType = {
    id: string;
    name: string;
    price: number;
    currency: string;
    quantityAvailable: number;
};

export type Order = {
    id: string;
    userId: string;
    eventId: string;
    tickets: { ticketTypeId: string; qty: number; price: number }[];
    total: number;
    status: string;
};

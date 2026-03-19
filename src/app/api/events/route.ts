import { NextRequest, NextResponse } from "next/server";

// Mock events database (in production, use real database)
let events: any[] = [
    {
        id: "550e8400-e29b-41d4-a716-446655440001",
        title: "Tech Conference 2024",
        description: "A conference about latest tech trends",
        eventDate: "2024-12-01T09:00:00Z",
        venueName: "Main Auditorium",
        imageUrl: "https://picsum.photos/400/300?random=1",
        googleMapsUrl: "https://maps.google.com/?q=San+Francisco,+CA",
        totalRows: 10,
        totalColumns: 20,
        createdBy: {
            id: "550e8400-e29b-41d4-a716-446655440000",
            email: "admin@example.com",
            role: "ADMIN",
            firstName: "Admin",
            lastName: "User",
            createdAt: "2024-03-20T10:00:00Z",
            updatedAt: "2024-03-20T10:00:00Z"
        },
        createdAt: "2024-03-20T10:00:00Z",
        updatedAt: "2024-03-20T10:00:00Z",
        seats: generateSeats("550e8400-e29b-41d4-a716-446655440001", 10, 20, 99.99),
        availableSeatsCount: 150,
        lockedSeatsCount: 30,
        soldSeatsCount: 20
    },
    {
        id: "550e8400-e29b-41d4-a716-446655440002",
        title: "Music Festival 2024",
        description: "Annual music festival with top artists",
        eventDate: "2024-06-15T18:00:00Z",
        venueName: "Central Park",
        imageUrl: "https://picsum.photos/400/300?random=2",
        googleMapsUrl: "https://maps.google.com/?q=New+York,+NY",
        totalRows: 15,
        totalColumns: 30,
        createdBy: {
            id: "550e8400-e29b-41d4-a716-446655440000",
            email: "admin@example.com",
            role: "ADMIN",
            firstName: "Admin",
            lastName: "User",
            createdAt: "2024-03-20T10:00:00Z",
            updatedAt: "2024-03-20T10:00:00Z"
        },
        createdAt: "2024-03-18T14:00:00Z",
        updatedAt: "2024-03-18T14:00:00Z",
        seats: generateSeats("550e8400-e29b-41d4-a716-446655440002", 15, 30, 149.99),
        availableSeatsCount: 200,
        lockedSeatsCount: 50,
        soldSeatsCount: 200
    }
];

// Helper function to generate seats
function generateSeats(eventId: string, rows: number, columns: number, price: number) {
    const seats = [];
    for (let row = 1; row <= rows; row++) {
        for (let col = 1; col <= columns; col++) {
            const status = Math.random() > 0.7 ? 'SOLD' : Math.random() > 0.5 ? 'LOCKED' : 'AVAILABLE';
            seats.push({
                id: `${eventId}-${row}-${col}`,
                eventId,
                rowNumber: row,
                columnNumber: col,
                status,
                lockedAt: status === 'LOCKED' ? new Date().toISOString() : undefined,
                lockedBy: status === 'LOCKED' ? {
                    id: "user-" + Math.random(),
                    email: "user@example.com",
                    role: "USER",
                    firstName: "John",
                    lastName: "Doe",
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                } : undefined,
                price,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
        }
    }
    return seats;
}

// GET all events
export async function GET() {
    try {
        console.log('🔍 Fetching all events...');
        return NextResponse.json(events);
    } catch (error) {
        console.error("❌ Error fetching events:", error);
        return NextResponse.json(
            { error: "Failed to fetch events" },
            { status: 500 }
        );
    }
}

// POST create new event
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log('🔍 Creating event:', body.title);

        // Basic validation
        if (!body.title || !body.description || !body.location || !body.date) {
            return NextResponse.json(
                { error: "Missing required fields: title, description, location, date" },
                { status: 400 }
            );
        }

        // Create new event
        const newEvent = {
            id: "event-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9),
            title: body.title,
            description: body.description,
            eventDate: body.date,
            venueName: body.location,
            imageUrl: body.imageUrl || "https://picsum.photos/400/300?random=" + Date.now(),
            googleMapsUrl: body.googleMapsUrl || "",
            totalRows: Math.ceil(Math.sqrt(body.capacity)),
            totalColumns: Math.ceil(Math.sqrt(body.capacity)),
            createdBy: {
                id: "550e8400-e29b-41d4-a716-446655440000",
                email: "admin@example.com",
                role: "ADMIN",
                firstName: "Admin",
                lastName: "User",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            seats: generateSeats("event-" + Date.now(), Math.ceil(Math.sqrt(body.capacity)), Math.ceil(Math.sqrt(body.capacity)), body.basePrice),
            availableSeatsCount: body.capacity,
            lockedSeatsCount: 0,
            soldSeatsCount: 0
        };

        events.push(newEvent);
        console.log('✅ Event created successfully:', newEvent.title);
        
        return NextResponse.json(newEvent, { status: 201 });
    } catch (error) {
        console.error("❌ Error creating event:", error);
        return NextResponse.json(
            { error: "Failed to create event" },
            { status: 400 }
        );
    }
}

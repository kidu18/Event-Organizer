import { NextRequest, NextResponse } from "next/server";

// Mock events database (shared with main route)
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
        seats: [],
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
        seats: [],
        availableSeatsCount: 200,
        lockedSeatsCount: 50,
        soldSeatsCount: 200
    }
];

// GET single event by ID
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        console.log('🔍 Fetching event:', params.id);
        const event = events.find(e => e.id === params.id);
        
        if (!event) {
            console.log('❌ Event not found:', params.id);
            return NextResponse.json(
                { error: "Event not found" },
                { status: 404 }
            );
        }
        
        console.log('✅ Event found:', event.title);
        return NextResponse.json(event);
    } catch (error) {
        console.error("❌ Error fetching event:", error);
        return NextResponse.json(
            { error: "Failed to fetch event" },
            { status: 500 }
        );
    }
}

// PATCH update event (as per backend spec)
export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        console.log('🔍 Updating event:', params.id);
        
        const eventIndex = events.findIndex(e => e.id === params.id);
        
        if (eventIndex === -1) {
            console.log('❌ Event not found for update:', params.id);
            return NextResponse.json(
                { error: "Event not found" },
                { status: 404 }
            );
        }

        // Basic validation
        if (!body.title || !body.description || !body.location) {
            return NextResponse.json(
                { error: "Missing required fields: title, description, location" },
                { status: 400 }
            );
        }

        // Update event
        const updatedEvent = { 
            ...events[eventIndex], 
            title: body.title,
            description: body.description,
            eventDate: body.date,
            venueName: body.location,
            imageUrl: body.imageUrl || events[eventIndex].imageUrl,
            googleMapsUrl: body.googleMapsUrl || events[eventIndex].googleMapsUrl,
            updatedAt: new Date().toISOString()
        };
        
        events[eventIndex] = updatedEvent;
        console.log('✅ Event updated successfully:', updatedEvent.title);
        
        return NextResponse.json(updatedEvent);
    } catch (error) {
        console.error("❌ Error updating event:", error);
        return NextResponse.json(
            { error: "Failed to update event" },
            { status: 400 }
        );
    }
}

// DELETE event
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        console.log('🔍 Deleting event:', params.id);
        
        const eventIndex = events.findIndex(e => e.id === params.id);
        
        if (eventIndex === -1) {
            console.log('❌ Event not found for deletion:', params.id);
            return NextResponse.json(
                { error: "Event not found" },
                { status: 404 }
            );
        }

        // Remove event from array
        const deletedEvent = events.splice(eventIndex, 1)[0];
        
        console.log('✅ Event deleted successfully:', deletedEvent.title);
        return NextResponse.json(
            { message: "Event deleted successfully" },
            { status: 204 }
        );
    } catch (error) {
        console.error("❌ Error deleting event:", error);
        return NextResponse.json(
            { error: "Failed to delete event" },
            { status: 500 }
        );
    }
}

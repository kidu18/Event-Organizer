import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET single event by ID
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const events = db.event.findMany();
        const event = events.find(e => e.id === params.id);
        
        if (!event) {
            return NextResponse.json(
                { error: "Event not found" },
                { status: 404 }
            );
        }
        
        return NextResponse.json(event);
    } catch (error) {
        console.error("Error fetching event:", error);
        return NextResponse.json(
            { error: "Failed to fetch event" },
            { status: 500 }
        );
    }
}

// PUT update event
export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const events = db.event.findMany();
        const eventIndex = events.findIndex(e => e.id === params.id);
        
        if (eventIndex === -1) {
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

        // Update event (in real app, this would update database)
        const updatedEvent = { ...events[eventIndex], ...body };
        events[eventIndex] = updatedEvent;
        
        return NextResponse.json(updatedEvent);
    } catch (error) {
        console.error("Error updating event:", error);
        return NextResponse.json(
            { error: "Failed to update event" },
            { status: 400 }
        );
    }
}

// DELETE event
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const deletedEvent = db.event.delete({ where: { id: params.id } });
        
        if (!deletedEvent) {
            return NextResponse.json(
                { error: "Event not found" },
                { status: 404 }
            );
        }
        
        return NextResponse.json(
            { message: "Event deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting event:", error);
        return NextResponse.json(
            { error: "Failed to delete event" },
            { status: 500 }
        );
    }
}

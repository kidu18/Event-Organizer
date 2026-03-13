import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET all events
export async function GET() {
    try {
        const events = db.event.findMany();
        return NextResponse.json(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        return NextResponse.json(
            { error: "Failed to fetch events" },
            { status: 500 }
        );
    }
}

// POST create new event
export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        // Basic validation
        if (!body.title || !body.description || !body.location) {
            return NextResponse.json(
                { error: "Missing required fields: title, description, location" },
                { status: 400 }
            );
        }

        const event = db.event.create(body);
        return NextResponse.json(event, { status: 201 });
    } catch (error) {
        console.error("Error creating event:", error);
        return NextResponse.json(
            { error: "Failed to create event" },
            { status: 400 }
        );
    }
}

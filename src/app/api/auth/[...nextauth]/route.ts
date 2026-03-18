/** CONCEPT: Disabled NextAuth - Using custom backend authentication */
// This route is disabled since we're using custom backend authentication
// All auth requests are now handled by custom routes in /api/auth/

import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json(
        { message: "NextAuth disabled. Using custom authentication." },
        { status: 410 }
    );
}

export async function POST() {
    return NextResponse.json(
        { message: "NextAuth disabled. Using custom authentication." },
        { status: 410 }
    );
}

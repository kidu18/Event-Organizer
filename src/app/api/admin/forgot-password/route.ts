import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        // Check if user exists and is admin
        const user = await db.user.findUnique({
            where: { email: email }
        });

        if (!user || user.role !== "admin") {
            // Don't reveal if user exists for security
            return NextResponse.json(
                { message: "If an admin account exists with this email, reset instructions have been sent." },
                { status: 200 }
            );
        }

        // TODO: Implement actual password reset logic here:
        // 1. Generate secure reset token
        // 2. Set expiry time (e.g., 1 hour)
        // 3. Save token to database
        // 4. Send email with reset link
        
        // For now, we'll just return success
        // In production, you'd use a service like SendGrid, Nodemailer, etc.
        
        console.log(`Password reset requested for admin: ${email}`);
        
        return NextResponse.json(
            { message: "If an admin account exists with this email, reset instructions have been sent." },
            { status: 200 }
        );

    } catch (error) {
        console.error("Password reset error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

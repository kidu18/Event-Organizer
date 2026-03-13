/** CONCEPT: The Security Gatekeeper. This runs before any page loads to check if a user is allowed to see private routes like the dashboard. */
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
        const isUserRoute = req.nextUrl.pathname.startsWith("/user");

        if (isAdminRoute && token?.role !== "admin") {
            return NextResponse.redirect(new URL("/user", req.url));
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
        pages: {
            signIn: "/auth/login",
        },
    }
);

export const config = {
    matcher: ["/admin/:path*", "/user/:path*", "/my-tickets/:path*", "/auth/change-password"],
};


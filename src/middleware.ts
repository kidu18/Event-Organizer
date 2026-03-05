/** CONCEPT: The Security Gatekeeper. This runs before any page loads to check if a user is allowed to see private routes like the dashboard. */
import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/auth/login",
    },
});

export const config = {
    matcher: ["/dashboard/:path*", "/my-tickets/:path*", "/auth/change-password"],
};


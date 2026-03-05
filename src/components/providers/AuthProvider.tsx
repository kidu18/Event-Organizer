/** CONCEPT: The Client Context. This allows all components in the app to access the user's login state via the useSession() hook. */
"use client";

import { SessionProvider } from "next-auth/react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    return <SessionProvider>{children}</SessionProvider>;
}

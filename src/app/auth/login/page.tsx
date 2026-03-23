/** 
 * /auth/login → Redirects to the main /login page
 * This preserved route ensures old links and bookmarks still work.
 */
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthLoginRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/login");
    }, [router]);

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center">
            <div className="text-slate-400 text-sm animate-pulse">Redirecting to sign in...</div>
        </div>
    );
}

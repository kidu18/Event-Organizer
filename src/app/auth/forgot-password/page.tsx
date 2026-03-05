/** CONCEPT: The Recovery Logic. This handles the flow when a user loses access, using tokens to verify identity without a password. */
"use client";

import { useState } from "react";
import { Mail, ArrowLeft, Send, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Concept/Logic: In a real app, you would:
        // 1. Check if the user exists in the DB.
        // 2. Generate a secure, short-lived reset token (JWT or UUID).
        // 3. Save the token and expiration in the DB.
        // 4. Send an email with a link like: /auth/reset-password?token=xyz
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
                <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-green-100 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-4">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Check your email</h2>
                    <p className="text-gray-600">
                        We've sent a password reset link to <span className="font-semibold">{email}</span>.
                    </p>
                    <div className="pt-4">
                        <Link
                            href="/auth/login"
                            className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Sign In
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-indigo-100">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Forgot Password?
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        No worries, we'll send you reset instructions.
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                placeholder="admin@example.com"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all shadow-md active:scale-[0.98]"
                    >
                        <Send className="w-4 h-4 mr-2" />
                        Reset Password
                    </button>

                    <div className="text-center mt-4">
                        <Link
                            href="/auth/login"
                            className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Sign In
                        </Link>
                    </div>
                </form>

                <div className="mt-8 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                    <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-2">Senior Dev Concept</h4>
                    <p className="text-xs text-indigo-700 leading-relaxed">
                        In a real-world scenario, never reveal if an email exists in your system for security reasons. Always show a success message even if the email isn't found to prevent "account enumeration" attacks.
                    </p>
                </div>
            </div>
        </div>
    );
}

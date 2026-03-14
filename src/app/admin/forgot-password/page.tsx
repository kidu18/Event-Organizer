"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, ArrowLeft, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";

const forgotPasswordSchema = z.object({
    email: z.string().email("Please enter a valid admin email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function AdminForgotPasswordPage() {
    const router = useRouter();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data: ForgotPasswordFormValues) => {
        setIsLoading(true);
        setError(null);

        try {
            // TODO: Implement actual password reset logic
            // This would typically:
            // 1. Verify the email exists in admin users
            // 2. Generate a reset token
            // 3. Send reset email
            // 4. Store token in database with expiry
            
            // Simulate API call
            const response = await fetch("/api/admin/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setIsSubmitted(true);
            } else {
                setError("Email not found or server error. Please try again.");
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                <div className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-green-500/20 rounded-xl mb-4">
                        <CheckCircle className="w-12 h-12 text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Reset Email Sent</h2>
                    <p className="text-gray-300">
                        We've sent password reset instructions to your admin email address.
                        Please check your inbox and follow the link to reset your password.
                    </p>
                    <div className="pt-6">
                        <Link
                            href="/admin/login"
                            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Admin Login
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20">
                {/* Header */}
                <div className="text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg mb-4">
                        <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-white tracking-tight">
                        Reset Admin Password
                    </h2>
                    <p className="mt-2 text-sm text-gray-300">
                        Enter your admin email to receive password reset instructions
                    </p>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="bg-red-500/20 border-l-4 border-red-500 p-4 rounded-md flex items-start space-x-3 backdrop-blur">
                        <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                        <p className="text-sm text-red-300">{error}</p>
                    </div>
                )}

                {/* Form */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                            Admin Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                {...register("email")}
                                type="email"
                                className={`block w-full text-white pl-10 pr-3 py-3 bg-white/10 border ${errors.email ? "border-red-500" : "border-white/20"
                                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur placeholder-gray-400 transition-all`}
                                placeholder="admin@yourcompany.com"
                            />
                        </div>
                        {errors.email && (
                            <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all shadow-lg active:scale-[0.98] disabled:opacity-70"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                "Send Reset Instructions"
                            )}
                        </button>
                    </div>
                </form>

                {/* Footer */}
                <div className="text-center mt-6 pt-6 border-t border-white/10">
                    <Link
                        href="/admin/login"
                        className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors text-sm"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Admin Login
                    </Link>
                </div>
            </div>
        </div>
    );
}

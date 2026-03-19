/** CONCEPT: The Security Management. This allows an authenticated user to update their identity secret (password). */
"use client";

import { useState } from "react";
import { Lock, ShieldCheck, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(changePasswordSchema),
    });

    const onSubmit = async (data: ChangePasswordFormValues) => {
        setIsLoading(true);
        setError(null);

        // Concept/Logic:
        // 1. Send currentPassword and newPassword to the server.
        // 2. Server verifies currentPassword against the DB (hashed comparison).
        // 3. Server hashes newPassword and updates the DB.
        // 4. Session remains valid or user is re-authenticated.

        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
            reset();
        }, 1500);
    };

    if (isSuccess) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
                <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-green-100 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-4">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Password Updated</h2>
                    <p className="text-gray-600">
                        Your password has been changed successfully. You can now use your new password to sign in.
                    </p>
                    <div className="pt-4">
                        <button
                            onClick={() => router.push("/dashboard")}
                            className="w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-md active:scale-[0.98]"
                        >
                            Go to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-indigo-100">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-xl mb-4">
                        <ShieldCheck className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Change Password
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Update your account security
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-start space-x-3">
                        <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Current Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    {...register("currentPassword")}
                                    type="password"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-indigo-500 transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                            {errors.currentPassword && (
                                <p className="mt-1 text-xs text-red-600">{errors.currentPassword.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                New Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    {...register("newPassword")}
                                    type="password"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-indigo-500 transition-all"
                                    placeholder="•••••••••"
                                />
                            </div>
                            {errors.newPassword && (
                                <p className="mt-1 text-xs text-red-600">{errors.newPassword.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    {...register("confirmPassword")}
                                    type="password"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-indigo-500 transition-all"
                                    placeholder="•••••••••"
                                />
                            </div>
                            {errors.confirmPassword && (
                                <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-all active:scale-[0.98] disabled:opacity-70"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            "Update Password"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

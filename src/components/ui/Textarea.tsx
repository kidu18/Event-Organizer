"use client"
import React from "react";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string;
    error?: string;
};

export default function Textarea({ label, error, ...props }: Props) {
    return (
        <label className="block w-full">
            {label && <span className="text-sm font-medium text-gray-300 mb-1 block">{label}</span>}
            <textarea
                {...props}
                className={`bg-[#0f172a] border ${error ? 'border-red-500' : 'border-slate-700'} rounded-lg p-3 w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all min-h-[120px] ${props.className ?? ""}`}
            />
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </label>
    );
}

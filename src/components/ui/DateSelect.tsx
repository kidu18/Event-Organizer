"use client";

import React from "react";

type Props = {
    value?: string;
    onChange?: (v: string) => void;
    className?: string;
    placeholder?: string;
};

export default function DateSelect({ value, onChange, className = "", placeholder = "Select date" }: Props) {
    const ref = React.useRef<HTMLInputElement | null>(null);

    function openPicker() {
        const input = ref.current;
        if (!input) return;
        const anyInput = input as any;
        if (typeof anyInput.showPicker === "function") {
            try { anyInput.showPicker(); return; } catch { /* ignore */ }
        }
        try { input.focus(); input.click(); } catch { /* ignore */ }
    }

    return (
        <div className={`flex items-center ${className} relative w-full`}>
            <input
                ref={ref}
                type="date"
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                aria-label={placeholder}
                className="absolute opacity-0 w-0 h-0 pointer-events-none"
            />

            <button
                type="button"
                onClick={openPicker}
                aria-label={placeholder}
                className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-full bg-[rgba(255,255,255,0.03)] text-black hover:bg-[rgba(255,255,255,0.06)] w-full transition-colors"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10h10M7 14h10M17 3v2M7 3v2M21 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V7h18z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-sm text-slate-400 whitespace-nowrap">{value ? value : placeholder}</span>
            </button>
        </div>
    );
}

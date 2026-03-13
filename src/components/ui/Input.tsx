"use client"
import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export default function Input({ label, error, ...props }: Props) {
  return (
    <label className="block w-full">
      {label && <span className="text-sm font-medium text-gray-300 mb-1 block">{label}</span>}
      <input
        {...props}
        className={`bg-[#0f172a] border ${error ? 'border-red-500' : 'border-slate-700'} rounded-lg p-3 w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${props.className ?? ""}`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </label>
  );
}

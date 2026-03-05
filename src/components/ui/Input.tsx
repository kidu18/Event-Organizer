"use client"
import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export default function Input({ label, ...props }: Props) {
  return (
    <label className="block">
      {label && <span className="text-sm text-gray-700">{label}</span>}
      <input {...props} className={props.className ?? "mt-1 p-2 border rounded w-full"} />
    </label>
  );
}

"use client"
import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
};

export default function Button({ children, ...props }: Props) {
  return (
    <button
      {...props}
      className={props.className ?? "px-4 py-2 rounded bg-blue-600 text-white"}
    >
      {children}
    </button>
  );
}

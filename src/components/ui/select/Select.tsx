'use client'

import React, { useEffect, useRef, useState } from "react";

type Props = {
	options: string[];
	value?: string;
	onChange?: (value: string) => void;
	className?: string;
	placeholder?: string;
};

export default function Select({ options, value, onChange, className = "", placeholder }: Props) {
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState<string>(value ?? "");
	const ref = useRef<HTMLDivElement | null>(null);
	const listRef = useRef<HTMLUListElement | null>(null);
	const [highlightIndex, setHighlightIndex] = useState<number>(-1);

	useEffect(() => setSelected(value ?? ""), [value]);

	useEffect(() => {
		function onDoc(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
		}
		document.addEventListener("mousedown", onDoc);
		return () => document.removeEventListener("mousedown", onDoc);
	}, []);

	useEffect(() => {
		if (open) setHighlightIndex(options.indexOf(selected));
		else setHighlightIndex(-1);
	}, [open, options, selected]);

	function handleSelect(v: string) {
		setSelected(v);
		onChange?.(v);
		setOpen(false);
	}

	function onKeyDown(e: React.KeyboardEvent) {
		if (!open) {
			if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				setOpen(true);
			}
			return;
		}

		if (e.key === "Escape") return setOpen(false);
		if (e.key === "ArrowDown") setHighlightIndex((i) => Math.min(i + 1, options.length - 1));
		if (e.key === "ArrowUp") setHighlightIndex((i) => Math.max(i - 1, 0));
		if (e.key === "Enter" && highlightIndex >= 0) handleSelect(options[highlightIndex]);
	}

	return (
		<div ref={ref} className={`relative ${className}`}>
			<button
				type="button"
				aria-haspopup="listbox"
				aria-expanded={open}
				onClick={() => setOpen((s) => !s)}
				onKeyDown={onKeyDown}
				className="w-full p-3 rounded border flex items-center justify-between bg-transparent text-black"
			>
				<span className="truncate">{selected || placeholder || "Select"}</span>
				<span className="ml-3 text-sm text-black">▾</span>
			</button>

			{open && (
				<ul
					ref={listRef}
					role="listbox"
					tabIndex={-1}
					className="absolute z-20 mt-1 w-full bg-[var(--color-surface)] text-black rounded shadow-md max-h-48 overflow-auto"
				>
					{options.map((opt, idx) => (
						<li
							key={opt}
							role="option"
							aria-selected={opt === selected}
							onClick={() => handleSelect(opt)}
							onMouseEnter={() => setHighlightIndex(idx)}
							className={`px-3 py-2 cursor-pointer hover:bg-[var(--color-primary)] hover:text-white ${opt === selected ? "bg-[var(--color-primary)] text-white" : highlightIndex === idx ? "bg-[rgba(0,0,0,0.06)]" : ""}`}
						>
							{opt}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

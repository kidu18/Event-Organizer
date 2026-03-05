"use client"
import { useState } from "react";

export function useCart() {
  const [items, setItems] = useState<Array<any>>([]);
  function add(item: any) {
    setItems((s) => [...s, item]);
  }
  function clear() {
    setItems([]);
  }
  return { items, add, clear };
}

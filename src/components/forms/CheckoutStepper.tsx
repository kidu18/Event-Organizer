"use client"
import React from "react";

export default function CheckoutStepper({ step = 1 }: { step?: number }) {
  return (
    <div className="flex items-center gap-4">
      <div className="font-semibold">Step {step} of 3</div>
    </div>
  );
}

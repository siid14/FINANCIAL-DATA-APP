import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// This utility function helps us combine Tailwind classes efficiently
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function for formatting financial numbers
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Helper function for formatting percentages
export function formatPercentage(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
}

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function formatHours(hours: number): string {
  if (hours < 1) {
    return `${Math.round(hours * 60)}m`;
  }
  return `${hours.toFixed(1)}h`;
}

export function getDarkPriorityColor(priority: string): string {
  switch (priority) {
    case "URGENT":
      return "text-red-400 bg-red-900/30 border border-red-800";
    case "HIGH":
      return "text-orange-400 bg-orange-900/30 border border-orange-800";
    case "MEDIUM":
      return "text-yellow-400 bg-yellow-900/30 border border-yellow-800";
    case "LOW":
      return "text-purple-400 bg-purple-900/30 border border-purple-800";
    default:
      return "text-gray-400 bg-gray-800/50 border border-gray-700";
  }
}

export function getDarkStatusColor(status: string) {
  switch (status) {
    case "ACTIVE":
      return "text-blue-300 bg-blue-500/10";
    case "COMPLETED":
      return "text-emerald-300 bg-emerald-500/10";
    case "ARCHIVED":
      return "text-amber-300 bg-amber-500/10";
    default:
      return "text-gray-300 bg-gray-700/30";
  }
}


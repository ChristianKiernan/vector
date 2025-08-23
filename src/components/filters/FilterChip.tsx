"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export type FilterChipProps = {
  label: string;
  value: string;
  onClear?: () => void;
  active?: boolean;
  className?: string;
};

export function FilterChip({
  label,
  value,
  onClear,
  active = true,
  className,
}: FilterChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs",
        active
          ? "border-blue-400/30 bg-blue-500/15 text-blue-100"
          : "border-gray-700/70 bg-gray-800/80 text-gray-300",
        className,
      )}
    >
      <span className="font-semibold">{label}:</span>
      <span className="truncate">{value}</span>
      {active && onClear && (
        <button
          type="button"
          className="ml-1 rounded p-0.5 text-blue-200 hover:bg-blue-500/15 hover:text-white"
          onClick={onClear}
          aria-label={`Clear ${label.toLowerCase()} filter`}
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      )}
    </span>
  );
}

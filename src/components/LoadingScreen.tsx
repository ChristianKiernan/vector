import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type SpinnerProps = {
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
};

export function Spinner({
  label = "Loading...",
  size = "md",
  className,
}: SpinnerProps) {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }[size];

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={cn("flex items-center gap-2 text-gray-400", className)}
    >
      <Loader2
        className={cn(sizes, "motion-safe:animate-spin")}
        aria-hidden="true"
        focusable="false"
      />
      <span className="text-sm">{label}</span>
    </div>
  );
}

type LoadingScreenProps = {
  label?: string;
  fullscreen?: boolean; // true = full viewport; false = inline block
};

export function LoadingScreen({
  label = "Loading...",
  fullscreen = true,
}: LoadingScreenProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        fullscreen ? "min-h-screen bg-gray-950" : "py-10",
      )}
    >
      <Spinner label={label} size="md" />
    </div>
  );
}

// Overlay loader for sections while preserving layout
export function PanelOverlayLoader({
  label = "Loading...",
}: {
  label?: string;
}) {
  return (
    <div className="absolute inset-0 z-10 grid place-items-center rounded-xl bg-gray-900/60 backdrop-blur-sm">
      <Spinner label={label} size="md" className="text-gray-300" />
    </div>
  );
}

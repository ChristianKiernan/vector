"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils"; 
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium transition-all duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        // Vibrant gradient primary for dark UIs
        primary:
          "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/15 hover:from-blue-500 hover:to-indigo-500",
        // Subtle solid for dark backgrounds
        secondary:
          "bg-gray-800 text-gray-100 border border-gray-700 hover:bg-gray-750 hover:border-gray-600 shadow-sm",
        // Transparent until hover
        ghost: "text-gray-300 hover:text-white hover:bg-gray-800/60",
        // Hairline outline
        outline:
          "border border-gray-700 text-gray-200 bg-transparent hover:bg-gray-850 hover:border-gray-600",
        // Status variants
        success:
          "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg shadow-emerald-500/15 hover:from-emerald-500 hover:to-green-500",
        warning:
          "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-500/15 hover:from-amber-500 hover:to-orange-500",
        destructive:
          "bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-lg shadow-rose-500/15 hover:from-rose-500 hover:to-red-500",
        link: "text-blue-400 underline-offset-4 hover:underline hover:text-blue-300 px-0",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-lg",
        icon: "h-10 w-10 p-0",
      },
      block: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  // Adds a spinner & disables the button 
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      block,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, block }), className)}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading && <Loader2 aria-hidden className="h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

// Icon-only convenience (forces accessible label)
export interface IconButtonProps
  extends Omit<ButtonProps, "children" | "size"> {
  label: string;
  size?: Extract<ButtonProps["size"], "sm" | "md" | "lg" | "icon">;
  children: React.ReactNode; // the icon
}

export function IconButton({
  label,
  size = "icon",
  variant = "secondary",
  loading,
  children,
  className,
  ...props
}: IconButtonProps) {
  return (
    <Button
      aria-label={label}
      title={label}
      size={size}
      variant={variant}
      loading={loading}
      className={cn("p-0", className)}
      {...props}
    >
      {children}
    </Button>
  );
}

export function ButtonGroup({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "inline-flex overflow-hidden rounded-xl border border-gray-700 bg-gray-800/50",
        className,
      )}
    >
      {React.Children.map(children, (child, idx) => (
        <div
          className={cn(
            "[&>*]:rounded-none [&>*]:border-0",
            idx !== 0 && "border-l border-gray-700",
          )}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

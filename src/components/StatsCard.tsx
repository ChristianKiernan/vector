"use client";

import * as React from "react";

type Color = "blue" | "green" | "yellow" | "purple" | "gray";

const colorMap: Record<Color, { wrap: string; icon: string }> = {
  blue: { wrap: "bg-blue-600/20", icon: "text-blue-400" },
  green: { wrap: "bg-green-600/20", icon: "text-green-400" },
  yellow: { wrap: "bg-yellow-600/20", icon: "text-yellow-400" },
  purple: { wrap: "bg-purple-600/20", icon: "text-purple-400" },
  gray: { wrap: "bg-gray-600/20", icon: "text-gray-300" },
};

export interface StatsCardProps {
  label: string;
  value: React.ReactNode;
  color?: Color;
  icon?: React.ReactNode;
  className?: string;
}

export default function StatsCard({
  label,
  value,
  color = "gray",
  icon,
  className = "",
}: StatsCardProps) {
  const colors = colorMap[color];

  return (
    <div
      className={`rounded-xl border border-gray-800 bg-gray-900/50 p-6 shadow-xl backdrop-blur-sm ${className}`}
      role="region"
      aria-label={label}
    >
      <div className="flex items-center">
        {icon && (
          <div className={`rounded-lg p-3 ${colors.wrap}`}>
            <div className={`h-6 w-6 ${colors.icon}`}>{icon}</div>
          </div>
        )}
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-400">{label}</p>
          <p className="text-2xl font-semibold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}

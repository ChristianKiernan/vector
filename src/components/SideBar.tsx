"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  Home as HomeIcon,
  LayoutDashboard,
  BarChart3,
  FolderKanban,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

type NavItem = {
  name: string;
  href: string;
  icon: LucideIcon;
};

export function Sidebar({ className = "" }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false); // same default on server & client

  const items: NavItem[] = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Projects", href: "/projects", icon: FolderKanban },
  ];

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className={`relative ${className}`}>
      <div
        className={`group relative flex h-auto w-full flex-col bg-gradient-to-b from-gray-900 via-gray-900 to-slate-900 shadow-2xl backdrop-blur-xl transition-all duration-300 md:h-screen ${isCollapsed ? "md:w-20" : "md:w-64"} `}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />

        {/* Header */}
        <div className="relative flex items-center justify-between border-b border-gray-700/50 p-4 sm:p-6">
          <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25">
              <span className="text-sm font-bold text-white">P</span>
            </div>
            {/* Hide label only when collapsed on md+; always show on mobile */}
            <h1
              className={`bg-gradient-to-r from-white via-blue-50 to-gray-100 bg-clip-text text-base font-bold text-transparent sm:text-lg ${isCollapsed ? "hidden md:block md:opacity-0" : "block"} md:transition-opacity md:duration-200`}
            >
              Project Hub
            </h1>
          </div>

          {/* Collapse (desktop only) */}
          <button
            onClick={() => setIsCollapsed((v) => !v)}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!isCollapsed}
            className="hidden rounded-xl p-2 text-gray-400 transition-all duration-200 hover:scale-110 hover:bg-gray-800/50 hover:text-white active:scale-95 md:block"
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Nav */}
        <nav className="relative flex-1 space-y-2 p-3 sm:p-4">
          {items.map(({ name, href, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={name}
                href={href}
                className={`group/item relative flex items-center rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-95 ${
                  active
                    ? "bg-gradient-to-r from-blue-500/20 to-blue-600/10 text-blue-300 shadow-lg shadow-blue-500/10"
                    : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
                } `}
              >
                {active && (
                  <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-blue-400/10 to-blue-600/5 blur-sm" />
                )}
                {/* left indicator only on desktop (top bar on mobile) */}
                {active && (
                  <div className="absolute top-1/2 left-0 hidden h-8 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-blue-400 to-blue-600 shadow-lg shadow-blue-500/25 md:block" />
                )}

                <div
                  className={`flex items-center ${isCollapsed ? "justify-center" : "space-x-3"}`}
                >
                  <Icon
                    className={`h-5 w-5 transition-colors duration-200 ${
                      active
                        ? "text-blue-300"
                        : "text-gray-400 group-hover/item:text-white"
                    }`}
                    aria-hidden="true"
                  />
                  <span
                    className={`relative z-10 transition-opacity duration-200 ${isCollapsed ? "hidden md:inline-block md:opacity-0" : "inline-block"} `}
                  >
                    {name}
                  </span>
                </div>

                {/* Tooltip on collapse (desktop only) */}
                {isCollapsed && (
                  <div className="absolute left-full z-20 ml-3 hidden rounded-xl bg-gray-800 px-3 py-2 text-sm text-white shadow-xl md:group-hover/item:block">
                    {name}
                    <div className="absolute top-1/2 right-full -translate-y-1/2 border-4 border-transparent border-r-gray-800" />
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="relative border-t border-gray-700/50 p-4">
          <div
            className={`flex items-center ${isCollapsed ? "justify-center" : "space-x-3"}`}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-gray-600 to-gray-700">
              <span className="text-xs font-medium text-white">U</span>
            </div>
            <div
              className={`${isCollapsed ? "hidden md:block md:opacity-0" : "block"} min-w-0`}
            >
              <p className="truncate text-sm font-medium text-white">
                User Name
              </p>
              <p className="truncate text-xs text-gray-400">user@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

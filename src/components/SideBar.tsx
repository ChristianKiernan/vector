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
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigationItems: NavItem[] = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Projects", href: "/projects", icon: FolderKanban },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Sidebar */}
      <div
        className={`group relative flex h-screen flex-col border-r border-gray-700/50 bg-gradient-to-b from-gray-900 via-gray-900 to-slate-900 shadow-2xl backdrop-blur-xl transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/2 via-transparent to-purple-500/2" />

        {/* Header */}
        <div className="relative flex items-center justify-between border-b border-gray-700/50 p-6">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25">
                <span className="text-sm font-bold text-white">P</span>
              </div>
              <h1 className="bg-gradient-to-r from-white via-blue-50 to-gray-100 bg-clip-text text-lg font-bold text-transparent">
                Project Hub
              </h1>
            </div>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="rounded-xl p-2 text-gray-400 transition-all duration-200 hover:scale-110 hover:bg-gray-800/50 hover:text-white active:scale-95"
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="relative flex-1 space-y-2 p-4">
          {navigationItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group/item relative flex items-center rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 ${
                  active
                    ? "bg-gradient-to-r from-blue-500/20 to-blue-600/10 text-blue-300 shadow-lg shadow-blue-500/10"
                    : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
                }`}
              >
                {/* Active state background glow */}
                {active && (
                  <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-blue-400/10 to-blue-600/5 blur-sm" />
                )}

                {/* Active state indicator line */}
                {active && (
                  <div className="absolute top-1/2 left-0 h-8 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-blue-400 to-blue-600 shadow-lg shadow-blue-500/25" />
                )}

                {/* Hover state background */}
                {!active && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gray-700/10 to-gray-600/10 opacity-0 transition-opacity duration-200 group-hover/item:opacity-100" />
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

                  {!isCollapsed && (
                    <span className="relative z-10 transition-colors duration-200">
                      {item.name}
                    </span>
                  )}
                </div>

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-4 hidden rounded-xl bg-gray-800 px-3 py-2 text-sm text-white shadow-xl group-hover/item:block">
                    {item.name}
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
            {!isCollapsed && (
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">
                  User Name
                </p>
                <p className="truncate text-xs text-gray-400">
                  user@example.com
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

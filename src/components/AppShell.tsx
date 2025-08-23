"use client";

import { SideBar } from "@/components/SideBar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Sidebar: top on mobile, left on desktop */}
      <aside className="sticky top-0 z-40 w-full border-b border-gray-800 bg-transparent md:sticky md:top-0 md:h-screen md:w-auto md:flex-none md:shrink-0 md:border-r md:border-b-0">
        {/* Inner Sidebar controls width on desktop (md:w-64 or md:w-20) */}
        <SideBar className="h-auto w-full md:h-screen" />
      </aside>

      {/* Main content */}
      <main className="min-w-0 flex-1 overflow-auto">{children}</main>
    </div>
  );
}

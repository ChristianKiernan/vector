"use client";

import { useMemo, useRef, useState } from "react";
import { Button, ButtonGroup } from "@/components/Button";
import {
  Filter,
  CheckCircle2,
  Circle,
  Archive,
  AlertTriangle,
  Sun,
  CalendarRange,
  CalendarX,
  CalendarDays,
} from "lucide-react";
import { FilterChip } from "@/components/filters/FilterChip";
import { useClickOutside } from "@/components/filters/useClickOutside";
import type {
  StatusFilter,
  TaskDueFilter,
  PriorityFilter,
} from "@/lib/filters";
import { cn } from "@/lib/utils";

export type TasksInlineFiltersProps = {
  status: StatusFilter;
  setStatus: (s: StatusFilter) => void;
  due: TaskDueFilter;
  setDue: (d: TaskDueFilter) => void;
  priority: PriorityFilter;
  setPriority: (p: PriorityFilter) => void;
  className?: string; 
};

const PRIORITY_OPTS: PriorityFilter[] = [
  "all",
  "LOW",
  "MEDIUM",
  "HIGH",
  "URGENT",
];

export function TasksInlineFilters({
  status,
  setStatus,
  due,
  setDue,
  priority,
  setPriority,
  className,
}: TasksInlineFiltersProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));

  const statusLabel =
    status === "all" ? "All" : status[0]!.toUpperCase() + status.slice(1);
  const dueLabel =
    due === "all"
      ? "All"
      : due === "noDueDate"
        ? "None"
        : due[0]!.toUpperCase() + due.slice(1);
  const priorityLabel = priority === "all" ? "All" : priority;

  const activeCount = useMemo(
    () =>
      (status !== "all" ? 1 : 0) +
      (due !== "all" ? 1 : 0) +
      (priority !== "all" ? 1 : 0),
    [status, due, priority],
  );

  return (
    <div className={cn("relative", className)}>
      {/* Summary row */}
      <div className="flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="relative border-blue-500/40 text-blue-200 hover:border-blue-400 hover:bg-blue-500/10 focus-visible:ring-blue-500"
        >
          <Filter className="h-4 w-4" /> Filters
          {activeCount > 0 && (
            <span className="ml-2 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-blue-600 px-1 text-xs font-semibold text-white">
              {activeCount}
            </span>
          )}
        </Button>

        <span
          aria-hidden
          className="mx-1 hidden h-5 w-px bg-gray-800 sm:inline-block"
        />

        <FilterChip
          label="Status"
          value={statusLabel}
          active={status !== "all"}
          onClear={status !== "all" ? () => setStatus("all") : undefined}
        />
        <span aria-hidden className="text-gray-500">
          ·
        </span>
        <FilterChip
          label="Due"
          value={dueLabel}
          active={due !== "all"}
          onClear={due !== "all" ? () => setDue("all") : undefined}
        />
        <span aria-hidden className="text-gray-500">
          ·
        </span>
        <FilterChip
          label="Priority"
          value={priorityLabel}
          active={priority !== "all"}
          onClear={priority !== "all" ? () => setPriority("all") : undefined}
        />
      </div>

      {/* Popover (always mounted; animated open/close) */}
      <div
        ref={ref}
        data-open={open}
        aria-hidden={!open}
        className="pointer-events-none absolute right-0 z-30 mt-2 max-h-[70vh] w-[min(92vw,720px)] scale-95 overflow-auto rounded-xl border border-gray-800 bg-gray-900/95 p-3 opacity-0 shadow-2xl backdrop-blur-xl transition-all duration-150 data-[open=true]:pointer-events-auto data-[open=true]:scale-100 data-[open=true]:opacity-100"
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {/* Status */}
          <section className="rounded-lg border border-gray-800 p-2">
            <p className="mb-2 text-xs font-semibold tracking-wide text-gray-200 uppercase">
              Status
            </p>
            <ButtonGroup className="flex flex-wrap gap-1 border-0 bg-transparent shadow-none">
              <Button
                size="sm"
                variant={status === "all" ? "primary" : "secondary"}
                onClick={() => setStatus("all")}
              >
                <Circle className="h-4 w-4" /> All
              </Button>
              <Button
                size="sm"
                variant={status === "active" ? "primary" : "secondary"}
                onClick={() => setStatus("active")}
              >
                <Circle className="h-4 w-4" /> Active
              </Button>
              <Button
                size="sm"
                variant={status === "completed" ? "primary" : "secondary"}
                onClick={() => setStatus("completed")}
              >
                <CheckCircle2 className="h-4 w-4" /> Completed
              </Button>
              <Button
                size="sm"
                variant={status === "archived" ? "primary" : "secondary"}
                onClick={() => setStatus("archived")}
              >
                <Archive className="h-4 w-4" /> Archived
              </Button>
            </ButtonGroup>
          </section>

          {/* Due */}
          <section className="rounded-lg border border-gray-800 p-2">
            <p className="mb-2 text-xs font-semibold tracking-wide text-gray-200 uppercase">
              Due Date
            </p>
            <ButtonGroup className="flex flex-wrap gap-1 border-0 bg-transparent shadow-none">
              <Button
                size="sm"
                variant={due === "all" ? "primary" : "secondary"}
                onClick={() => setDue("all")}
              >
                <CalendarDays className="h-4 w-4" /> All
              </Button>
              <Button
                size="sm"
                variant={due === "overdue" ? "primary" : "secondary"}
                onClick={() => setDue("overdue")}
              >
                <AlertTriangle className="h-4 w-4" /> Overdue
              </Button>
              <Button
                size="sm"
                variant={due === "today" ? "primary" : "secondary"}
                onClick={() => setDue("today")}
              >
                <Sun className="h-4 w-4" /> Today
              </Button>
              <Button
                size="sm"
                variant={due === "week" ? "primary" : "secondary"}
                onClick={() => setDue("week")}
              >
                <CalendarRange className="h-4 w-4" /> Week
              </Button>
              <Button
                size="sm"
                variant={due === "noDueDate" ? "primary" : "secondary"}
                onClick={() => setDue("noDueDate")}
              >
                <CalendarX className="h-4 w-4" /> None
              </Button>
            </ButtonGroup>
          </section>

          {/* Priority */}
          <section className="rounded-lg border border-gray-800 p-2 sm:col-span-2">
            <p className="mb-2 text-xs font-semibold tracking-wide text-gray-200 uppercase">
              Priority
            </p>
            <ButtonGroup className="flex flex-wrap gap-1 border-0 bg-transparent shadow-none">
              {PRIORITY_OPTS.map((p) => (
                <Button
                  key={p}
                  size="sm"
                  variant={priority === p ? "primary" : "secondary"}
                  onClick={() => setPriority(p)}
                >
                  {p === "all" ? "All Priorities" : p}
                </Button>
              ))}
            </ButtonGroup>
          </section>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-gray-800 pt-3">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setStatus("all");
              setDue("all");
              setPriority("all");
            }}
          >
            Reset
          </Button>
          <Button size="sm" variant="primary" onClick={() => setOpen(false)}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}

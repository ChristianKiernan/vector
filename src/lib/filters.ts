import type { Task, Project, Priority } from "@/types";

export type Timeframe = "all" | "today" | "week" | "month" | "overdue" | "noDueDate";
export type StatusFilter = "all" | "active" | "completed" | "archived";
export type TaskDueFilter = Timeframe; 
export type ProjectDueFilter = Timeframe;
export type PriorityFilter = "all" | Priority; 

// status checks 
function matchesStatus(status: string, filter: StatusFilter) {
  if (filter === "all") return true;
  const isCompleted = status === "COMPLETED";
  const isArchived = status === "ARCHIVED";
  if (filter === "archived") return isArchived;
  if (filter === "completed") return isCompleted && !isArchived;

   // active = not completed and not archived
   return !isCompleted && !isArchived;
}

export function filterProjects(
  projects: Project[],
  opts: {
    status?: StatusFilter;
    due?: ProjectDueFilter;
    priority?: PriorityFilter;
    now?: Date;
  },
) {
  const {
    status = "all",
    due = "all",
    priority = "all",
    now = new Date(),
  } = opts;

  const startOf = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const endOf = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
  const todayStart = startOf(now);
  const todayEnd = endOf(now);
  const weekEnd = endOf(
    new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7),
  );

  return projects.filter((p) => {
    if (!matchesStatus(p.status, status)) return false;
    if (priority !== "all" && p.priority !== priority) return false;

    const endISO = p.endDate as string | undefined;
    if (due === "all") return true;
    if (due === "noDueDate") return !endISO;
    if (!endISO) return false;

    const d = new Date(endISO);
    if (due === "overdue") return d < todayStart;
    if (due === "today") return d >= todayStart && d <= todayEnd;
    if (due === "week") return d >= todayStart && d <= weekEnd;
    return true;
  });
}

export function filterTasks(
  tasks: Task[],
  opts: {
    due?: TaskDueFilter;
    status?: StatusFilter;
    priority?: PriorityFilter;
    now?: Date;
  }
) {
  const { due = "all", status = "all", priority = "all", now = new Date() } = opts;

  const startOf = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const endOf = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
  const todayStart = startOf(now);
  const todayEnd = endOf(now);
  const weekEnd = endOf(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7));

  return tasks.filter((t) => {
    // status
    if (!matchesStatus(t.status, status)) return false;
    if (priority !== "all" && t.priority !== priority) return false;

    // priority
    if (priority !== "all" && t.priority !== priority) return false;

    // due
    const dueISO = t.dueDate as string | undefined;
    if (due === "all") return true;
    if (due === "noDueDate") return !dueISO;
    if (!dueISO) return false;

    const dueDate = new Date(dueISO);
    if (due === "overdue") return dueDate < todayStart;
    if (due === "today") return dueDate >= todayStart && dueDate <= todayEnd;
    if (due === "week") return dueDate >= todayStart && dueDate <= weekEnd;

    return true;
  });
}

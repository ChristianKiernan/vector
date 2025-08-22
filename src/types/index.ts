export type Priority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
export type Status = "ACTIVE" | "COMPLETED" | "ARCHIVED";
export const FILTER_OPTIONS = ["all", "today", "week", "month"] as const;
export type TaskFilter = (typeof FILTER_OPTIONS)[number];

export interface Project {
  id: string;
  name: string;
  description?: string;
  estimatedHours?: number;
  actualHours: number;
  startDate?: Date;
  endDate?: Date;
  completedAt?: Date;
  priority: Priority;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  tasks?: Task[];
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  estimatedHours?: number;
  actualHours: number;
  priority: Priority;
  status: Status;
  dueDate?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  projectId?: string;
  project?: Project;
  timeEntries?: TimeEntry[];
}

export interface TimeEntry {
  id: string;
  hours: number;
  description?: string;
  date: Date;
  createdAt: Date;
  taskId: string;
  task?: Task;
}

export interface AnalyticsData {
  totalTasks: number;
  completedTasks: number;
  totalProjects: number;
  completedProjects: number;
  totalHours: number;
  accuracyScore: number;
  dailyStats: Array<{
    date: string;
    tasksCompleted: number;
    hoursWorked: number;
  }>;
  weeklyStats: Array<{
    week: string;
    tasksCompleted: number;
    hoursWorked: number;
  }>;
  monthlyStats: Array<{
    month: string;
    tasksCompleted: number;
    hoursWorked: number;
  }>;
}

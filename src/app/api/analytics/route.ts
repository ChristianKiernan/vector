import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const now = new Date();
    // const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Basic stats
    const [totalTasks, completedTasks, totalProjects, completedProjects] =
      await Promise.all([
        prisma.task.count(),
        prisma.task.count({ where: { status: "COMPLETED" } }),
        prisma.project.count(),
        prisma.project.count({ where: { status: "COMPLETED" } }),
      ]);

    // Total hours
    const timeEntries = await prisma.timeEntry.findMany({
      select: { hours: true },
    });
    const totalHours = timeEntries.reduce((sum, entry) => sum + entry.hours, 0);

    // Accuracy calculation
    const completedTasksWithEstimates = await prisma.task.findMany({
      where: {
        status: "COMPLETED",
        estimatedHours: { not: null },
        actualHours: { gt: 0 },
      },
      select: {
        estimatedHours: true,
        actualHours: true,
      },
    });

    let accuracyScore = 0;
    if (completedTasksWithEstimates.length > 0) {
      const accuracyScores = completedTasksWithEstimates.map((task) => {
        const estimated = task.estimatedHours!;
        const actual = task.actualHours;
        const difference = Math.abs(estimated - actual);
        const accuracy = Math.max(
          0,
          1 - difference / Math.max(estimated, actual),
        );
        return accuracy;
      });
      accuracyScore =
        accuracyScores.reduce((sum, score) => sum + score, 0) /
        accuracyScores.length;
    }

    // Daily stats for the last 30 days
    const dailyStats = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const startOfDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
      );
      const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000 - 1);

      const [tasksCompleted, hoursWorked] = await Promise.all([
        prisma.task.count({
          where: {
            status: "COMPLETED",
            completedAt: {
              gte: startOfDay,
              lte: endOfDay,
            },
          },
        }),
        prisma.timeEntry.aggregate({
          where: {
            date: {
              gte: startOfDay,
              lte: endOfDay,
            },
          },
          _sum: {
            hours: true,
          },
        }),
      ]);

      dailyStats.push({
        date: startOfDay.toISOString().split("T")[0],
        tasksCompleted,
        hoursWorked: hoursWorked._sum.hours || 0,
      });
    }

    // Weekly stats (last 12 weeks)
    const weeklyStats = [];
    for (let i = 11; i >= 0; i--) {
      const weekStart = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // Start of week
      const weekEnd = new Date(
        weekStart.getTime() + 7 * 24 * 60 * 60 * 1000 - 1,
      );

      const [tasksCompleted, hoursWorked] = await Promise.all([
        prisma.task.count({
          where: {
            status: "COMPLETED",
            completedAt: {
              gte: weekStart,
              lte: weekEnd,
            },
          },
        }),
        prisma.timeEntry.aggregate({
          where: {
            date: {
              gte: weekStart,
              lte: weekEnd,
            },
          },
          _sum: {
            hours: true,
          },
        }),
      ]);

      weeklyStats.push({
        week: `Week of ${weekStart.toISOString().split("T")[0]}`,
        tasksCompleted,
        hoursWorked: hoursWorked._sum.hours || 0,
      });
    }

    // Monthly stats (last 12 months)
    const monthlyStats = [];
    for (let i = 11; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(
        monthStart.getFullYear(),
        monthStart.getMonth() + 1,
        0,
        23,
        59,
        59,
      );

      const [tasksCompleted, hoursWorked] = await Promise.all([
        prisma.task.count({
          where: {
            status: "COMPLETED",
            completedAt: {
              gte: monthStart,
              lte: monthEnd,
            },
          },
        }),
        prisma.timeEntry.aggregate({
          where: {
            date: {
              gte: monthStart,
              lte: monthEnd,
            },
          },
          _sum: {
            hours: true,
          },
        }),
      ]);

      monthlyStats.push({
        month: monthStart.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        }),
        tasksCompleted,
        hoursWorked: hoursWorked._sum.hours || 0,
      });
    }

    const analyticsData = {
      totalTasks,
      completedTasks,
      totalProjects,
      completedProjects,
      totalHours,
      accuracyScore: Math.round(accuracyScore * 100),
      dailyStats,
      weeklyStats,
      monthlyStats,
    };

    return NextResponse.json(analyticsData);
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 },
    );
  }
}

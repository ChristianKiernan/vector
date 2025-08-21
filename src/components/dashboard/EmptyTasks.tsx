export function EmptyTasks({
  filter,
}: {
  filter: "all" | "today" | "week" | "month";
}) {
  const heading =
    filter === "all"
      ? "No tasks"
      : filter === "today"
        ? "No tasks for today"
        : filter === "week"
          ? "No tasks this week"
          : "No tasks this month";

  const subtitle =
    filter === "all"
      ? "Get started by creating a new task."
      : "Nice and clear — add a task to get rolling.";

  return (
    <div className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50 shadow-xl backdrop-blur-sm">
      <div className="border-b border-gray-800 px-6 py-4">
        <h2 className="text-lg font-semibold text-white">Tasks</h2>
      </div>
      <div className="px-6 py-12 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-white">{heading}</h3>
        <p className="mt-1 text-sm text-gray-400">{subtitle}</p>
      </div>
    </div>
  );
}

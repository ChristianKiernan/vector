"use client";

export function TaskControls({
  filter,
  setFilter,
  onNewTask,
}: {
  filter: "all" | "today" | "week" | "month";
  setFilter: (f: "all" | "today" | "week" | "month") => void;
  onNewTask: () => void;
}) {
  const options: Array<"all" | "today" | "week" | "month"> = [
    "all",
    "today",
    "week",
    "month",
  ];

  return (
    <div className="mb-6 flex flex-col items-start justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
      <div className="flex space-x-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => setFilter(opt)}
            className={`rounded-lg px-4 py-2 font-medium transition-colors ${
              filter === opt
                ? "bg-blue-600 text-white"
                : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </button>
        ))}
      </div>

      <button
        onClick={onNewTask}
        className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
      >
        <svg
          className="mr-2 h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        New Task
      </button>
    </div>
  );
}

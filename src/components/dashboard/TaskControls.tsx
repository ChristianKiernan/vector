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
      {/* Filter buttons with modern dark styling */}
      <div className="relative flex space-x-1 rounded-2xl border border-gray-700/50 bg-gray-900/50 p-1 backdrop-blur-xl">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => setFilter(opt)}
            className={`group relative rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 ${
              filter === opt
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md shadow-blue-500/15"
                : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
            }`}
          >
            {/* Active state background glow */}
            {filter === opt && (
              <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-blue-400/10 to-blue-600/10 blur-sm" />
            )}

            {/* Hover state background */}
            {filter !== opt && (
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-700/20 to-gray-600/20 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            )}

            <span className="relative z-10">
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </span>
          </button>
        ))}
      </div>

      {/* New Task button with enhanced styling */}
      <button
        onClick={onNewTask}
        className="group relative flex items-center overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/15 transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 active:scale-95"
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-blue-300/10 to-blue-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Shine effect on hover */}
        <div className="absolute inset-0 translate-x-[-100%] -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-[200%]" />

        <svg
          className="relative z-10 mr-2.5 h-5 w-5 transition-transform duration-200 group-hover:rotate-90"
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
        <span className="relative z-10">New Task</span>
      </button>
    </div>
  );
}
"use client";

export function ProjectsHeader({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="mb-2 text-3xl font-bold text-white">Projects</h1>
        <p className="text-gray-400">
          Organize your tasks into projects and track progress
        </p>
      </div>
      <button
        onClick={onCreate}
        className="flex items-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
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
        New Project
      </button>
    </div>
  );
}

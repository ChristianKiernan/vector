export function ProjectsEmpty() {
  return (
    <div className="py-12 text-center">
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
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
      <h3 className="mt-2 text-sm font-medium text-white">No projects</h3>
      <p className="mt-1 text-sm text-gray-400">
        Get started by creating your first project.
      </p>
    </div>
  );
}

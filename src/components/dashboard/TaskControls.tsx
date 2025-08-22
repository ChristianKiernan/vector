import { Button, ButtonGroup } from "../Button";
import { Plus, Filter as FilterIcon } from "lucide-react";
import { TaskFilter } from "@/types";

export type TaskControlsProps = {
  filter: TaskFilter;
  setFilter: (f: TaskFilter) => void;
  onNewTask: () => void;
  showActiveOnly: boolean;
  setShowActiveOnly: (active: boolean) => void;
};

const FILTER_OPTIONS: readonly TaskFilter[] = [
  "all",
  "today",
  "week",
  "month",
] as const;

export function TaskControls({
  filter,
  setFilter,
  onNewTask,
  showActiveOnly,
  setShowActiveOnly,
}: TaskControlsProps) {
  return (
    <div className="mb-6 flex flex-col items-start justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
      <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
        {/* Time filter using ButtonGroup */}
        <ButtonGroup className="rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm">
          {FILTER_OPTIONS.map((opt) => {
            const isActive = filter === opt;
            return (
              <Button
                key={opt}
                type="button"
                size="md"
                variant={isActive ? "primary" : "secondary"}
                aria-pressed={isActive}
                onClick={() => setFilter(opt)}
              >
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </Button>
            );
          })}
        </ButtonGroup>

        {/* Active Tasks Toggle */}
        <Button
          variant={showActiveOnly ? "primary" : "secondary"}
          onClick={() => setShowActiveOnly(!showActiveOnly)}
        >
          <FilterIcon className="h-4 w-4" />
          Active Only
        </Button>
      </div>

      {/* New Task */}
      <Button onClick={onNewTask} variant="primary">
        <Plus className="h-4 w-4" />
        New Task
      </Button>
    </div>
  );
}

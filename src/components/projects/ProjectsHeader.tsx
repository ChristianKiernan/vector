"use client";

import { Button } from "../Button";
import { Plus } from "lucide-react";

export function ProjectsHeader({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="mb-2 text-3xl font-bold text-white">Projects</h1>
        <p className="text-gray-400">
          Organize your tasks into projects and track progress
        </p>
      </div>
      <Button onClick={onCreate} variant="primary">
        <Plus className="h-4 w-4" />
        New Project
      </Button>
    </div>
  );
}

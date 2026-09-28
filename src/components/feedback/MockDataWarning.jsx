import { AlertTriangle } from "lucide-react";

export default function MockDataWarning() {
  return (
    <div className="mb-6 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
      <div className="flex items-start gap-3">
        <AlertTriangle
          className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5"
          size={20}
        />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-200 mb-1">
            Using Mock Data
          </h3>
          <p className="text-sm text-amber-800 dark:text-amber-300">
            API is unavailable or not authenticated. Displaying local mock data.
            Changes will not be saved to the database.
          </p>
        </div>
      </div>
    </div>
  );
}

import { Calendar } from "lucide-react";
import { useState } from "react";

export default function DashboardHeader() {
  const [showCalendar, setShowCalendar] = useState(false);
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-center md:text-left">
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary-black dark:text-primary-white">
            Dashboard Overview
          </h1>
          <p className="text-sm text-primary-black/60 dark:text-primary-white/60 mt-1">
            {currentDate}
          </p>
        </div>

        {/* Date Range Selector */}
        <div className="flex items-center justify-center md:justify-end gap-2 relative">
          <select className="px-4 py-2 rounded-lg border border-primary-black/10 dark:border-primary-white/10 bg-primary-white dark:bg-primary-dark-card text-primary-black dark:text-primary-white text-sm font-medium transition-colors hover:border-primary-orange/50 focus:outline-none focus:border-primary-orange">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last year</option>
            <option>All time</option>
          </select>
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="p-2 rounded-lg border border-primary-black/10 dark:border-primary-white/10 bg-primary-white dark:bg-primary-dark-card text-primary-black dark:text-primary-white hover:border-primary-orange/50 transition-colors"
            aria-label="Open calendar"
          >
            <Calendar size={20} strokeWidth={1.5} className="text-primary-black dark:text-primary-white" />
          </button>

          {showCalendar && (
            <div className="absolute top-full right-0 mt-2 z-50 bg-primary-white dark:bg-primary-dark-card rounded-xl border border-primary-black/10 dark:border-primary-white/10 shadow-2xl p-4 w-72">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-primary-black dark:text-primary-white text-sm">Date Picker</h4>
                <button
                  onClick={() => setShowCalendar(false)}
                  className="text-xs text-primary-black/50 dark:text-primary-white/50 hover:text-primary-orange"
                >
                  Close
                </button>
              </div>
              <input
                type="date"
                className="w-full px-3 py-2 rounded-lg border border-primary-black/10 dark:border-primary-white/10 bg-primary-black/5 dark:bg-primary-white/5 text-primary-black dark:text-primary-white text-sm focus:outline-none focus:border-primary-orange"
                defaultValue={new Date().toISOString().split('T')[0]}
                onChange={(e) => {
                  setShowCalendar(false);
                }}
              />
              <p className="text-xs text-primary-black/40 dark:text-primary-white/40 mt-2">
                Select a date to filter data
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

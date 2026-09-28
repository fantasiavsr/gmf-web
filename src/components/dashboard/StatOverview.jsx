import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { MockDashboardStats } from "../../data/exampleData";

export default function StatOverview() {
  const stats = MockDashboardStats;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-primary-white dark:bg-primary-dark-card rounded-lg border border-primary-black/10 dark:border-primary-white/10 p-6 hover:border-primary-orange/50 transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <p className="text-sm font-medium text-primary-black/60 dark:text-primary-white/60">
              {stat.label}
            </p>
            <div className={`p-2 rounded-lg ${stat.color} bg-opacity-10`}>
              {stat.trend === "up" && (
                <TrendingUp size={16} className="text-white" />
              )}
              {stat.trend === "down" && (
                <TrendingDown size={16} className="text-white" />
              )}
              {stat.trend === "neutral" && (
                <Minus size={16} className="text-white" />
              )}
            </div>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-bold text-primary-black dark:text-primary-white">
              {stat.value}
            </p>
            <p
              className={`text-sm font-medium ${
                stat.trend === "up"
                  ? "text-primary-orange-strong"
                  : stat.trend === "down"
                  ? "text-primary-orange-strong"
                  : "text-primary-black/40 dark:text-primary-white/40"
              }`}
            >
              {stat.change}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

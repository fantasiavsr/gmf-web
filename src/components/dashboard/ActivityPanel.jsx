import {
  Clock,
  User,
  Package,
  CreditCard,
  Settings,
  AlertCircle,
} from "lucide-react";
import { MockDashboardActivities } from "../../data/exampleData";

const iconMap = {
  CreditCard,
  Package,
  Settings,
  User,
  AlertCircle,
};

export default function ActivityPanel() {
  const activities = MockDashboardActivities.map((activity) => ({
    ...activity,
    icon: iconMap[activity.icon],
  }));
  return (
    <div className="bg-primary-white dark:bg-primary-dark-card rounded-lg border border-primary-black/10 dark:border-primary-white/10 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-primary-black dark:text-primary-white">
          Recent Activity
        </h3>
        <button className="text-sm font-medium text-primary-orange-strong hover:text-primary-orange transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, idx) => {
          const IconComponent = activity.icon;
          return (
            <div
              key={idx}
              className="flex items-start gap-4 pb-4 border-b border-primary-black/10 dark:border-primary-white/10 last:border-b-0 last:pb-0 hover:bg-primary-black/5 dark:hover:bg-primary-white/5 -mx-2 px-2 py-2 rounded-lg transition-colors"
            >
              <div className={`p-2 rounded-lg ${activity.color} shrink-0`}>
                <IconComponent size={16} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-primary-black dark:text-primary-white">
                  {activity.user}
                </p>
                <p className="text-sm text-primary-black/60 dark:text-primary-white/60">
                  {activity.action}
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs text-primary-black/40 dark:text-primary-white/40 shrink-0">
                <Clock size={12} />
                <span>{activity.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

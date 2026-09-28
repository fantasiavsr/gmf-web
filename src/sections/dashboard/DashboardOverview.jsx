import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatOverview from "../../components/dashboard/StatOverview";
import AnalyticsChart from "../../components/dashboard/AnalyticsChart";
import PerformanceChart from "../../components/dashboard/PerformanceChart";
import ActivityPanel from "../../components/dashboard/ActivityPanel";
import PerformanceTable from "../../components/dashboard/PerformanceTable";
import Dashboard3DVisualization from "../../components/dashboard/Dashboard3DVisualization";

export default function DashboardOverview() {
  return (
    <div>
      {/* Header with date range selector */}
      <DashboardHeader />

      {/* KPI Stats Overview */}
      <StatOverview />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Main Analytics Chart - Takes 2 columns on large screens */}
        <div className="lg:col-span-2">
          <AnalyticsChart />
        </div>

        {/* Activity Panel - 1 column */}
        <div className="lg:col-span-1">
          <ActivityPanel />
        </div>
      </div>

      {/* Performance Metrics */}
      <PerformanceChart />

      {/* 3D Visualization */}
      <Dashboard3DVisualization />

      {/* Performance Table */}
      <PerformanceTable />
    </div>
  );
}

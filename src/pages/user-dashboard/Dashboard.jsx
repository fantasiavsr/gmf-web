import DashboardLayout from "../../layouts/UserDashboardLayout";
import DashboardOverview from "../../sections/dashboard/DashboardOverview";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardOverview />
    </DashboardLayout>
  );
}

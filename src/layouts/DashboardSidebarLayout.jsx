import { useLocation, Link } from "react-router-dom";
import {
  LayoutGrid,
  Users,
  Package,
  Zap,
  DollarSign,
  Settings,
  LogOut,
} from "lucide-react";
import Navbar from "../components/Navbar";
import * as data from "../data/exampleData";

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutGrid, path: "/dashboard2" },
  {
    id: "profiles",
    label: "Profiles",
    icon: Users,
    path: "/dashboard2/profiles",
  },
  {
    id: "products",
    label: "Products",
    icon: Package,
    path: "/dashboard2/products",
  },
  {
    id: "services",
    label: "Services",
    icon: Zap,
    path: "/dashboard2/services",
  },
  {
    id: "pricing",
    label: "Pricing",
    icon: DollarSign,
    path: "/dashboard2/pricing",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    path: "/dashboard2/settings",
  },
];

export default function DashboardSidebarLayout({ children }) {
  const location = useLocation();

  return (
    <main className="min-h-screen bg-primary-white dark:bg-primary-dark-bg text-primary-black dark:text-primary-white font-sans transition-colors">
      <Navbar title="Dashboard 2" links={data.NavLinks} />

      <div className="flex pt-18">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 hidden md:flex md:flex-col bg-primary-black/2 dark:bg-primary-white/6 border-r border-primary-black/10 dark:border-primary-white/10 fixed left-0 top-18 h-[calc(100vh-72px)] overflow-y-auto z-30">
          <div className="flex-1 p-6 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-primary-orange text-primary-white font-medium"
                      : "text-primary-black/70 dark:text-primary-white/70 hover:bg-primary-black/5 dark:hover:bg-primary-white/5 hover:text-primary-black dark:hover:text-primary-white"
                  }`}
                >
                  <IconComponent size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Logout at bottom */}
          <div className="p-4 border-t border-primary-black/10 dark:border-primary-white/10">
            <Link
              to="/login"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-primary-black/70 dark:text-primary-white/70 hover:bg-primary-black/5 dark:hover:bg-primary-white/5 transition-all duration-200"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <section className="flex-1 ml-0 md:ml-64 p-6 md:p-8 lg:p-10">
          {children}
        </section>
      </div>
    </main>
  );
}

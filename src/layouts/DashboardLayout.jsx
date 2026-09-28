import { useLocation, Link } from "react-router-dom";
import {
  LayoutGrid,
  Users,
  Package,
  Zap,
  DollarSign,
  Settings,
} from "lucide-react";
import Navbar from "../components/Navbar";
import * as data from "../data/exampleData";

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutGrid, path: "/dashboard" },
  {
    id: "profiles",
    label: "Profiles",
    icon: Users,
    path: "/dashboard/profiles",
  },
  {
    id: "products",
    label: "Products",
    icon: Package,
    path: "/dashboard/products",
  },
  { id: "services", label: "Services", icon: Zap, path: "/dashboard/services" },
  {
    id: "pricing",
    label: "Pricing",
    icon: DollarSign,
    path: "/dashboard/pricing",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    path: "/dashboard/settings",
  },
];

export default function DashboardLayout({ children }) {
  const location = useLocation();

  return (
    <main className="min-h-screen bg-primary-white dark:bg-primary-dark-bg text-primary-black dark:text-primary-white font-sans transition-colors">
      <Navbar title="Dashboard" links={data.NavLinks} />

      {/* Top Bar Navigation */}
      <div className="fixed top-18 md:top-15 lg:top-18 left-0 right-0 z-40 bg-primary-white/95 dark:bg-primary-dark-bg/95 border-b border-primary-black/10 dark:border-primary-white/10">
        <div className="px-4 md:px-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-row gap-1">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`flex items-center justify-center md:justify-start gap-2 px-3 md:px-4 py-3 border-b-2 md:border-b-2 transition-all whitespace-nowrap ${
                    isActive
                      ? "border-primary-orange text-primary-orange font-medium"
                      : "border-transparent text-primary-black/80 dark:text-primary-white/80 hover:text-primary-black dark:hover:text-primary-white"
                  }`}
                >
                  <IconComponent size={18} />
                  <span className="text-xs sm:text-sm md:text-base">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="pt-60 sm:pt-48 md:pt-38 px-4 md:px-16 pb-12 max-w-7xl mx-auto">
        {children}
      </section>
    </main>
  );
}

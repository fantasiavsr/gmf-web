import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import DashboardProductList from "../../components/product/DashboardProductList";
import EntityFormModal from "../../components/data-management/EntityFormModal";
import { serviceEntitySchema } from "../../components/data-management/entitySchemas";
import { serviceDataSource } from "../../services/data";
import useEntityCrud from "../../hooks/useEntityCrud";
import MockDataWarning from "../../components/feedback/MockDataWarning";

export default function DashboardServicesContent() {
  const {
    items: services, loading, error, mutationError, isSaving, isCreateOpen, usingMockData,
    setIsCreateOpen, setMutationError, create, save, remove, reload,
  } = useEntityCrud(serviceDataSource, "Service");
  const [searchTerm, setSearchTerm] = useState("");
  const [billingPeriod, setBillingPeriod] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesBilling = billingPeriod
      ? service.billingPeriod === billingPeriod
      : true;
    return matchesSearch && matchesBilling;
  });

  const sortedServices = useMemo(() => {
    if (sortBy === "price") {
      return [...filteredServices].sort((a, b) =>
        a.price.localeCompare(b.price, undefined, { numeric: true }),
      );
    }
    if (sortBy === "members") {
      return [...filteredServices].sort((a, b) => b.members - a.members);
    }
    return [...filteredServices].sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredServices, sortBy]);

  const clearSearch = (value) => {
    setSearchTerm(value);
    setBillingPeriod("");
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen text-primary-black dark:text-primary-white font-sans transition-colors flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-orange mx-auto mb-4"></div>
          <p className="text-primary-black/60 dark:text-primary-white/60">
            Loading services...
          </p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen text-primary-black dark:text-primary-white font-sans transition-colors flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">Error: {error}</p>
          <button onClick={reload} className="px-4 py-2 bg-primary-orange text-white rounded-lg hover:bg-primary-orange-strong transition-colors">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-primary-black dark:text-primary-white font-sans transition-colors">
      {usingMockData && <MockDataWarning />}

      <div className="pt-0 pb-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary-black dark:text-primary-white">
              Services
            </h2>
            <p className="text-sm text-primary-black/60 dark:text-primary-white/60 mt-2">
              Manage services, delivery details, and offerings
            </p>
          </div>
          <div className="flex items-center gap-3"><span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-orange/10 dark:bg-primary-orange/20 text-primary-orange-strong text-xs font-medium tracking-wide w-fit">{sortedServices.length} items</span><button onClick={() => setIsCreateOpen(true)} disabled={isSaving} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-orange text-white text-sm disabled:opacity-50"><Plus size={16} /> Add Service</button></div>
        </div>
      </div>

      <div className="sticky top-0 z-30 backdrop-blur-sm border-b border-primary-black/10 dark:border-primary-white/10">
        <div className="px-0 py-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
          <div className="relative flex-1 max-w-xl">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-black/40 dark:text-primary-white/40"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => clearSearch(event.target.value)}
              placeholder="Search by name..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-primary-black/10 dark:border-primary-white/10 bg-primary-white dark:bg-primary-dark-card text-sm focus:outline-none focus:border-primary-orange focus:ring-1 focus:ring-primary-orange/20 transition-all"
            />
          </div>

          <select
            value={billingPeriod}
            onChange={(event) => {
              setBillingPeriod(event.target.value);
              setSearchTerm("");
            }}
            className="px-3 py-2.5 rounded-xl border border-primary-black/10 dark:border-primary-white/10 bg-primary-white dark:bg-primary-dark-card text-sm focus:outline-none focus:border-primary-orange transition-all"
          >
            <option value="">All Billing Periods</option>
            {serviceEntitySchema.fields
              .find((field) => field.key === "billingPeriod")
              .options.map((period) => (
                <option key={period}>{period}</option>
              ))}
          </select>

          <div className="flex items-center gap-2">
            <span className="text-xs text-primary-black/40 dark:text-primary-white/40 uppercase tracking-widest hidden sm:inline">
              Sort
            </span>
            {[
              { key: "name", label: "Name" },
              { key: "price", label: "Price" },
              { key: "members", label: "Members" },
            ].map((option) => (
              <button
                key={option.key}
                onClick={() => setSortBy(option.key)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${sortBy === option.key ? "bg-primary-orange text-white shadow-md shadow-primary-orange/20" : "bg-primary-white/60 dark:bg-primary-dark-card/60 text-primary-black/70 dark:text-primary-white/70 hover:bg-primary-black/5 dark:hover:bg-primary-white/5"}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {mutationError && <div className="mb-4 p-3 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300">{mutationError}<button onClick={() => setMutationError(null)} className="ml-3 underline">Dismiss</button></div>}
      <main className="px-0 md:px-4 lg:px-4 py-2"><DashboardProductList products={sortedServices} schema={serviceEntitySchema} onSave={save} onDelete={remove} /></main>
      {isCreateOpen && <EntityFormModal schema={serviceEntitySchema} onClose={() => setIsCreateOpen(false)} onSubmit={create} />}
    </div>
  );
}

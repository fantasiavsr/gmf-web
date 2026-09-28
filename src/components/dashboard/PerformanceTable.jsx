import { ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";
import { MockTopProducts } from "../../data/exampleData";

export default function PerformanceTable() {
  const products = MockTopProducts;
  return (
    <div className="bg-primary-white dark:bg-primary-dark-card rounded-lg border border-primary-black/10 dark:border-primary-white/10 overflow-hidden mb-8">
      <div className="p-6 border-b border-primary-black/10 dark:border-primary-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-primary-black dark:text-primary-white">
              Top Products & Services
            </h3>
            <p className="text-sm text-primary-black/60 dark:text-primary-white/60 mt-1">
              Best performing items this month
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary-black/10 dark:border-primary-white/10 text-sm font-medium text-primary-black dark:text-primary-white hover:border-primary-orange/50 transition-colors">
            <TrendingUp size={18} strokeWidth={1.5} />
            View Report
          </button>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-primary-black/5 dark:bg-primary-white/5">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-black/60 dark:text-primary-white/60 uppercase tracking-wider">
                Product/Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-primary-black/60 dark:text-primary-white/60 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-primary-black/60 dark:text-primary-white/60 uppercase tracking-wider">
                Revenue
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-primary-black/60 dark:text-primary-white/60 uppercase tracking-wider">
                Orders
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-primary-black/60 dark:text-primary-white/60 uppercase tracking-wider">
                Growth
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary-black/10 dark:divide-primary-white/10">
            {products.map((product, idx) => (
              <tr
                key={idx}
                className="hover:bg-primary-black/5 dark:hover:bg-primary-white/5 transition-colors"
              >
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-primary-black dark:text-primary-white">
                    {product.name}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-primary-black/10 dark:bg-primary-white/10 text-primary-black dark:text-primary-white">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <p className="text-sm font-bold text-primary-black dark:text-primary-white">
                    {product.revenue}
                  </p>
                </td>
                <td className="px-6 py-4 text-right">
                  <p className="text-sm text-primary-black/60 dark:text-primary-white/60">
                    {product.orders}
                  </p>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    {product.trend === "up" ? (
                      <ArrowUpRight
                        size={14}
                        className="text-primary-orange-strong"
                      />
                    ) : (
                      <ArrowDownRight
                        size={14}
                        className="text-primary-orange-strong"
                      />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        product.trend === "up"
                          ? "text-primary-orange-strong"
                          : "text-primary-orange-strong"
                      }`}
                    >
                      {product.growth}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-primary-black/10 dark:divide-primary-white/10">
        {products.map((product, idx) => (
          <div key={idx} className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm font-medium text-primary-black dark:text-primary-white">
                  {product.name}
                </p>
                <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-primary-black/10 dark:bg-primary-white/10 text-primary-black dark:text-primary-white mt-1">
                  {product.category}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {product.trend === "up" ? (
                  <ArrowUpRight size={14} className="text-white" />
                ) : (
                  <ArrowDownRight size={14} className="text-white" />
                )}
                <span className="text-sm font-medium text-primary-orange-strong">
                  {product.growth}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div>
                <p className="text-xs text-primary-black/60 dark:text-primary-white/60">
                  Revenue
                </p>
                <p className="text-sm font-bold text-primary-black dark:text-primary-white">
                  {product.revenue}
                </p>
              </div>
              <div>
                <p className="text-xs text-primary-black/60 dark:text-primary-white/60">
                  Orders
                </p>
                <p className="text-sm font-bold text-primary-black dark:text-primary-white">
                  {product.orders}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import OrderTable from "@/components/ui/OrderTable";
import PendingOrder from "@/components/ui/PendingOrder";
import TableSkeleton from "@/components/ui/skeleton/TableSkeleton";
import { 
    usePendingOrdersQuery,
    useUnshippedOrdersQuery,
    useShippedOrdersQuery,
    useCancelOrdersQuery,
    useDeliveredOrdersQuery
} from "@/redux/features/order/orderApi";
import { TOrder } from "@/types/order";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const OrderManagement = () => {
    const [activeTab, setActiveTab] = useState<
        "PENDING" | "UNSHIPPED" | "SHIPPED" | "CANCELLED" | "DELIVERED"
    >("UNSHIPPED");
    
    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    const { data: pendingOrders, isLoading: pendingLoading } = usePendingOrdersQuery({page, limit});
    const { data: unshippedOrders, isLoading: unshippedLoading } = useUnshippedOrdersQuery({page, limit});
    const { data: shippedOrders, isLoading: shippedLoading } = useShippedOrdersQuery({ page, limit });
    const { data: cancelOrders, isLoading: cancelLoading } = useCancelOrdersQuery({ page, limit });
    const { data: deliveredOrders, isLoading: deliveredLoading } = useDeliveredOrdersQuery({ page, limit });

     const getActiveData = () => {
    switch (activeTab) {
      case "PENDING":
        return {
          orders: pendingOrders?.data ?? [],
          total: pendingOrders?.meta?.total ?? 0,
          loading: pendingLoading,
        };
      case "UNSHIPPED":
        return {
          orders: unshippedOrders?.data ?? [],
          total: unshippedOrders?.meta?.total ?? 0,
          loading: unshippedLoading,
        };
      case "SHIPPED":
        return {
          orders: shippedOrders?.data ?? [],
          total: shippedOrders?.meta?.total ?? 0,
          loading: shippedLoading,
        };
      case "CANCELLED":
        return {
          orders: cancelOrders?.data ?? [],
          total: cancelOrders?.meta?.total ?? 0,
          loading: cancelLoading,
        };
      case "DELIVERED":
        return {
          orders: deliveredOrders?.data ?? [],
          total: deliveredOrders?.meta?.total ?? 0,
          loading: deliveredLoading,
        };
      default:
        return { orders: [], total: 0, loading: false };
    }
  };

    const { orders: paginatedOrders, total: activeTotal, loading: isLoading } = getActiveData();
    const totalPages = Math.ceil(activeTotal / limit);

    const handleTabChange = (tab: typeof activeTab) => {
        setActiveTab(tab);
        setPage(1);
    };

    const getTabCount = (tab: string) => {
        switch (tab) {
            case "PENDING": return pendingOrders?.meta?.total || 0;
            case "UNSHIPPED": return unshippedOrders?.meta?.total || 0;
            case "SHIPPED": return shippedOrders?.meta?.total || 0;
            case "CANCELLED": return cancelOrders?.meta?.total || 0;
            case "DELIVERED": return deliveredOrders?.meta?.total || 0;
            default: return 0;
        }
    };

    const totalActiveUnits = 
        (pendingOrders?.meta?.total || 0) + 
        (unshippedOrders?.meta?.total || 0) + 
        (shippedOrders?.meta?.total || 0);

    const getTabActiveStyles = (tab: typeof activeTab) => {
        if (activeTab !== tab) return "text-gray-500 hover:text-white bg-transparent";
        switch (tab) {
            case "PENDING": return "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]";
            case "UNSHIPPED": return "bg-yellow-600 text-white shadow-[0_0_20px_rgba(202,138,4,0.3)]";
            case "CANCELLED": return "bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]";
            case "SHIPPED": return "bg-success text-black shadow-[0_0_20px_rgba(34,197,94,0.3)] font-black";
            case "DELIVERED": return "bg-purple-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.3)]";
            default: return "";
        }
    };

    return (
    <div className="p-4 md:p-8 space-y-8 lg:max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-[#0a0a0a]/60 backdrop-blur-3xl p-6 md:p-8 rounded-3xl border border-success/20 relative overflow-hidden group hover:border-blue-500/40 hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-tr from-success/8 via-success/3 to-transparent transition-opacity duration-700 group-hover:opacity-0 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-success/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-blue-500/10 transition-colors duration-700"></div>
          
          <div className="space-y-1 relative z-10">
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter italic leading-none">Logistics <span className="text-success group-hover:text-blue-400 transition-colors duration-500">Command.</span></h2>
              <div className="flex items-center gap-3">
                  <span className="text-gray-500 font-bold text-[10px] tracking-[0.2em] uppercase italic">Real-time Order Control</span>
                  <div className="h-px w-8 bg-success/20 group-hover:bg-blue-500/20 transition-colors duration-500"></div>
                  <span className="bg-success/10 text-success border border-success/20 group-hover:bg-blue-500/10 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-colors duration-500 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider italic">
                      {totalActiveUnits} ACTIVE UNITS
                  </span>
              </div>
          </div>

          <div className="flex flex-wrap gap-2 relative z-10">
              {(["PENDING", "UNSHIPPED", "SHIPPED", "CANCELLED", "DELIVERED"] as const).map((tab) => (
                  <button
                      key={tab}
                      onClick={() => handleTabChange(tab)}
                      className={`px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all duration-300 border border-white/5 italic ${getTabActiveStyles(tab)}`}
                  >
                      {tab} [{getTabCount(tab)}]
                  </button>
              ))}
          </div>
      </div>

      <div className="bg-[#0a0a0a]/60 backdrop-blur-3xl border border-success/20 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] relative group hover:border-blue-500/40 hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-tr from-success/8 via-success/3 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="overflow-x-auto relative z-10">
              <table className="w-full text-left border-collapse">
                  <thead>
                      <tr className="border-b border-white/5 bg-white/[0.01]">
                          <th className="px-8 py-6 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] italic">Temporal Mapping</th>
                          <th className="px-8 py-6 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] italic">Transaction ID</th>
                          <th className="px-8 py-6 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] italic">Unit Engagement</th>
                          <th className="px-8 py-6 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] italic text-right">Directives</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.02]">
                      {isLoading ? (
                          <TableSkeleton columns={4} rows={limit} />
                      ) : (
                          <AnimatePresence mode="popLayout">
                              {paginatedOrders?.length > 0 ? (
                                  paginatedOrders?.map((order: TOrder, index: number) => (
                                      <motion.tr
                                          key={`${order?._id || 'order'}-${index}`}
                                          initial={{ opacity: 0, scale: 0.98 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          exit={{ opacity: 0, scale: 0.98 }}
                                          transition={{ delay: index * 0.05 }}
                                          className="group/row bg-[#0f0f0f]/30 hover:bg-white/[0.02] transition-colors"
                                      >
                                          {activeTab === "PENDING" ? (
                                              <PendingOrder order={order} />
                                          ) : (
                                              <OrderTable order={order} />
                                          )}
                                      </motion.tr>
                                  ))
                              ) : (
                                  <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                      <td colSpan={4} className="py-20 text-center">
                                          <div className="flex flex-col items-center gap-4 opacity-20">
                                              <div className="w-12 h-12 rounded-2xl border-2 border-dashed border-gray-500"></div>
                                              <p className="text-[10px] uppercase font-black tracking-widest italic">Awaiting Records...</p>
                                          </div>
                                      </td>
                                  </motion.tr>
                              )}
                          </AnimatePresence>
                      )}
                  </tbody>
              </table>

              {/* Pagination */}
              {totalPages > 1 && (
                  <div className="p-8 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
                      <div className="flex items-baseline gap-1.5 pl-4">
                          <span className="text-xl font-black text-white italic tracking-tighter">{page}</span>
                          <span className="text-[8px] font-black text-gray-600 uppercase">OF</span>
                          <span className="text-sm font-black text-gray-500 italic tracking-tighter">{totalPages}</span>
                          <span className="text-[8px] font-black text-gray-700 uppercase ml-2 italic">
                              ({activeTotal} records)
                          </span>
                      </div>

                      <div className="flex items-center gap-3">
                          {/* Page numbers */}
                          <div className="hidden md:flex items-center gap-1">
                              {Array.from({ length: totalPages }, (_, i) => i + 1)
                                  .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                                  .reduce<(number | "...")[]>((acc, p, idx, arr) => {
                                      if (idx > 0 && (p as number) - (arr[idx - 1] as number) > 1) acc.push("...");
                                      acc.push(p);
                                      return acc;
                                  }, [])
                                  .map((p, i) =>
                                      p === "..." ? (
                                          <span key={`ellipsis-${i}`} className="w-8 text-center text-gray-600 text-[9px] font-black">…</span>
                                      ) : (
                                          <button
                                              key={p}
                                              onClick={() => setPage(p as number)}
                                              className={`w-8 h-8 rounded-lg text-[9px] font-black uppercase transition-all duration-300 italic ${
                                                  page === p
                                                      ? "bg-success text-black shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                                                      : "bg-white/[0.02] text-gray-500 hover:text-white hover:bg-white/5 border border-white/5"
                                              }`}
                                          >
                                              {p}
                                          </button>
                                      )
                                  )}
                          </div>

                          <button
                              className="px-6 py-3 bg-white/[0.02] border border-white/5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-success hover:border-success/30 hover:bg-success/5 transition-all disabled:opacity-20 disabled:grayscale italic"
                              disabled={page <= 1}
                              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                          >
                              Previous Cycle
                          </button>
                          <button
                              className="px-6 py-3 bg-success text-black rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-success/10 disabled:opacity-50 disabled:grayscale hover:scale-105 active:scale-95 italic"
                              disabled={page >= totalPages}
                              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                          >
                              Next Horizon
                          </button>
                      </div>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};

export default OrderManagement;


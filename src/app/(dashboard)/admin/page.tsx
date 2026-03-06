"use client";

import { useAdminStatisticsQuery } from "@/redux/features/statistics/statisticsApi";
import { useState } from "react";

import CategoryStates from "./_components/CategoryStats";
import FoodStats from "./_components/FoodStats";
import StatCard from "@/components/ui/StatsCard";
import SummaryStats from "./_components/SummaryStats";
import SalesSummary from "./_components/SalesSummary";
import { motion } from "framer-motion";


const Dashboard = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<{ startDate?: string; endDate?: string }>({});

  const { data: stats } = useAdminStatisticsQuery(dateRange);

  if (!stats?.data) return null;

  const {
    revenueData: revenue,
    categoryWise: categoryData,
    foodWise: foodData,
    dailyRevenue,
    monthlyRevenue,
  } = stats?.data;

  // Filter handlers
  const handleFilterChange = (type: string) => {
    setFilter(type);
    const now = new Date();
    const start = new Date();

    if (type === "daily") {
      start.setHours(0, 0, 0, 0);
    } else if (type === "weekly") {
      start.setDate(now.getDate() - 7);
    } else if (type === "monthly") {
      start.setMonth(now.getMonth() - 1);
    } else if (type === "yearly") {
      start.setFullYear(now.getFullYear() - 1);
    } else {
      setDateRange({});
      return;
    }
    setDateRange({ startDate: start.toISOString(), endDate: now.toISOString() });
  };

  // Filter display data based on search
  const filteredCategoryData = categoryData?.filter((cat: { categoryName: string }) =>
    cat.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredFoodData = foodData?.filter((food: { foodName: string }) =>
    food.foodName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Total Orders and Revenue
  const totalOrders = revenue?.totalOrders || 0;
  const totalRevenue = revenue?.totalRevenue || 0;
  const totalRevenueWithoutTax = revenue?.totalRevenueWithoutTax || 0;
  const totalTax = revenue?.totalTax || 0;

  // Average Orders per Month
  const monthsCount = monthlyRevenue?.length || 1;
  const avgOrdersPerMonth = totalOrders / monthsCount;

  // Growth Goal
  const maxCategoryOrders = categoryData?.length ? Math.max(...categoryData.map((cat: { totalOrders: number }) => cat?.totalOrders)) : 1;
  const growthGoal = Math.min(100, (totalOrders / maxCategoryOrders) * 100);

  // Dashboard Stats Array
  const dashboardStats = [
    {
      title: "Revenue Inc. Tax",
      value: `$${totalRevenue.toFixed(2)}`,
      change: "Live",
      trend: "up" as const,
      color: "#fb923c",
      data: dailyRevenue?.map((day: { totalRevenue: number }) => ({ v: day.totalRevenue })) || [],
    },
    {
      title: "Total Tax",
      value: `$${totalTax.toFixed(2)}`,
      change: "Live",
      trend: "up" as const,
      color: "#ef4444",
      data: dailyRevenue?.map((day: { totalRevenue: number; totalRevenueWithoutTax: number }) => ({ v: day.totalRevenue - day.totalRevenueWithoutTax })) || [],
    },
    {
      title: "Revenue Exc. Tax",
      value: `$${totalRevenueWithoutTax.toFixed(2)}`,
      change: "Live",
      trend: "up" as const,
      color: "#f97316",
      data: dailyRevenue?.map((day: { totalRevenueWithoutTax: number }) => ({ v: day.totalRevenueWithoutTax })) || [],
    },
    {
      title: "Total Orders",
      value: `${totalOrders}`,
      change: "100%",
      trend: "up" as const,
      color: "#a855f7",
      data: dailyRevenue?.map((_: unknown, indx: number) => ({ v: indx + 1 <= totalOrders ? indx + 1 : totalOrders })) || [],
    },
    {
      title: "Avg. Orders/Mo",
      value: `${avgOrdersPerMonth.toFixed(1)}`,
      change: "70%",
      trend: "up" as const,
      color: "#f472b6",
      data: monthlyRevenue?.map((month: { totalRevenue: number }) => ({ v: month.totalRevenue })) || [],
    },
    {
      title: "Growth Goal",
      value: `${growthGoal.toFixed(0)}%`,
      change: "12%",
      trend: "up" as const,
      color: "#60a5fa",
      data: categoryData?.map(() => ({ v: growthGoal })) || [],
    },
  ];

  return (
    <div className="p-4 md:p-8 space-y-10 lg:max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-[#0a0a0a]/60 backdrop-blur-3xl p-6 md:p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-success/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-success/10 transition-colors duration-700"></div>

        <div className="space-y-1 relative z-10">
          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter italic leading-none">
            Command <span className="text-success">Center.</span>
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-gray-500 font-bold text-[10px] tracking-[0.2em] uppercase italic">System Intelligence Overview</span>
            <div className="h-px w-8 bg-success/20"></div>
            <span className="text-gray-400 font-bold text-[9px] uppercase tracking-widest italic opacity-60">
              {filter.toUpperCase()} ANALYTICS STREAM
            </span>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row items-center gap-4 relative z-10 w-full lg:w-auto">
          <div className="relative w-full md:w-64 group/search">
            <input
              type="text"
              placeholder="SEARCH_INFRASTRUCTURE..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-[11px] font-black text-white outline-none focus:border-success/30 transition-all italic placeholder:text-gray-700"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within/search:text-success transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/[0.02] border border-white/10 p-1.5 rounded-2xl w-full md:w-auto">
            {["all", "daily", "weekly", "monthly", "yearly"].map((f) => (
              <button
                key={f}
                onClick={() => handleFilterChange(f)}
                className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all italic ${filter === f ? "bg-success text-black shadow-lg shadow-success/20" : "text-gray-500 hover:text-white"}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6"
      >
        {dashboardStats.map((stats, index) => (
          <StatCard key={index} stats={stats} />
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <CategoryStates category={filteredCategoryData} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <FoodStats foodData={filteredFoodData} />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <SalesSummary />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <SummaryStats />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;

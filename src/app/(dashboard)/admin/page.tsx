"use client";

import { useAdminStatisticsQuery } from "@/redux/features/statistics/statisticsApi";

import CategoryStates from "./_components/CategoryStats";
import FoodStats from "./_components/FoodStats";
import StatCard from "@/components/ui/StatsCard";
import SummaryStats from "./_components/SummaryStats";
import SalesSummary from "./_components/SalesSummary";
import { motion } from "framer-motion";


const Dashboard = () => {

  const { data: stats, isLoading } = useAdminStatisticsQuery({});

  if (!stats?.data) return null; // loading or empty state handling


  const { revenueData: revenue, categoryWise: categoryData, foodWise: foodData, daily: dailyRevenue, weekly: weeklyRevenue, monthly: monthlyRevenue, yearly: yearlyRevenue } = stats.data;

  // Total Orders and Revenue
  const totalOrders = revenue?.totalOrders;
  const totalRevenue = revenue?.totalRevenue;
  const totalRevenueWithoutTax = revenue?.totalRevenueWithoutTax;
  const totalTax = revenue?.totalTax;

  // Average Orders per Month
  const monthsCount = monthlyRevenue?.length || 1;
  const avgOrdersPerMonth = totalOrders / monthsCount;

  // Growth Goal based on max category orders
  const maxCategoryOrders = Math.max(...categoryData?.map((cat: any) => cat?.totalOrders));
  const growthGoal = Math.min(100, (totalOrders / maxCategoryOrders) * 100);

  // Dashboard Stats Array
  const dashboardStats = [
    {
      title: "Revenue Inc. Tax",
      value: `$${totalRevenue.toFixed(2)}`,
      change: "Stable",
      trend: "up" as const,
      color: "#fb923c",
      data: stats.data.dailyRevenue?.map((day: any) => ({ v: day.totalRevenue })) || [],
    },
    {
      title: "Total Tax",
      value: `$${totalTax.toFixed(2)}`,
      change: "Stable",
      trend: "up" as const,
      color: "#ef4444",
      data: stats.data.dailyRevenue?.map((day: any) => ({ v: day.totalRevenue - day.totalRevenueWithoutTax })) || [],
    },
    {
      title: "Revenue Exc. Tax",
      value: `$${totalRevenueWithoutTax.toFixed(2)}`,
      change: "Stable",
      trend: "up" as const,
      color: "#f97316",
      data: stats.data.dailyRevenue?.map((day: any) => ({ v: day.totalRevenueWithoutTax })) || [],
    },
    {
      title: "Total Orders",
      value: `${totalOrders}`,
      change: "100%",
      trend: "up" as const,
      color: "#a855f7",
      data: stats.data.dailyRevenue.map((_: any, indx: any) => ({ v: indx + 1 <= totalOrders ? indx + 1 : totalOrders })) || [],
    },
    {
      title: "Avg. Orders/Mo",
      value: `${avgOrdersPerMonth.toFixed(1)}`,
      change: "70%",
      trend: "up" as const,
      color: "#f472b6",
      data: monthlyRevenue?.map((month: any) => ({ v: month.totalRevenue })) || [],
    },
    {
      title: "Growth Goal",
      value: `${growthGoal.toFixed(0)}%`,
      change: "12%",
      trend: "up" as const,
      color: "#60a5fa",
      data: categoryData.map(() => ({ v: growthGoal })) || [],
    },
  ];

  return (
    <div className="p-4 md:p-8 space-y-10 lg:max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 bg-[#0a0a0a]/60 backdrop-blur-3xl p-6 md:p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-success/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-success/10 transition-colors duration-700"></div>
          
          <div className="space-y-1 relative z-10">
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter italic leading-none">
                Command <span className="text-success">Center.</span>
              </h2>
              <div className="flex items-center gap-3">
                  <span className="text-gray-500 font-bold text-[10px] tracking-[0.2em] uppercase italic">System Intelligence Overview</span>
                  <div className="h-px w-8 bg-success/20"></div>
                  <span className="text-gray-400 font-bold text-[9px] uppercase tracking-widest italic opacity-60">
                      LIVE ANALYTICS STREAM
                  </span>
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
          <CategoryStates category={categoryData} />
        </motion.div>
        <motion.div
           initial={{ opacity: 0, scale: 0.98 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6, delay: 0.2 }}
        >
          <FoodStats foodData={foodData} />
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

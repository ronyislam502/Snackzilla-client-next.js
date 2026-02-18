"use client";

import { useAdminStatisticsQuery } from "@/redux/features/statistics/statisticsApi";

import CategoryStates from "./_components/CategoryStats";
import FoodStats from "./_components/FoodStats";
import StatCard from "@/components/ui/StatsCard";


const Dashboard = () => {

  const { data: stats, isLoading } = useAdminStatisticsQuery({});
  console.log("data", stats);

  if (!stats?.data) return null; // loading or empty state handling


  const { revenueData: revenue, categoryWise: categoryData, foodWise: foodData, daily: dailyRevenue, weekly: weeklyRevenue, monthly: monthlyRevenue, yearly: yearlyRevenue } = stats.data;

  // Total Orders and Revenue
  const totalOrders = revenue.totalOrders;
  const totalRevenue = revenue.totalRevenue;
  const totalRevenueWithoutTax = revenue.totalRevenueWithoutTax;
  const totalTax = revenue.totalTax;

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
    <div>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
        {dashboardStats.map((stats, index) => (
          <StatCard key={index} stats={stats} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Category-wise */}
        <div className="card shadow-xl">
          <div className="card-header">
            <h3 className="text-center text-2xl font-semibold">
              Category-wise
            </h3>
          </div>
          <div className="card-body">
            <CategoryStates category={categoryData} />
          </div>
        </div>

        {/* service-wise  */}
        <div className="card shadow-xl">
          <div className="card-header">
            <h3 className="text-center text-2xl font-bold">Food-wise</h3>
          </div>
          <div className="card-body">
            <FoodStats foodData={foodData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

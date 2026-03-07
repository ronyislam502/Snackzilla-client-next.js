"use client";

import { TUser } from "@/redux/features/auth/authSlice";
import { useUserStatisticsQuery } from "@/redux/features/statistics/statisticsApi";
import { useAppSelector } from "@/redux/hooks";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import StatCard from "@/components/ui/StatsCard";

const COLORS = ["#00ff80", "#00bfff", "#ffcc00", "#ff3333", "#a855f7", "#ec4899"];

const Dashboard = () => {
  const loggedUser = useAppSelector((state) => state?.auth?.user) as TUser;
  console.log("loggedUser", loggedUser)

  const { data: statsData, isLoading } = useUserStatisticsQuery(loggedUser?.email);
  const stats = statsData?.data;
  console.log("data", stats)

  if (isLoading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-success"></span>
      </div>
    );
  }

  const totalOrders = stats?.foodWise?.reduce((acc: number, curr: { totalOrders: number }) => acc + curr.totalOrders, 0) || 0;

  const statCardsData = [
    {
      title: "Total Spend",
      value: `$${stats?.totalSpend?.toFixed(2) || "0.00"}`,
      change: "+12.5%",
      trend: "up",
      data: [{ v: 30 }, { v: 45 }, { v: 35 }, { v: 60 }, { v: 55 }, { v: 80 }],
      color: "#00ff80",
    },
    {
      title: "Total Orders",
      value: totalOrders,
      change: "+5.2%",
      trend: "up",
      data: [{ v: 20 }, { v: 30 }, { v: 25 }, { v: 40 }, { v: 35 }, { v: 50 }],
      color: "#00bfff",
    },
    {
      title: "Refunded",
      value: `$${stats?.totalRefundAmount?.toFixed(2) || "0.00"}`,
      change: "0%",
      trend: "neutral",
      data: [{ v: 10 }, { v: 10 }, { v: 10 }, { v: 10 }, { v: 10 }, { v: 10 }],
      color: "#ff3333",
    },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h2 className="text-3xl font-black text-white tracking-tighter">
            User <span className="text-success italic">Dashboard</span>
          </h2>
          <p className="text-gray-400 mt-1 font-medium italic">Welcome back, {loggedUser?.name}!</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-black text-gray-500 uppercase tracking-widest bg-neutral/20 px-4 py-2 rounded-full border border-white/5">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
          Live Statistics
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCardsData?.map((stat, idx) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <StatCard stats={stat} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
        {/* Category-wise Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-neutral/40 backdrop-blur-md p-6 rounded-3xl border border-success/10"
        >
          <h3 className="text-xl font-black text-white mb-6 uppercase tracking-tighter">Spend by Category</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats?.categoryWise}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="totalSpend"
                  nameKey="categoryName"
                >
                  {stats?.categoryWise?.map((entry: { categoryName: string; totalSpend: number }, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Top Ordered Foods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-neutral/40 backdrop-blur-md p-6 rounded-3xl border border-success/10"
        >
          <h3 className="text-xl font-black text-white mb-6 uppercase tracking-tighter">Top Ordered Foods</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.foodWise?.slice(0, 5)}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="foodName" stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.05)" }}
                  contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Bar dataKey="totalOrders" fill="#00ff80" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;

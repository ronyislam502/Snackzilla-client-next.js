"use client";

import { TUser } from "@/redux/features/auth/authSlice";
import { useUserStatisticsQuery } from "@/redux/features/statistics/statisticsApi";
import { useAppSelector } from "@/redux/hooks";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useSocket } from "@/hooks/useSocket";
import { toast } from "react-toastify";
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
  AreaChart,
  Area,
} from "recharts";
import StatCard from "@/components/ui/StatsCard";
import { useMyOrdersQuery } from "@/redux/features/order/orderApi";

const COLORS = ["#00ff80", "#00bfff", "#ffcc00", "#ff3333", "#a855f7", "#ec4899"];

const Dashboard = () => {
  const loggedUser = useAppSelector((state) => state?.auth?.user) as TUser;
  const socket = useSocket(process.env.NEXT_PUBLIC_SERVER_URL as string || "https://snackzilla-server.onrender.com");

  const { data: statsData, isLoading, refetch: refetchStats } = useUserStatisticsQuery(loggedUser?.email);
  const { data: ordersData, refetch: refetchOrders } = useMyOrdersQuery({ email: loggedUser?.email, limit: 1 });

  useEffect(() => {
    if (!socket.isConnected || !loggedUser?.user) return;

    const handleNewOrder = (data: any) => {
        toast.success(data.message || "Order placed successfully!", {
            position: "top-right",
            autoClose: 5000
        });
        refetchStats();
        refetchOrders();
    };

    const handleOrderUpdate = () => {
        refetchStats();
        refetchOrders();
    };

    socket.on("new-order", handleNewOrder);
    socket.on("order-updated", handleOrderUpdate);

    return () => {
      socket.off("new-order", handleNewOrder);
      socket.off("order-updated", handleOrderUpdate);
    };
  }, [socket.isConnected, loggedUser?.user, refetchStats, refetchOrders]);

  const stats = statsData?.data;
  // const latestOrder = ordersData?.data?.[0];
  // console.log("data", stats)

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
      change: stats?.dailySpend?.[stats.dailySpend.length - 1]?.progress.toFixed(1) + "%" || "0%",
      trend: (stats?.dailySpend?.[stats.dailySpend.length - 1]?.progress || 0) >= 0 ? "up" : "down",
      data: stats?.dailySpend?.map((d: any) => ({ v: d.totalSpend })) || [],
      color: "#00ff80",
    },
    {
      title: "Total Orders",
      value: totalOrders,
      change: "Live",
      trend: "up",
      data: stats?.foodWise?.map((d: any) => ({ v: d.totalOrders })) || [],
      color: "#00bfff",
    },
    {
      title: "Refunded",
      value: `$${stats?.totalRefundAmount?.toFixed(2) || "0.00"}`,
      change: "0%",
      trend: "neutral",
      data: [{ v: 0 }, { v: 0 }],
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

      {/* Tracking Widget */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[#0a0a0a] border border-success/10 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden group hover:border-blue-500/20 transition-all duration-500"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-success/5 rounded-full blur-[80px] -mr-32 -mt-32 group-hover:bg-blue-500/10 transition-colors" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 border border-success/20 text-success text-[10px] font-black uppercase tracking-widest italic">
                    <PackageIcon size={12} />
                    Active Payload Tracking
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter italic">
                    Monitor Your <span className="text-success group-hover:text-blue-400 transition-colors">Shipment.</span>
                </h3>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest italic max-w-md">
                    Instant access to the orbital tracking system. {latestOrder?.trackingId ? `Current payload ID: ${latestOrder.trackingId}` : 'Enter your identification code to synchronize status.'}
                </p>
                {latestOrder?.trackingId && (
                    <div className="flex items-center gap-2 text-[10px] font-black text-white uppercase tracking-widest italic">
                        <span className="w-1.5 h-1.5 rounded-full bg-success animate-ping"></span>
                        Latest Sequence: <span className="text-success">{latestOrder.trackingId}</span>
                        <span className="text-gray-600">({latestOrder.status})</span>
                    </div>
                )}
            </div>
            
            <Link href={latestOrder?.trackingId ? `/user/track?id=${latestOrder.trackingId}` : "/user/track"} className="w-full md:w-auto">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full md:w-auto bg-success text-black px-10 py-4 rounded-2xl font-black uppercase tracking-widest italic text-[11px] shadow-xl shadow-success/20 flex items-center justify-center gap-3 group/btn"
                >
                    <SearchIcon size={16} />
                    Execute Search Protocol
                </motion.button>
            </Link>
        </div>
      </motion.div> */}

      {/* Spend Summary Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-neutral/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-success/10 shadow-2xl"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
                <h3 className="text-xl font-black text-white tracking-tight uppercase italic">Spend <span className="text-success">Summary.</span></h3>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1 italic">Real-time expenditure tracking</p>
            </div>
            <div className="bg-success/10 border border-success/20 px-4 py-2 rounded-2xl">
                <span className="text-[10px] font-black text-success uppercase italic tracking-widest">Active Valuation protocol</span>
            </div>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats?.dailySpend?.map((item: any) => ({
                name: `${item._id.day}/${item._id.month}`,
                value: item.totalSpend
            })) || []}>
              <defs>
                <linearGradient id="userColorSpend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00ff80" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00ff80" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.02)" strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip
                contentStyle={{ backgroundColor: "#0a0a0a", border: "1px solid rgba(0,255,128,0.2)", borderRadius: "16px", color: "#fff" }}
                itemStyle={{ color: "#00ff80" }}
                cursor={{ stroke: '#00ff80', strokeWidth: 1 }}
              />
              <Area type="monotone" dataKey="value" stroke="#00ff80" strokeWidth={3} fillOpacity={1} fill="url(#userColorSpend)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
        {/* Category-wise Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-neutral/40 backdrop-blur-md p-6 rounded-3xl border border-success/10"
        >
          <h3 className="text-xl font-black text-white mb-6 uppercase tracking-tighter italic">Spend by <span className="text-success">Category.</span></h3>
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
                  stroke="none"
                >
                  {stats?.categoryWise?.map((entry: { categoryName: string; totalSpend: number }, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#0a0a0a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 'bold' }} />
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
          <h3 className="text-xl font-black text-white mb-6 uppercase tracking-tighter italic">Top Ordered <span className="text-success">Items.</span></h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[...(stats?.foodWise || [])].sort((a: any, b: any) => b.totalOrders - a.totalOrders).slice(0, 5)}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis dataKey="foodName" stroke="#6b7280" fontSize={9} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={9} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.03)" }}
                  contentStyle={{ backgroundColor: "#0a0a0a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }}
                />
                <Bar dataKey="totalOrders" fill="#00ff80" radius={[6, 6, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;

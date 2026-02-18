"use client";

import { TUser } from "@/redux/features/auth/authSlice";
import { useUserStatisticsQuery } from "@/redux/features/statistics/statisticsApi";
import { useAppSelector } from "@/redux/hooks";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Legend,
// } from "recharts";

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {
  const loggedUser = useAppSelector((state) => state?.auth?.user) as TUser;
  const { data: stats } = useUserStatisticsQuery(loggedUser?.email);

  return (
    <div className="p-6 space-y-8">
      <h1>dashboard</h1>
    </div>
  );
};

export default Dashboard;

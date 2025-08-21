"use client";

import { TUser } from "@/redux/features/auth/authSlice";
import { useUserStatisticsQuery } from "@/redux/features/statistics/statisticsApi";
import { useAppSelector } from "@/redux/hooks";
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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {
  const loggedUser = useAppSelector((state) => state?.auth?.user) as TUser;
  const { data: stats } = useUserStatisticsQuery(loggedUser.email);

  return (
    <div className="p-6 space-y-8">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat rounded-xl shadow">
          <div className="stat-title">Total Spend</div>
          <div className="stat-value">
            ${stats?.data?.totalSpend?.toFixed(2)}
          </div>
        </div>
        <div className="stat bg-base-200 rounded-xl shadow">
          <div className="stat-title">Without Tax</div>
          <div className="stat-value">
            ${stats?.data?.totalSpendWithoutTax?.toFixed(2)}
          </div>
        </div>
        <div className="stat bg-base-200 rounded-xl shadow">
          <div className="stat-title">Total Tax</div>
          <div className="stat-value">${stats?.data?.totalTax?.toFixed(2)}</div>
        </div>
      </div>

      {/* Category Wise Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-base-200 p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Category Wise Spend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats?.data?.categoryWise}
                dataKey="totalSpend"
                nameKey="categoryName"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {stats?.data?.categoryWise?.map(
                  (category: any, index: number) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  )
                )}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Food Wise Bar Chart */}
        <div className="bg-base-200 p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Food Wise Orders</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats?.data?.foodWise}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="foodName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalOrders" fill="#8884d8" />
              <Bar dataKey="totalSpend" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

"use client";

import { useAdminStatisticsQuery } from "@/redux/features/statistics/statisticsApi";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  Legend,
  ResponsiveContainer,
} from "recharts";
import CategoryStates from "./_components/CategoryStats";
import FoodStats from "./_components/FoodStats";

const COLORS = [
  "#2563eb",
  "#f97316",
  "#22c55e",
  "#a855f7",
  "#eab308",
  "#ef4444",
];

const ProgressIndicator = ({ value }: { value: number }) => {
  if (value > 0) {
    return (
      <span className="flex items-center text-green-600 text-xs font-medium">
        {value.toFixed(1)}%
      </span>
    );
  } else if (value < 0) {
    return (
      <span className="flex items-center text-red-600 text-xs font-medium">
        {Math.abs(value).toFixed(1)}%
      </span>
    );
  }
  return <span className="text-gray-400 text-xs">0%</span>;
};

const Dashboard = () => {
  const { data: stats, isLoading } = useAdminStatisticsQuery({});
  console.log("data", stats);

  const revenue = stats?.data?.revenueData;
  const categoryData = stats?.data?.categoryWise;
  console.log(categoryData);

  return (
    <div>
      <h2 className="text-center text-4xl font-bold py-6 text-white">
        Sales Dashboard
      </h2>

      <h2 className="text-2xl font-bold p-2 text-white">
        Revenue:{" "}
        <span className="text-green-500">${revenue?.totalRevenue}</span>
      </h2>
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
        <div className="card shadow-xl bg-black/80">
          <div className="card-header">
            <h3 className="text-center text-2xl font-bold text-white">
              Service-wise
            </h3>
          </div>
          <div className="card-body">
            <FoodStats />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

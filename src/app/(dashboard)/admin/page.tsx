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
  const foodData = stats?.data?.foodWise;

  const revenue2 = [
    {
      title: "Revenue Inc. tax",
      amount: `$${revenue?.totalRevenue}`,
    },
    {
      title: "Total Tax",
      amount: `$${revenue?.totalTax}`,
    },
    {
      title: "Revenue Exc. Tax",
      amount: `$${revenue?.totalRevenueWithoutTax}`,
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
        {revenue2.map((item, index) => (
          <div key={index}>
            <div className="card bg-neutral text-neutral-content">
              <div className="card-body items-center text-center">
                <h2 className="card-title">{item?.title}</h2>
                <p>{item?.amount}</p>
              </div>
            </div>
          </div>
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

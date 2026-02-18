"use client"

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CategoryStats = ({ category }: { category: any[] }) => {
  const formattedData = category?.map((item: any) => ({
    category: item?.categoryName,
    totalRevenue: item?.totalRevenue,
  }));

  return (
    <div>
      <ResponsiveContainer
        height={300}
        width="100%"
      >
        <BarChart data={formattedData}>
          <XAxis
            dataKey="category"
            tick={{ fill: "#3B82F6", fontWeight: "bold", fontSize: 14 }}
          />
          <YAxis tick={{ fill: "#10B981", fontWeight: "bold", fontSize: 14 }} />
          <Tooltip />
          <Bar dataKey="totalRevenue" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryStats;

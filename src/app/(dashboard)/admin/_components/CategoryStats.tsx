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
    <div className="bg-neutral/40 backdrop-blur-md p-8 rounded-3xl border border-success/10 shadow-2xl flex flex-col h-full hover:border-success/30 transition-all duration-500">
      <h3 className="text-xl font-black text-white mb-8 tracking-tight">Category-wise <span className="text-success italic font-serif text-sm ml-2">Revenue</span></h3>
      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer height="100%" width="100%">
          <BarChart data={formattedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis
              dataKey="category"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: "600" }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: "600" }} 
            />
            <Tooltip 
              cursor={{ fill: 'rgba(34, 197, 94, 0.05)' }}
              contentStyle={{ 
                backgroundColor: '#171717', 
                border: '1px solid rgba(34, 197, 94, 0.2)', 
                borderRadius: '12px',
                color: '#fff'
              }}
              itemStyle={{ color: '#22c55e' }}
            />
            <Bar 
              dataKey="totalRevenue" 
              fill="#22c55e" 
              radius={[6, 6, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryStats;

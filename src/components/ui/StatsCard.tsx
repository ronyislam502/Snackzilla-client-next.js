"use client"

import { LineChart, Line, ResponsiveContainer } from "recharts";

const StatCard = ({ stats }: { stats: any }) => (
    <div className="bg-[#0a0a0a]/60 backdrop-blur-3xl p-6 rounded-3xl border border-success/20 shadow-2xl flex flex-col h-full group hover:border-blue-500/40 transition-all duration-500 relative overflow-hidden">
        {/* Default success glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-success/8 via-success/3 to-transparent transition-opacity duration-500 group-hover:opacity-0 pointer-events-none" />
        {/* Hover blue glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/8 via-blue-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="absolute top-0 right-0 w-20 h-20 bg-success/10 group-hover:bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10 transition-colors duration-500" />

        {/* Title & Value */}
        <div className="space-y-1 relative z-10">
            <p className="text-[8px] text-gray-500 uppercase tracking-[0.3em] font-black italic">{stats?.title}</p>
            <h3 className="text-2xl font-black text-white group-hover:text-blue-400 transition-all duration-500 italic tracking-tighter">{stats?.value}</h3>
        </div>

        {/* Trend & Chart */}
        <div className="mt-6 flex items-end justify-between relative z-10">
            <div className={`flex items-center gap-1.5 text-[8px] font-black px-2.5 py-1 rounded-full border italic tracking-wider transition-all group-hover:scale-105 ${stats?.trend === "up" ? "bg-success/5 group-hover:bg-blue-500/10 text-success group-hover:text-blue-400 border-success/20 group-hover:border-blue-500/30" : "bg-red-500/5 text-red-500 border-red-500/20"}`}>
                {stats?.change}
            </div>
            <div className="w-20 h-8 opacity-40 group-hover:opacity-100 transition-all duration-700">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stats?.data}>
                        <Line
                            type="monotone"
                            dataKey="v"
                            stroke="#22c55e"
                            className="group-hover:[stroke:#3b82f6]"
                            strokeWidth={3}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
);

export default StatCard;
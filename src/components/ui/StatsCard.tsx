"use client"

import { LineChart, Line, ResponsiveContainer } from "recharts";

interface TStat { title?: string; value?: string | number; change?: string | number; trend?: string; data?: { v: number }[]; color?: string }

const StatCard = ({ stats }: { stats: TStat }) => (
    <div className="bg-[#0a0a0a]/60 backdrop-blur-3xl p-5 rounded-3xl border border-success/20 shadow-2xl flex flex-col justify-between h-full group hover:border-blue-500/40 hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] transition-all duration-500 relative overflow-hidden min-h-[140px]">
        {/* Default success glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-success/8 via-success/3 to-transparent transition-opacity duration-500 group-hover:opacity-0 pointer-events-none" />
        {/* Hover blue glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="absolute top-0 right-0 w-20 h-20 bg-success/10 group-hover:bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10 transition-colors duration-500" />

        <div className="relative z-10 flex flex-col gap-4">
            {/* Top Row: Title & Value */}
            <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                    <p className="text-[8px] text-gray-500 uppercase tracking-[0.3em] font-black italic truncate max-w-[100px]">{stats?.title}</p>
                    <h3 className="text-xl font-black text-white group-hover:text-blue-400 transition-all duration-500 italic tracking-tighter truncate">{stats?.value}</h3>
                </div>
            </div>

            {/* Bottom Row: Chart */}
            <div className="h-10 w-full opacity-40 group-hover:opacity-100 transition-all duration-700">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stats?.data && stats.data.length > 0 ? stats.data : [{ v: 0 }, { v: 0 }]}>
                        <Line
                            type="monotone"
                            dataKey="v"
                            stroke={stats?.color || "#22c55e"}
                            strokeWidth={2.5}
                            dot={false}
                            animationDuration={1500}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
);

export default StatCard;
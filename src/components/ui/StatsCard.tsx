"use client"

import { LineChart, Line, ResponsiveContainer } from "recharts";

const StatCard = ({ stats }: { stats: any }) => (
    <div className="card bg-base-100 shadow-xl rounded-3xl border border-purple-50 p-2 flex flex-col h-full">
        {/* Title & Value */}
        <div className="space-y-1 text-center">
            <p className="text-xs text-blue-400 uppercase tracking-wider">{stats?.title}</p>
            <h3 className="text-xl font-bold text-white">{stats?.value}</h3>
        </div>

        {/* Trend & Chart */}
        <div className="mt-4 flex items-end justify-between">
            <div className={`flex items-center gap-1 text-xs font-bold ${stats?.trend === "up" ? "text-success" : "text-error"}`}>
                {stats?.change}
            </div>
            <div className="w-20 h-6">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stats?.data}>
                        <Line type="monotone" dataKey="v" stroke={stats?.color} strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
);

export default StatCard;
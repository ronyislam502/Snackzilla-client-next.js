"use client"

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const SummaryStats = ({ orderStatusCounts }: { orderStatusCounts?: Record<string, number> }) => {
    const statuses = [
        { name: 'Unshipped', key: 'UNSHIPPED', color: '#22c55e' },
        { name: 'Pending', key: 'PENDING', color: '#fb923c' },
        { name: 'Shipped', key: 'SHIPPED', color: '#0ea5e9' },
        { name: 'Delivered', key: 'DELIVERED', color: '#a855f7' },
        { name: 'Cancelled', key: 'CANCELLED', color: '#ef4444' },
        { name: 'Refunded', key: 'REFUNDED', color: '#64748b' },
    ];

    const data = statuses.map(s => ({
        name: s.name,
        value: orderStatusCounts?.[s.key] || 0,
        color: s.color
    })).filter(d => d.value > 0);

    const totalLogs = Object.values(orderStatusCounts || {}).reduce((acc, curr) => acc + curr, 0);

    return (
        <div className="bg-neutral/40 backdrop-blur-md p-8 rounded-3xl border border-success/10 shadow-2xl hover:border-success/30 transition-all duration-500 flex flex-col h-full">
            <h3 className="text-xl font-black text-white mb-8 tracking-tight">Order <span className="text-success italic font-serif">Status</span></h3>
            <div className="flex flex-wrap justify-center gap-4 mb-8 mt-auto">
                {statuses.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-xl border border-white/5">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-[10px] font-bold text-gray-300 whitespace-nowrap">{item.name} <span className="text-white ml-1 font-black">{orderStatusCounts?.[item.key] || 0}</span></span>
                    </div>
                ))}
            </div>
            <div className="relative flex-1 flex items-center justify-center min-h-[220px] mb-auto">
                <div className="absolute inset-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data.length > 0 ? data : [{ name: 'Empty', value: 1, color: '#1a1a1a' }]}
                                innerRadius={70}
                                outerRadius={90}
                                paddingAngle={data.length > 0 ? 8 : 0}
                                dataKey="value"
                                stroke="none"
                                cornerRadius={10}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                                {data.length === 0 && <Cell fill="#1a1a1a" />}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="text-center">
                    <p className="text-5xl font-black text-white leading-none">{totalLogs}</p>
                    <p className="text-[10px] font-bold text-success uppercase tracking-[0.2em] mt-2">Total Logs</p>
                </div>
            </div>
        </div>
    );
};

export default SummaryStats;
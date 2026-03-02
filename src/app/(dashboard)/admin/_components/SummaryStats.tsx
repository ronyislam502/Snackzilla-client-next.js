"use client"

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// Data from orderStatusCounts
const data = [
    { name: 'Unshipped', value: 13, color: '#22c55e' }, // Green
    { name: 'Cancelled', value: 4, color: '#ef4444' },  // Red
];

const SummaryStats = () => {
    return (
        <div className="bg-neutral/40 backdrop-blur-md p-8 rounded-3xl border border-success/10 shadow-2xl hover:border-success/30 transition-all duration-500 flex flex-col h-full">
            <h3 className="text-xl font-black text-white mb-8 tracking-tight">Order <span className="text-success italic font-serif">Status</span></h3>
            <div className="flex flex-wrap justify-center gap-6 mb-8 mt-auto">
                {data.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-black/40 px-4 py-2 rounded-xl border border-white/5">
                        <div className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.2)]" style={{ backgroundColor: item.color }} />
                        <span className="text-xs font-bold text-gray-300 whitespace-nowrap">{item.name} <span className="text-white ml-1 font-black">{item.value}</span></span>
                    </div>
                ))}
            </div>
            <div className="relative flex-1 flex items-center justify-center min-h-[200px] mb-auto">
                <div className="absolute inset-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                innerRadius={70}
                                outerRadius={90}
                                paddingAngle={8}
                                dataKey="value"
                                stroke="none"
                                cornerRadius={10}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="text-center">
                    <p className="text-5xl font-black text-white leading-none">17</p>
                    <p className="text-[10px] font-bold text-success uppercase tracking-[0.2em] mt-2">Total Logs</p>
                </div>
            </div>
        </div>
    );
};

export default SummaryStats;
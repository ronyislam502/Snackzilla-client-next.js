"use client"

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// Data from orderStatusCounts
const data = [
    { name: 'Unshipped', value: 13, color: '#a855f7' }, // Purple
    { name: 'Cancelled', value: 4, color: '#f472b6' },  // Pink
];

const HomeDelivery: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-purple-50 flex flex-col">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Order Status</h3>

            <div className="relative flex-1 flex items-center justify-center min-h-[100px]">
                <div className="absolute inset-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                innerRadius={65}
                                outerRadius={85}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="text-center">
                    <p className="text-3xl font-extrabold text-gray-800">17</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Logs</p>
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-4">
                {data.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-[10px] font-bold text-gray-500 whitespace-nowrap">{item.name} ({item.value})</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeDelivery;
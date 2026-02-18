
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mapping from the provided dailyRevenue array
const data = [
    { name: 'Aug 17', value: 2554.2 },
    { name: 'Aug 19', value: 1954.7 },
    { name: 'Oct 10', value: 163.9 },
    { name: 'Oct 11', value: 5000.5 },
];

const SalesSummary = ({ salesData }: any) => {
    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-purple-50 h-full">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-lg font-bold text-gray-800">Revenue Summary</h3>
                    <p className="text-xs text-gray-400 font-medium">Daily Tracking 2025</p>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold text-gray-800">$4,672.80</p>
                    <div className="h-1 w-full bg-purple-100 rounded-full mt-1">
                        <div className="h-full bg-purple-600 w-[92%] rounded-full" />
                    </div>
                </div>
            </div>

            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} stroke="#f3f4f6" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 10 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 10 }}
                            tickFormatter={(value) => `$${value}`}
                        />
                        <Tooltip
                            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Revenue']}
                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#8b5cf6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorValue)"
                            dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff' }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="flex justify-between mt-4 px-4">
                {['Aug 17', 'Aug 19', 'Oct 10'].map((label, idx) => (
                    <span key={idx} className={`text-xs font-bold ${idx === 0 ? 'text-purple-600' : 'text-gray-400'}`}>
                        {label}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default SalesSummary;

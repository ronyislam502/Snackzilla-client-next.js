
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mapping from the provided dailyRevenue array
const data = [
    { name: 'Aug 17', value: 2554.2 },
    { name: 'Aug 19', value: 1954.7 },
    { name: 'Oct 10', value: 163.9 },
    { name: 'Oct 11', value: 5000.5 },
];

const SalesSummary = ({ salesData }: { salesData?: unknown }) => {
    return (
        <div className="bg-neutral/40 backdrop-blur-md p-8 rounded-3xl border border-success/10 shadow-2xl hover:border-success/30 transition-all duration-500">
            <div className="flex justify-between items-start mb-10">
                <div>
                    <h3 className="text-xl font-black text-white tracking-tight">Revenue <span className="text-success italic font-serif">Summary</span></h3>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Daily Tracking 2026</p>
                </div>
                <div className="text-right">
                    <p className="text-3xl font-black text-white">$4,672.80</p>
                    <div className="h-1.5 w-32 bg-success/10 rounded-full mt-2 overflow-hidden">
                        <div className="h-full bg-success w-[92%] rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                    </div>
                </div>
            </div>

            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.03)" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 10, fontWeight: '600' }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 10, fontWeight: '600' }}
                            tickFormatter={(value) => `$${value}`}
                        />
                        <Tooltip
                            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Revenue']}
                            contentStyle={{ 
                                backgroundColor: '#171717', 
                                border: '1px solid rgba(34, 197, 94, 0.2)', 
                                borderRadius: '12px',
                                color: '#fff'
                            }}
                            itemStyle={{ color: '#22c55e' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#22c55e"
                            strokeWidth={4}
                            fillOpacity={1}
                            fill="url(#colorValue)"
                            dot={{ r: 4, fill: '#22c55e', strokeWidth: 0 }}
                            activeDot={{ r: 6, fill: '#22c55e', strokeWidth: 3, stroke: '#fff' }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SalesSummary;

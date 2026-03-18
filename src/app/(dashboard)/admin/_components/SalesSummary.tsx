"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SalesSummary = ({ salesData, totalRevenue }: { salesData?: any[], totalRevenue?: number }) => {
    const formattedData = salesData?.map(item => {
        // Handle Monthly Revenue (Structure: { _id: { month: number, year: number }, totalRevenue: number })
        if (item._id && 'month' in item._id && !('day' in item._id)) {
            const date = new Date(item._id.year, item._id.month - 1);
            return {
                name: date.toLocaleString('default', { month: 'short' }) + ' ' + (item._id.year % 100),
                value: item.totalRevenue
            };
        }
        
        // Handle Daily Revenue (Structure: { _id: { day: number, month: number, year: number }, totalRevenue: number })
        if (item._id && 'day' in item._id) {
            return {
                name: `${item._id.day}/${item._id.month}`,
                value: item.totalRevenue
            };
        }

        // Handle Yearly Revenue (Structure: { _id: { year: number }, totalRevenue: number })
        if (item._id && 'year' in item._id && !('month' in item._id)) {
            return {
                name: String(item._id.year),
                value: item.totalRevenue
            };
        }

        return { name: 'Unknown', value: 0 };
    }) || [];

    return (
        <div className="bg-neutral/40 backdrop-blur-md p-8 rounded-3xl border border-success/10 shadow-2xl hover:border-success/30 transition-all duration-500 font-sans">
            <div className="flex justify-between items-start mb-10">
                <div>
                    <h3 className="text-xl font-black text-white tracking-tight">Revenue <span className="text-success italic font-serif">Summary</span></h3>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Live Tracking Protocol</p>
                </div>
                <div className="text-right">
                    <p className="text-3xl font-black text-white">${totalRevenue?.toLocaleString() || '0.00'}</p>
                    <div className="h-1.5 w-32 bg-success/10 rounded-full mt-2 overflow-hidden shadow-inner">
                        <div className="h-full bg-success w-[85%] rounded-full shadow-[0_0_15px_rgba(34,197,94,0.4)] animate-pulse" />
                    </div>
                </div>
            </div>

            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.02)" strokeDasharray="3 3" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 9, fontWeight: '700' }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 9, fontWeight: '700' }}
                            tickFormatter={(value) => `$${value >= 1000 ? (value/1000).toFixed(1)+'k' : value}`}
                        />
                        <Tooltip
                            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Valuation']}
                            contentStyle={{ 
                                backgroundColor: '#0a0a0a', 
                                border: '1px solid rgba(34, 197, 94, 0.3)', 
                                borderRadius: '16px',
                                color: '#fff',
                                backdropFilter: 'blur(20px)',
                                fontSize: '10px',
                                fontWeight: '900'
                            }}
                            itemStyle={{ color: '#22c55e' }}
                            cursor={{ stroke: '#22c55e', strokeWidth: 1, strokeDasharray: '5 5' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#22c55e"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorValue)"
                            dot={{ r: 3, fill: '#22c55e', strokeWidth: 0 }}
                            activeDot={{ r: 5, fill: '#fff', strokeWidth: 2, stroke: '#22c55e' }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SalesSummary;
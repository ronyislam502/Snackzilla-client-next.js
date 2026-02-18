"use client";

import React from "react";

interface TrendingItemProps {
    name: string;
    category: string;
    revenue: number;
    orders: number;
    image: string;
}

const ItemCard: React.FC<TrendingItemProps> = ({ name, category, revenue, orders, image }) => {
    // Calculate mock percentage for circular progress
    const percentage = Math.min(100, (orders / 23) * 100);

    return (
        <div className="flex items-center justify-between p-4 bg-base-100 rounded-2xl border border-purple-50/50 shadow-sm">
            <div className="flex items-center gap-4">
                <img
                    src={image}
                    alt={name}
                    className="w-14 h-14 rounded-2xl object-cover shadow-sm"
                />
                <div>
                    <h4 className="font-bold text-gray-800 text-sm truncate max-w-[120px]">{name}</h4>
                    <div className="flex flex-col gap-0.5 mt-1">
                        <span className="text-[10px] font-bold text-purple-600 uppercase">{category}</span>
                        <span className="text-xs font-bold text-gray-400">${revenue.toFixed(0)} Rev</span>
                    </div>
                </div>
            </div>

            {/* Circular progress */}
            <div className="relative w-12 h-12">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                        className="text-gray-200 stroke-current"
                        strokeWidth="3"
                        fill="none"
                        d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                        className="text-purple-600 stroke-current"
                        strokeWidth="3"
                        strokeDasharray={`${percentage}, 100`}
                        strokeLinecap="round"
                        fill="none"
                        d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text
                        x="18"
                        y="21"
                        className="text-[10px] font-bold fill-gray-800"
                        textAnchor="middle"
                    >
                        {orders}
                    </text>
                </svg>
            </div>
        </div>
    );
};

const TrendingFoods: React.FC = () => {
    const items: TrendingItemProps[] = [
        { name: "Espresso", category: "Coffee", revenue: 2640, orders: 22, image: "https://picsum.photos/seed/coffee/200/200" },
        { name: "Butter Chicken Rice", category: "Platter", revenue: 698, orders: 2, image: "https://picsum.photos/seed/curry/200/200" },
        { name: "Spicy Sausage Pizza", category: "Pizza", revenue: 599, orders: 1, image: "https://picsum.photos/seed/pizza/200/200" },
        { name: "Cold Coffee", category: "Coffee", revenue: 149, orders: 1, image: "https://picsum.photos/seed/iced/200/200" },
    ];

    return (
        <div className="card bg-base-100 p-6 rounded-3xl shadow-sm border border-purple-50">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Trending Items</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map((item, idx) => (
                    <ItemCard key={idx} {...item} />
                ))}
            </div>
        </div>
    );
};

export default TrendingFoods;

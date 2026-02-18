"use client"

import React from 'react';
import SummaryStats from '../_components/SummaryStats';
import SalesSummary from '../_components/SalesSummary';
import TrendingFoods from '../_components/TrendingFoods';

const Dash = () => {
    return (
        <div >
            <div className="p-6 grid lg:grid-cols-2 gap-6">
                <SalesSummary />
                <SummaryStats />
            </div>
            <div className="p-6 grid lg:grid-cols-2 gap-6">
                <TrendingFoods />
            </div>
        </div>
    );
};

export default Dash;
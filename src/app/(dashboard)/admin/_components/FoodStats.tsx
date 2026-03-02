import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
const COLORS = ["#22c55e", "#10b981", "#059669", "#047857", "#064e3b"];

const FoodStats = ({ foodData }: { foodData: any[] }) => {
  return (
    <div className="bg-neutral/40 backdrop-blur-md p-8 rounded-3xl border border-success/10 shadow-2xl flex flex-col h-full hover:border-success/30 transition-all duration-500">
      <h3 className="text-xl font-black text-white mb-8 tracking-tight">Food-wise <span className="text-success italic font-serif text-sm ml-2">Popularity</span></h3>
      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer height="100%" width="100%">
          <PieChart>
            <Pie
              cx="50%"
              cy="50%"
              data={foodData}
              dataKey="totalRevenue"
              stroke="none"
              nameKey="foodName"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
            >
              {foodData?.map((food, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#171717', 
                border: '1px solid rgba(34, 197, 94, 0.2)', 
                borderRadius: '12px',
                color: '#fff'
              }}
              itemStyle={{ color: '#22c55e' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FoodStats;

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

const FoodStats = ({ foodData }: { foodData: any[] }) => {
  return (
    <ResponsiveContainer height={300} width="100%">
      <PieChart>
        <Pie
          label
          cx="50%"
          cy="50%"
          data={foodData}
          dataKey="totalRevenue"
          fill="#8884d8"
          nameKey="foodName"
          outerRadius={100}
        >
          {foodData?.map((food, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default FoodStats;

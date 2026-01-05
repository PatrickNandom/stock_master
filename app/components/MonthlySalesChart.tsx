"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface SalesData {
  month: string;
  productA: number;
  productB: number;
}

const data: SalesData[] = [
  { month: "May", productA: 62, productB: 75 },
  { month: "June", productA: 68, productB: 62 },
  { month: "July", productA: 68, productB: 46 },
  { month: "August", productA: 68, productB: 64 },
];

const MonthlySalesChart = () => {
  return (
    <div className="self-center hidden sm:block mt-8 w-full max-w-6xl p-8 bg-white rounded-3xl shadow-sm border border-gray-100">
      <h2 className="text-center text-2xl font-semibold text-[#632a19] mb-8">
        Monthly sales
      </h2>

      <div className="h-[400] w-full relative">
        {/* Y-Axis Label */}
        <div className="absolute -left-2 -top-6 text-xs font-bold text-[#1d2645] flex flex-col">
          <span>Price</span>
          <span>(N)</span>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            barGap={12}
          >
            <CartesianGrid vertical={false} stroke="#e5e7eb" strokeWidth={1} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#1d2645", fontSize: 12 }}
              dy={15}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              ticks={[15, 30, 45, 60, 75]}
              tick={{ fill: "#1d2645", fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />

            {/* Product A - Orange Bar */}
            <Bar
              dataKey="productA"
              fill="#f25f33"
              radius={[2, 2, 0, 0]}
              barSize={45}
            />

            {/* Product B - Dark Navy Bar */}
            <Bar
              dataKey="productB"
              fill="#0a143f"
              radius={[2, 2, 0, 0]}
              barSize={45}
            />
          </BarChart>
        </ResponsiveContainer>

        {/* X-Axis Label */}
        <div className="absolute -right-4 -bottom-2 text-xs font-bold text-[#1d2645]">
          Months
        </div>
      </div>
    </div>
  );
};

export default MonthlySalesChart;

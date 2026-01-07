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
  macbook: number;
  airpods: number;
}

const data: SalesData[] = [
  { month: "January", macbook: 32, airpods: 45 },
  { month: "February", macbook: 28, airpods: 38 },
  { month: "March", macbook: 45, airpods: 52 },
  { month: "April", macbook: 50, airpods: 48 },
  { month: "May", macbook: 62, airpods: 75 },
  { month: "June", macbook: 68, airpods: 62 },
  { month: "July", macbook: 72, airpods: 55 },
  { month: "August", macbook: 85, airpods: 90 },
  { month: "September", macbook: 78, airpods: 82 },
  { month: "October", macbook: 92, airpods: 98 },
  { month: "November", macbook: 110, airpods: 115 },
  { month: "December", macbook: 115, airpods: 120 },
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
            margin={{ top: 10, right: 10, left: -20, bottom: 4 }}
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
              ticks={[15, 30, 45, 60, 75,90, 105, 120]}
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

            {/* Macbook - Orange Bar */}
            <Bar
              dataKey="macbook"
              fill="#f25f33"
              radius={[2, 2, 0, 0]}
              barSize={30}
            />

            {/* Airpods - Dark Navy Bar */}
            <Bar
              dataKey="airpods"
              fill="#0a143f"
              radius={[2, 2, 0, 0]}
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>

        {/* X-Axis Label */}
        <div className="absolute -right-4 -bottom-4 text-xs font-bold text-[#1d2645]">
          Months
        </div>
      </div>
    </div>
  );
};

export default MonthlySalesChart;

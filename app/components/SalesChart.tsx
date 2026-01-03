const SalesChart = () => {
  return (
    <div className="bg-white rounded-xl p-6 mt-6">
      <h3 className="font-semibold mb-4 text-center">Monthly sales</h3>

      <div className="flex justify-around items-end h-48">
        {["May", "Jun", "Jul", "Aug"].map((month) => (
          <div key={month} className="flex gap-2 items-end">
            <div className="w-6 bg-orange-500 h-32 rounded" />
            <div className="w-6 bg-indigo-900 h-40 rounded" />
            <span className="absolute mt-52 text-xs">{month}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SalesChart;

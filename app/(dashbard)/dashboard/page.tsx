import StoreCard from "@/app/components/StoreCard";
import SalesChart from "@/app/components/SalesChart";
import StatCard from "@/app/components/StatCard";

const DashboardPage = () => {
  return (
    <div className="flex flex-col ">
      <StoreCard
        storeName="Urban Outfitters"
        description="Household items sales"
        address="123 Fashion Ave, New York, NY"
        imageSrc="/dashboard_store_card_icon.svg"
      />

      <SalesChart />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <StatCard label="Total Monthly Sales" value="988 Items" />
        <StatCard label="New Item Price" value="$900k" />
        <StatCard label="Total Monthly Profit" value="$300k" />
        <StatCard label="New Inventory Items" value="700 Items" />
        <StatCard label="Total Sales Price" value="$900k" />
      </div>
    </div>
  );
};

export default DashboardPage;
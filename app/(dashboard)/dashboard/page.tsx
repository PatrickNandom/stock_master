import StoreCard from "@/app/components/StoreCard";
import StatCard from "@/app/components/StatCard";
import MonthlySalesChart from "@/app/components/MonthlySalesChart";

const DashboardPage = () => {
  return (
    <div className="flex flex-col py-8 max-w-7xl mx-auto">
      <StoreCard
        storeName="Urban Outfitters"
        description="Household items sales"
        address="123 Fashion Ave, New York, NY"
        imageSrc="/dashboard_store_card_icon.svg"
      />
      <MonthlySalesChart />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        <StatCard
          imageSrc="/dashboard_card_sales_icon.svg"
          bgColor="bg-[#F7AB97]"
          label="Total Monthly Sales"
          value={
            <>
              988
              <br />
              Items
            </>
          }
        />
        <StatCard
          imageSrc="/dashboard_card_doller_icon.svg"
          label="New Item Price"
          value="₦900k"
          bgColor="bg-[#838AA3]"
        />
        <StatCard
          imageSrc="/dashboard_card_sales_icon.svg"
          label="Total Monthly Profit"
          value="₦300k"
          bgColor="bg-[#F7AB97]"
        />
        <StatCard
          imageSrc="/dashboard_card_inventory_icon.svg"
          label="New Inventory Items"
          value={
            <>
              988
              <br />
              Items
            </>
          }
          bgColor="bg-[#838AA3]"
        />
        <StatCard
          imageSrc="/dashboard_card_doller_icon.svg"
          label="Total Sales Price"
          value="₦1.2M"
          bgColor="bg-[#F7AB97]"
        />
      </div>
    </div>
  );
};

export default DashboardPage;


import StoreCard from "@/app/components/StoreCard";
const Dashboard = () => {
  return (
    <div className="p-10 bg-gray-900 min-h-screen flex justify-center items-center">
      <StoreCard
        storeName="Urban Outfitters"
        description="Household items sales"
        address="123 Fashion Ave, New York, NY"
        imageSrc="/store_card_icon.svg"
      />
    </div>
  );
};

export default Dashboard;

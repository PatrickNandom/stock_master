import Sidebar from "@/app/components/Sidebar";
import Topbar from "@/app/components/Topbar";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex max-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="p-6 overflow-y-auto h-screen">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;

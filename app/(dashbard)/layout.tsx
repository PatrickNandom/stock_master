import "../globals.css";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <div className="flex max-h-screen bg-gray-100">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <Topbar />
            <main className="p-6 overflow-y-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
};

export default DashboardLayout;

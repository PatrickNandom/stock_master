import "../globals.css";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen bg-gray-100">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <Topbar />
            <main className="p-6 overflow-y-auto overflow-x-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
};

export default DashboardLayout;

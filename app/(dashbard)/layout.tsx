import "../globals.css";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </head>
      <body className="h-full antialiased">
        <div className="flex h-dvh bg-gray-100">
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
a;

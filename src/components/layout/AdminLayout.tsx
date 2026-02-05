import { Outlet } from "react-router-dom";
import AdminTopbar from "./AdminTopbar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Modern Topbar */}
      <AdminTopbar />

      {/* Content Area - Full width */}
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

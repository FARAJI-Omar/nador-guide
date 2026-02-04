import { Outlet } from "react-router-dom";
import AdminTopbar from "./AdminTopbar";

/**
 * Admin Layout - Full Width Modern Design
 *
 * Features:
 * - Full-width layout with top navigation
 * - Modern header with user profile
 * - Clean content area without constraints
 */
const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
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

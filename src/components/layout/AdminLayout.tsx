import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';

/**
 * Phase 4.1 - Admin Layout (Tailwind)
 * 
 * Separate UI from visitor:
 * - Sidebar with navigation
 * - Topbar
 * - Content area
 */
const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <AdminTopbar />

        {/* Content Area */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

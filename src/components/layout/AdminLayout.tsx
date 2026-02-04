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
    <div className="flex max-w-full bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminTopbar />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

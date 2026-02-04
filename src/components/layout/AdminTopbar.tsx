import { Calendar } from 'lucide-react';

/**
 * Admin Topbar Component - Modern & Minimalist Design
 */
const AdminTopbar = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Calendar className="w-4 h-4" />
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;

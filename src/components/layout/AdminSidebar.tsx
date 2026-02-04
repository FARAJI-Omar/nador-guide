import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, MapPin, Home, LogOut } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logoutUser, selectUser } from '../../features/auth/authSlice';

/**
 * Admin Sidebar Component - Modern & Minimalist Design
 * Redux integrated for auth state management
 */
const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/admin/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-2 mb-1">
          <MapPin className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-bold">Nador Guide</h2>
        </div>
        <p className="text-sm text-slate-400 mt-1">Admin Panel</p>
      </div>

      {/* User Info */}
      {user && (
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <img
              src={user.image}
              alt={user.firstName}
              className="w-12 h-12 rounded-full ring-2 ring-slate-700"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-slate-400 truncate">{user.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/admin/dashboard"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 no-underline ${
                isActive('/admin/dashboard')
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/places"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 no-underline ${
                isActive('/admin/places')
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <MapPin className="w-5 h-5" />
              <span className="font-medium">Places</span>
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200 no-underline"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">View Site</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-200 text-white font-semibold shadow-md hover:shadow-lg"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;

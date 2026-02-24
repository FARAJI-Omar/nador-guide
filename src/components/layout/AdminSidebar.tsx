import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, MapPin, Users, BarChart3, Settings, LogOut, Shield } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logoutUser, selectUser } from '../../features/auth/authSlice';
import logo from '../../assets/logo.png';

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
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-1">
          <Shield className="w-6 h-6 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-900">Admin Panel</h2>
        </div>
      </div>

      {/* {user && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <img src={user.image} alt={user.firstName} className="w-10 h-10 rounded-full" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-slate-500 truncate">{user.email}</p>
            </div>
          </div>
        </div>
      )} */}

      <nav className="flex-1 p-4 max-h-100">
        <ul className="space-y-2">
          <li>
            <Link
              to="/admin/dashboard"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all no-underline ${
                isActive('/admin/dashboard')
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'text-slate-700 hover:bg-gray-50'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/places"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all no-underline ${
                isActive('/admin/places')
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'text-slate-700 hover:bg-gray-50'
              }`}
            >
              <MapPin className="w-5 h-5" />
              <span>Place Management</span>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-gray-50 transition-all no-underline"
            >
              <Users className="w-5 h-5" />
              <span>Users</span>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-gray-50 transition-all no-underline"
            >
              <BarChart3 className="w-5 h-5" />
              <span>Analytics</span>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-gray-50 transition-all no-underline"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200 ">
        <button
          onClick={handleLogout}
          className="w-full flex cursor-pointer items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all font-medium"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;

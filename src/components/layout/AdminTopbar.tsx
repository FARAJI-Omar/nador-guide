import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, MapPin, Home, LogOut, User, Menu } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logoutUser, selectUser } from '../../features/auth/authSlice';
import { useState } from 'react';

/**
 * Admin Topbar Component - Full Width Modern Design
 * Replaces sidebar with horizontal navigation
 */
const AdminTopbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/admin/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-full px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 no-underline group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  Nador Guide
                </h1>
                <p className="text-xs text-slate-500 font-medium">Admin Panel</p>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-2">
              <Link
                to="/admin/dashboard"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 no-underline ${
                  isActive('/admin/dashboard')
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-blue-600'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/admin/places"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 no-underline ${
                  isActive('/admin/places')
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-blue-600'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Places</span>
              </Link>
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-slate-600 hover:bg-slate-100 hover:text-blue-600 transition-all duration-200 no-underline"
              >
                <Home className="w-4 h-4" />
                <span>View Site</span>
              </Link>
            </nav>
          </div>

          {/* User Profile & Actions */}
          <div className="flex items-center gap-4">
            {user && (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-100 transition-all duration-200"
                >
                  <img
                    src={user.image}
                    alt={user.firstName}
                    className="w-10 h-10 rounded-full ring-2 ring-blue-500 shadow-md"
                  />
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-semibold text-slate-900">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>
                  <Menu className="w-4 h-4 text-slate-600" />
                </button>

                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-slate-900">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors duration-200"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Logout Button (visible on mobile) */}
            <button
              onClick={handleLogout}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 font-medium shadow-md"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;

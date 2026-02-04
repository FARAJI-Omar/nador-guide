import { Link } from "react-router-dom";
import { Home, Map, LayoutDashboard } from "lucide-react";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../features/auth/authSlice";

const Header = () => {
  const user = useAppSelector(selectUser);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center no-underline hover:opacity-80 transition-opacity duration-200"
          >
            <img src="/images/logo.svg" alt="Guidino" className="h-12 w-auto" />
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 text-slate-700 no-underline hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
            <Link
              to="/places"
              className="flex items-center gap-2 px-4 py-2 text-slate-700 no-underline hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
            >
              <Map className="w-5 h-5" />
              <span>Places</span>
            </Link>
            {user && (
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-2 px-4 py-2 text-slate-700 no-underline hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

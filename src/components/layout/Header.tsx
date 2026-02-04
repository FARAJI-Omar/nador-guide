import { Link } from "react-router-dom";
import { MapPin, Home, Map } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 no-underline text-slate-900 hover:text-blue-600 transition-colors duration-200"
          >
            <MapPin className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl font-bold tracking-tight">Nador Guide</h1>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 text-slate-700 no-underline hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </Link>
            <Link
              to="/places"
              className="flex items-center gap-2 px-4 py-2 text-slate-700 no-underline hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            >
              <Map className="w-5 h-5" />
              <span className="font-medium">Places</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

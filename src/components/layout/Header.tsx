import { Link } from "react-router-dom";
import { Search, Globe } from "lucide-react";
import logo from "../../assets/logo2.png";

const Header = () => {
  return (
    <header className="bg-[#f6f6f8] border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <img src="/images/logo.svg" alt="Nador" className="h-10 w-40" />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-slate-700 hover:text-blue-600 font-medium no-underline">Home</Link>
            <Link to="/places" className="text-slate-700 hover:text-blue-600 font-medium no-underline">Places</Link>
            <a href="#" className="text-slate-700 hover:text-blue-600 font-medium no-underline">About Nador</a>
            <a href="#" className="text-slate-700 hover:text-blue-600 font-medium no-underline">Contact</a>
          </nav>

          <div className="flex items-center gap-4">
            {/* <button className="p-2 hover:bg-slate-100 rounded-lg">
              <Search className="w-5 h-5 text-slate-600" />
            </button> */}
            <button className="p-2 hover:bg-slate-100 rounded-lg">
              <Globe className="w-5 h-5 text-slate-600" />
            </button>
            {/* <Link to="/admin/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 no-underline">
              Sign In
            </Link> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

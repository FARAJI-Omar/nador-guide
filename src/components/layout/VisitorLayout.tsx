import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const VisitorLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VisitorLayout;

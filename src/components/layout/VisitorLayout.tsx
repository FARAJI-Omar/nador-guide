import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

/**
 * Phase 2.1 - Visitor Layout (Tailwind)
 * 
 * Wraps all visitor/public pages with Header and Footer
 */
const VisitorLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default VisitorLayout;

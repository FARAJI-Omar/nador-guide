import { MapPin, Mail, Heart } from 'lucide-react';

/**
 * Visitor Footer Component - Modern & Minimalist Design
 */
const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-900">Nador Guide</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Discover the hidden gems of Nador - from pristine beaches to historic sites and authentic experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-slate-600 hover:text-blue-600 text-sm transition-colors duration-200 no-underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/places" className="text-slate-600 hover:text-blue-600 text-sm transition-colors duration-200 no-underline">
                  Explore Places
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">
              Contact
            </h4>
            <div className="flex items-center gap-2 text-slate-600 text-sm">
              <Mail className="w-4 h-4" />
              <a href="mailto:info@nadorguide.com" className="hover:text-blue-600 transition-colors duration-200 no-underline">
                info@nadorguide.com
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-slate-600 flex items-center justify-center gap-1">
            &copy; 2026 Nador Guide. Made with 
            <Heart className="w-4 h-4 text-red-500 fill-red-500" /> 
            for travelers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

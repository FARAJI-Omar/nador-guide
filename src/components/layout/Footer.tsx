import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-slate-50 to-slate-100 border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/images/logo.svg"
                alt="Guidino"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              Discover the hidden gems of Nador with Guidino. Your guide to
              pristine beaches, authentic cuisine, and unforgettable experiences.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="#"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-slate-600 hover:text-blue-600 transition-colors text-sm no-underline"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/places"
                  className="text-slate-600 hover:text-blue-600 transition-colors text-sm no-underline"
                >
                  Explore Places
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-600 hover:text-blue-600 transition-colors text-sm no-underline"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-600 hover:text-blue-600 transition-colors text-sm no-underline"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-6">Categories</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/places?category=beaches"
                  className="text-slate-600 hover:text-blue-600 transition-colors text-sm no-underline"
                >
                  Beaches
                </Link>
              </li>
              <li>
                <Link
                  to="/places?category=restaurants"
                  className="text-slate-600 hover:text-blue-600 transition-colors text-sm no-underline"
                >
                  Restaurants
                </Link>
              </li>
              <li>
                <Link
                  to="/places?category=historical-sites"
                  className="text-slate-600 hover:text-blue-600 transition-colors text-sm no-underline"
                >
                  Historical Sites
                </Link>
              </li>
              <li>
                <Link
                  to="/places?category=parks-nature"
                  className="text-slate-600 hover:text-blue-600 transition-colors text-sm no-underline"
                >
                  Parks & Nature
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-600 text-sm">
                  Nador, Morocco
                </span>
              </li>
              <li className="flex gap-3 items-start">
                <Phone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-600 text-sm">
                  +212 XXX XXXXXX
                </span>
              </li>
              <li className="flex gap-3 items-start">
                <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-600 text-sm">
                  info@guidino.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 pt-8"></div>

        {/* Copyright Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-sm">
            &copy; {currentYear} Guidino. All rights reserved.
          </p>
          <p className="text-slate-600 text-sm flex items-center gap-1">
            Made with
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            for Nador travelers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

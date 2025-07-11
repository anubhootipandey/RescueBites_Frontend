import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-amber-500 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold">RescueBites</span>
            </div>
            <p className="text-gray-700 mb-4">
              Fighting food waste through community-driven food sharing and donation. 
              Together, we can make a difference by ensuring surplus food reaches those who need it most.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center text-sm text-gray-700">
                <MapPin className="w-4 h-4 mr-2" />
                Uttar Pradesh, India
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-700 hover:text-gray-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-700 hover:text-gray-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/recipe-generator" className="text-gray-700 hover:text-gray-400 transition-colors">
                  Recipe Generator
                </Link>
              </li>
              {/* <li>
                <Link to="/rewards" className="text-gray-700 hover:text-gray-400 transition-colors">
                  Rewards
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-700">
                <Mail className="w-4 h-4 mr-2" />
                <a href="mailto:hello@rescuebites.com" className="hover:text-gray-400 transition-colors">
                  hello@rescuebites.com
                </a>
              </li>
              <li className="flex items-center text-gray-700">
                <Phone className="w-4 h-4 mr-2" />
                <a href="tel:+1234567890" className="hover:text-gray-400 transition-colors">
                  (123) 456-7890
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} RescueBites. All rights reserved. Built with ❤️ for a sustainable future.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

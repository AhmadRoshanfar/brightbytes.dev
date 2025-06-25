import { Link } from "gatsby";
import React from "react";

const Header = () => {
  return (
    <header className="w-full px-4 sm:px-8 py-3 bg-logo-bg-color text-white">
      <nav className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl sm:text-3xl text-logo-color font-bold logo-text">
          BrightBytes.dev
        </Link>

        {/* Navigation */}
        <ul className="flex items-center space-x-6">
          <li>
            <Link to="/" className="text-white hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="bg-green-500 px-4 py-1 rounded text-white font-semibold hover:bg-green-600 transition"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

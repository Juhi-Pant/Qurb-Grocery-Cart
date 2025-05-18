import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaHeart, FaUser, FaShoppingCart } from 'react-icons/fa';

type NavbarProps = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

const Navbar: React.FC<NavbarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-200 rounded-3xl">
      <div className="w-full px-6 py-3 flex items-center justify-between">
        {/*Link to homepage */}
        <Link to="/" className="text-3xl font-extrabold text-black whitespace-nowrap select-none">
          Groceries
        </Link>

        <div className="relative flex-grow max-w-3xl mx-8">
          <span className="absolute inset-y-0 left-4 flex items-center text-gray-400 text-lg">
            <FaSearch />
          </span>
          <input
            type="search"
            placeholder="Search groceries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-black pl-11 pr-5 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="flex space-x-6 text-gray-600 text-2xl">
          <FaHeart className="text-red-600 cursor-pointer" />
          <FaUser className="text-blue-600 cursor-pointer" />
          <Link to="/checkout">
            <FaShoppingCart className="text-gray-400 cursor-pointer" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

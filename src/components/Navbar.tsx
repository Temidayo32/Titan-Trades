"use client"
import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';
import { useAppStore } from '@/stores/AppContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItems = useAppStore((state) => state.cart);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-black shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-orange-600 text-xl font-bold">
          <Link href="/">Titan Trades</Link>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/cart" className="relative text-orange-600 hover:text-orange-800">
            <FaShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full px-2">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>

        <button className="md:hidden text-orange-600" onClick={toggleMenu}>
          <i className={`fa ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="flex flex-col items-center space-y-4 py-4">
            <Link href="/cart" className="relative text-orange-600 hover:text-orange-800">
              <FaShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full px-2">
                  {cartCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
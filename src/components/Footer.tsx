import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white py-6 w-full fixed bottom-0 left-0">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-8 mb-4">
          <Link href="/" className="text-orange-600 hover:text-orange-800">Home</Link>
          <Link href="#" className="text-orange-600 hover:text-orange-800">About Us</Link>
          <Link href="#" className="text-orange-600 hover:text-orange-800">Contact</Link>
        </div>
        <p className="text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} E-Commerce Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
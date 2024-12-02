import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white py-6 w-full fixed bottom-0 left-0">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-8 mb-4">
          <a href="/" className="text-orange-600 hover:text-orange-800">Home</a>
          <a href="#" className="text-orange-600 hover:text-orange-800">About Us</a>
          <a href="#" className="text-orange-600 hover:text-orange-800">Contact</a>
        </div>
        <p className="text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} E-Commerce Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
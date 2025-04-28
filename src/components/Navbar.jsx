import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold">Doctor Directory</div>
        <ul className="flex space-x-6">
          <li><a href="#" className="hover:text-gray-200">Home</a></li>
          <li><a href="#" className="hover:text-gray-200">About</a></li>
          <li><a href="#" className="hover:text-gray-200">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

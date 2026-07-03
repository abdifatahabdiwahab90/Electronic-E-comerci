

import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#0b132b] text-gray-400 pt-16 pb-6 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-800 pb-12 mb-6">
        
        {/* Newsletter & Branding */}
        <div className="space-y-4 md:col-span-1">
          <div className="text-white font-bold text-xl tracking-wide">⚡ ElectroNext</div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Stay in the loop with cutting-edge deals and modern tech drops directly in your ecosystem inbox.
          </p>
          <div className="flex gap-2 pt-2 ">
            <input type="email" placeholder="Your email..." className="bg-gray-800 text-white rounded-lg px-3 py-2 text-xs w-full focus:outline-none focus:ring-1 focus:ring-blue-500" />
            <button className="bg-blue-600 text-white font-semibold text-xs px-4 py-2 rounded-lg hover:bg-blue-700 transition">Join</button>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-4 tracking-wider uppercase">Products</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="hover:text-white transition">Laptops & PCs</a></li>
            <li><a href="#" className="hover:text-white transition">Smartphones</a></li>
            <li><a href="#" className="hover:text-white transition">Audio Devices</a></li>
            <li><a href="#" className="hover:text-white transition">Wearables</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-4 tracking-wider uppercase">Company</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="hover:text-white transition">About Us</a></li>
            <li><a href="#" className="hover:text-white transition">Careers</a></li>
            <li><a href="#" className="hover:text-white transition">Press Releases</a></li>
            <li><a href="#" className="hover:text-white transition">Affiliates</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-4 tracking-wider uppercase">Support</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="hover:text-white transition">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition">Track Order</a></li>
            <li><a href="#" className="hover:text-white transition">Returns & Exchanges</a></li>
            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
        <p>&copy; 2026 ElectroNext Marketplace. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Cookies</a>
        </div>
      </div>
    </footer>
  );
}
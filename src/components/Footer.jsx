import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-6">
              <Logo width="100px" />
            </div>
            <p className="text-sm text-gray-400">
              &copy; Copyright 2023. All Rights Reserved by DevUI.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase text-gray-400 mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link className="text-base text-gray-300 hover:text-gray-100" to="/">
                  Features
                </Link>
              </li>
              <li>
                <Link className="text-base text-gray-300 hover:text-gray-100" to="/">
                  Pricing
                </Link>
              </li>
              <li>
                <Link className="text-base text-gray-300 hover:text-gray-100" to="/">
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link className="text-base text-gray-300 hover:text-gray-100" to="/">
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase text-gray-400 mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link className="text-base text-gray-300 hover:text-gray-100" to="/">
                  Account
                </Link>
              </li>
              <li>
                <Link className="text-base text-gray-300 hover:text-gray-100" to="/">
                  Help
                </Link>
              </li>
              <li>
                <Link className="text-base text-gray-300 hover:text-gray-100" to="/">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link className="text-base text-gray-300 hover:text-gray-100" to="/">
                  Customer Support
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase text-gray-400 mb-4">Legals</h3>
            <ul className="space-y-2">
              <li>
                <Link className="text-base text-gray-300 hover:text-gray-100" to="/">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link className="text-base text-gray-300 hover:text-gray-100" to="/">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="text-base text-gray-300 hover:text-gray-100" to="/">
                  Licensing
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

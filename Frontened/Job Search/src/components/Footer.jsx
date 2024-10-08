import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap md:flex-nowrap justify-between gap-8 md:gap-12">
          {/* Column 1: About Us */}
          <div className="w-full md:w-1/3 mb-6 mr-8 ml-32">
            <h3 className="text-xl font-bold mb-2">About Us</h3>
            <p className="text-gray-400">
              We are a leading company in providing top-notch web development and design services. Our goal is to help businesses grow and succeed online.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="w-full md:w-1/3 mb-6">
            <h3 className="text-xl font-bold mb-2">Quick Links</h3>
            <ul>
              <li className="mb-2">
                <a href="/" className="text-gray-400 hover:text-white">Home</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-400 hover:text-white">About</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-400 hover:text-white">Services</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-gray-400 hover:text-white">Contact</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Follow Us */}
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-bold mb-2">Follow Us</h3>
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-facebook fa-2x"></i> Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter fa-2x"></i> Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-instagram fa-2x"></i> Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-linkedin fa-2x"></i> LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500">
          © 2024 Company Name. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

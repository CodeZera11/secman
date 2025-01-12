"use client"

import { useState } from 'react'
import { LandingPageSections } from './constants';
import { UserButton } from '../common/user-button';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <section id="navbar" className="fixed w-full z-50">
      <nav className="primary-gradient backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <a href="#hero" className="text-white font-bold text-xl">
                Web Toolbox
              </a>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                {/* {LandingPageSections.map(
                  (section) => (
                    <a
                      key={section}
                      href={`#${section.toLowerCase().replace(/\s+/g, '')}`}
                      className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      {section}
                    </a>
                  )
                )} */}

                <UserButton />
              </div>
            </div>
            <div className="md:hidden">
              <button
                type="button"
                onClick={toggleMobileMenu}
                className="hamburger inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-neutral-800 focus:outline-none"
                aria-controls="mobile-menu"
                aria-expanded={mobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="mobile-menu md:hidden px-2 pt-2 pb-3 space-y-1 bg-neutral-900/90 backdrop-blur-sm">
            {['Features', 'How It Works', 'Properties', 'Pricing', 'Testimonials', 'FAQ', 'Contact'].map(
              (section) => (
                <a
                  key={section}
                  href={`#${section.toLowerCase().replace(/\s+/g, '')}`}
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  {section}
                </a>
              )
            )}
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-300 mt-4">
              Sign In
            </button>
          </div>
        )}
      </nav>
    </section>
  )
}

export default Navbar
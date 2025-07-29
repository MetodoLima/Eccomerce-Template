import React from 'react';

const Navigation: React.FC = () => {
  const navItems = [
    'Starlink',
    'Macs', 
    'iPhones',
    'iPads',
    'Watchs',
    'Câmeras',
    'AirPods',
    'Acessórios',
    'Seminovos'
  ];

  return (
    <nav className="flex w-full h-12 md:h-[50px] justify-center items-center relative z-[100] bg-black px-4 sm:px-6">
      <ul className="flex h-full justify-center items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 max-w-7xl w-full max-sm:hidden">
        {navItems.map((item, index) => (
          <li key={index} className="flex h-full justify-center items-center">
            <a 
              href="#" 
              className="flex h-full justify-center items-center px-2 sm:px-3 text-white text-xs sm:text-sm font-medium text-center hover:text-accent transition-colors duration-300"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
      
      {/* Mobile menu button */}
      <button className="sm:hidden text-white p-2">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </nav>
  );
};

export default Navigation;

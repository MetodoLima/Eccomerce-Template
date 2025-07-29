import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { name: 'Starlink', href: '/categoria/starlink' },
    { name: 'Macs', href: '/categoria/macs' }, 
    { name: 'iPhones', href: '/categoria/iphones' },
    { name: 'iPads', href: '/categoria/ipads' },
    { name: 'Watchs', href: '/categoria/watchs' },
    { name: 'Câmeras', href: '/categoria/cameras' },
    { name: 'AirPods', href: '/categoria/airpods' },
    { name: 'Acessórios', href: '/categoria/acessorios' },
    { name: 'Seminovos', href: '/categoria/seminovos' }
  ];

  return (
    <header className="w-full bg-surface-elevated border-b border-border shadow-soft sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-black">
        <nav className="flex w-full h-12 md:h-[50px] justify-center items-center px-4 sm:px-6">
          <ul className="flex h-full justify-center items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 max-w-7xl w-full max-lg:hidden">
            {navItems.map((item, index) => (
              <li key={index} className="flex h-full justify-center items-center">
                <Link 
                  to={item.href}
                  className="flex h-full justify-center items-center px-2 sm:px-3 text-white text-xs sm:text-sm font-medium text-center hover:text-accent transition-colors duration-300"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Mobile menu button */}
          <button 
            className="lg:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </div>

      {/* Main navbar */}
      <div className="w-full px-4 sm:px-6 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-2xl sm:text-3xl font-bold text-primary">
              TechStore
            </div>
          </Link>

          {/* Search bar */}
          <div className="flex-1 max-w-xl mx-4 hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 w-full"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <User className="w-5 h-5 mr-2" />
              Login
            </Button>
            
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="mt-3 sm:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Buscar produtos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 w-full"
            />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-surface-elevated border-t border-border">
          <nav className="px-4 py-3">
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.href}
                    className="block py-2 px-3 text-foreground hover:bg-surface-subtle rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-border">
                <Link 
                  to="/login"
                  className="block py-2 px-3 text-foreground hover:bg-surface-subtle rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
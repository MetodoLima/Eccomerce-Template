import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from './ui/button';
import AnnouncementBar from './AnnouncementBar.tsx';
import SearchModal from './SearchModal';

const Navbar: React.FC = () => {
  const { items } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY && window.scrollY > 80) { 
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { name: 'Starlink', href: '/categoria/starlink' },
    { name: 'Macs', href: '/categoria/macs' },
    { name: 'iPhones', href: '/categoria/iphones' },
    { name: 'iPads', href: '/categoria/ipads' },
    { name: 'Acessórios', href: '/categoria/acessorios' },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-transform duration-300 ${showNav ? 'translate-y-0' : '-translate-y-full'}`}>
      <AnnouncementBar />
      <div className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Linha superior: lupa | logo | ícones */}
          <div className="grid grid-cols-2 lg:grid-cols-3 items-center h-16 sm:h-20 border-b border-gray-200">
            {/* Lupa (esquerda) */}
            <div className="flex items-center">
              <SearchModal />
            </div>

            {/* Logo (centralizada no desktop) */}
            <div className="flex col-start-1 col-end-2 lg:col-start-auto lg:col-end-auto justify-start lg:justify-center">
              <Link to="/" className="inline-flex items-center" aria-label="Home">
                <img src="/logo.svg" alt="Logo" className="h-8 sm:h-9 w-auto" />
              </Link>
            </div>

            {/* Ícones (direita) */}
            <div className="flex items-center justify-end space-x-2 sm:space-x-4">
              <Link to="/carrinho">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="w-6 h-6 text-gray-600" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Botão do menu mobile */}
              <div className="lg:hidden">
                <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(true)}>
                  <Menu className="w-6 h-6 text-gray-600" />
                </Button>
              </div>
            </div>
          </div>

          {/* Linha inferior: navegação centralizada */}
          <nav className="hidden lg:flex items-center justify-center space-x-8 py-3">
            {navItems.map((item) => (
              <Link key={item.name} to={item.href} className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Menu Mobile */}
        <div
          className={`fixed inset-0 z-40 bg-black bg-opacity-25 transition-opacity lg:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setIsMenuOpen(false)}
        />
        <div
          className={`fixed top-0 right-0 z-50 h-full w-full max-w-xs bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Menu</h2>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
              <X className="w-6 h-6 text-gray-600" />
            </Button>
          </div>
          <div className="flex flex-col p-4 space-y-4">
            <SearchModal />
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-base font-medium text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-md hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
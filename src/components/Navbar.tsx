import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Navbar: React.FC = () => {
  const { items } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
  const [searchQuery, setSearchQuery] = useState('');
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

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

  const navItems = [
    { name: 'Starlink', href: '/categoria/starlink' },
    { name: 'Macs', href: '/categoria/macs' },
    { name: 'iPhones', href: '/categoria/iphones' },
    { name: 'iPads', href: '/categoria/ipads' },
    { name: 'Acessórios', href: '/categoria/acessorios' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/busca?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false); // Fecha o menu mobile após a busca
    }
  };

  return (
    <header className={`sticky top-0 z-50 transition-transform duration-300 ${showNav ? 'translate-y-0' : '-translate-y-full'}`}>
      {/* Alterado para fundo branco sólido */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-gray-900">
                Logo
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link key={item.name} to={item.href} className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Search and Cart */}
            <div className="flex items-center justify-end space-x-2 sm:space-x-4">
              <form onSubmit={handleSearch} className="hidden sm:block relative">
                <Input
                  type="search"
                  placeholder="Buscar..."
                  className="pl-9 pr-4 h-10 w-32 sm:w-40 lg:w-56 bg-gray-100 rounded-full border-transparent focus:bg-white focus:border-gray-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </form>

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

              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(true)}>
                  <Menu className="w-6 h-6 text-gray-600" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
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
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Buscar produtos..."
                className="pl-10 pr-4 h-11 w-full bg-gray-100 rounded-md border-transparent focus:bg-white focus:border-gray-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </form>
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
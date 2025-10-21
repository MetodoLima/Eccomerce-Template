import { Toaster } from 'react-hot-toast';
import { TooltipProvider } from '@/components/ui/tooltip';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Index from './pages/Index';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import NotFound from './pages/NotFound';
import { CartProvider } from './contexts/CartContext';
import { CartPage } from './pages/CartPage';

const App = () => (
  <TooltipProvider>
    <Toaster position="top-right" />
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/carrinho" element={<CartPage />} />
            <Route path="/produto/:id" element={<ProductPage />} />
            <Route path="/categoria/:category" element={<CategoryPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </CartProvider>
  </TooltipProvider>
);

export default App;

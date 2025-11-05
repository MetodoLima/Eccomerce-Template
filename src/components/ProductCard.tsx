import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import toast from 'react-hot-toast';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, title, price, image_url, hover_image_url, sku } = product;
  const { addToCart } = useCart();

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Impede a navegação se o card estiver dentro de um Link
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <article className="flex w-60 sm:w-64 lg:w-72 h-full flex-col gap-4 sm:gap-5 shrink-0 shadow-soft hover:shadow-medium bg-surface-elevated p-4 sm:p-5 rounded-2xl transition-all duration-300 hover:scale-105 group">
      <div className="w-full flex flex-col flex-grow">
        <div className="aspect-square bg-surface-subtle mb-4 sm:mb-6 p-4 rounded-3xl overflow-hidden relative">
          {/* imagem padrão */}
          <img
            src={image_url}
            alt={title}
            className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-0"
          />
          {/* imagem hover (fallback para a mesma se não houver) */}
          <img
            src={hover_image_url || image_url}
            alt={title}
            className="absolute inset-0 w-full h-full object-contain transition-transform duration-300 transition-opacity group-hover:opacity-100 opacity-0 group-hover:scale-110"
          />
        </div>
        
        <div className="flex w-full justify-center items-center min-h-12 mb-2">
          <h3 className="text-foreground text-center text-lg sm:text-xl font-bold leading-tight line-clamp-2">
            {title}
          </h3>
        </div>

        <div className="text-center mb-4">
          <span className="text-xs text-gray-500">SKU: {sku}</span>
        </div>
        
        <div className="w-full text-center mt-auto mb-4">
          <p className="text-xl font-bold text-gray-900">{formattedPrice}</p>
          <div className="text-text-subtle text-xs font-semibold mt-1">
            no pix
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-2">
        <Button onClick={handleAddToCart} className="w-full">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Adicionar ao Carrinho
        </Button>
        <Link to={`/produto/${id}`} className="w-full">
          <Button variant="outline" className="w-full">Ver Detalhes</Button>
        </Link>
      </div>
    </article>
  );
};

export default ProductCard;

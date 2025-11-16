import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import toast from 'react-hot-toast';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const { id, title, price, original_price, image_url, hover_image_url } = product;
  const { addToCart } = useCart();

  const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

  const formattedPrice = formatCurrency(price);
  const formattedOriginalPrice = original_price ? formatCurrency(original_price) : null;
  const installmentPrice = formatCurrency((original_price || price) / 12);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Impede a navegação se o card estiver dentro de um Link
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <Link to={`/produto/${id}`} className={className}>
      <article className="flex flex-col w-full h-full gap-2 sm:gap-3 flex-shrink-0 shadow-md hover:shadow-lg bg-white p-2 sm:p-4 rounded-2xl transition-all duration-300 hover:scale-105 group">
      <div className="w-full flex flex-col flex-grow">
        <div className="aspect-square bg-gray-50 mb-2 sm:mb-3 p-4 sm:p-4 rounded-xl overflow-hidden relative">
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
        
        <div className="flex w-full justify-center items-center min-h-10 mb-1">
          <h3 className="text-foreground text-center text-xs sm:text-sm md:text-base font-medium leading-tight line-clamp-2">
            {title}
          </h3>
        </div>

        
        <div className="w-full text-center mt-auto mb-3 flex flex-col items-center">
          {formattedOriginalPrice && (
            <p className="text-sm text-gray-500 line-through">{formattedOriginalPrice}</p>
          )}
          <p className="text-base sm:text-lg md:text-xl font-bold text-gray-900">{formattedPrice}</p>
          <div className="text-text-subtle text-[10px] sm:text-xs font-semibold">
            no pix
          </div>
          <div className="text-text-subtle text-[10px] sm:text-xs font-semibold mt-0.5">
            ou 12x de {installmentPrice}
          </div>
        </div>
      </div>
      </article>
    </Link>
  );
};

export default ProductCard;

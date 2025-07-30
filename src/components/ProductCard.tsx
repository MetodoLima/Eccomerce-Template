import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react'; // Importando o ícone de estrela
import { Product } from '@/types';

// Usa uma versão parcial do tipo Product para as props, tornando a maioria opcional
interface ProductCardProps extends Partial<Product> {
  image: string; // Garante que a imagem seja sempre fornecida
  title: string; // Garante que o título seja sempre fornecido
  onBuy?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  rating,
  originalPrice,
  price,
  isNew,
  onBuy,
  id
}) => {

  const buttonStyles = "flex w-full h-12 sm:h-14 justify-center items-center bg-primary hover:bg-primary-hover text-primary-foreground font-semibold rounded-xl transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-primary/50 focus:outline-none";

    const renderBuyButton = () => {
    // O botão "Comprar" no card sempre leva para a página de detalhes do produto.
    if (id) {
      return (
        <Link to={`/produto/${id}`} className={buttonStyles}>
          Comprar
        </Link>
      );
    }
    return null; // Não renderiza o botão se não houver ID
  };

  return (
    <article className="flex w-60 sm:w-64 lg:w-72 h-full flex-col gap-4 sm:gap-5 shrink-0 shadow-soft hover:shadow-medium bg-surface-elevated p-4 sm:p-5 rounded-2xl transition-all duration-300 hover:scale-105 group">
      <div className="w-full flex flex-col flex-grow">
        <div className="aspect-square flex justify-center items-center bg-surface-subtle mb-4 sm:mb-6 p-4 rounded-3xl overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        
        <div className="flex w-full justify-center items-center min-h-12 mb-4 sm:mb-6">
          <h3 className="text-foreground text-center text-lg sm:text-xl font-bold leading-tight line-clamp-2">
            {title}
          </h3>
        </div>
        
        {rating && rating.count > 0 && (
          <div className="flex justify-center items-center gap-1 w-full mb-4">
            {rating && rating.rate > 0 && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-semibold">{rating.rate}</span>
                <span className="text-sm text-gray-500">({rating.count})</span>
              </div>
            )}
          </div>
        )}
        
        <div className="w-full relative mb-4 sm:mb-6 text-center mt-auto">
          {originalPrice && (
            <div className="text-text-subtle text-sm font-semibold line-through mb-1">
              {originalPrice}
            </div>
          )}
          <p className="text-xl font-bold text-gray-900">R$ {price}</p>
          <div className="text-text-subtle text-xs font-semibold mt-1">
            no pix
          </div>
        </div>
      </div>
      
      {renderBuyButton()}
    </article>
  );
};

export default ProductCard;

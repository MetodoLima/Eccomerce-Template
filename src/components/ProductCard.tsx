import React from 'react';

interface ProductCardProps {
  image: string;
  title: string;
  rating?: {
    stars: number;
    count: number;
  };
  originalPrice?: string;
  currentPrice: string;
  onBuy?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  rating,
  originalPrice,
  currentPrice,
  onBuy
}) => {
  const handleBuyClick = () => {
    if (onBuy) {
      onBuy();
    } else {
      console.log(`Buying ${title}`);
    }
  };

  return (
    <article className="flex w-60 sm:w-64 lg:w-72 flex-col gap-4 sm:gap-5 shrink-0 shadow-soft hover:shadow-medium bg-surface-elevated p-4 sm:p-5 rounded-2xl transition-all duration-300 hover:scale-105 group">
      <div className="w-full flex flex-col">
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
            <div className="flex">
              {Array.from({ length: 5 }).map((_, index) => (
                <span
                  key={index}
                  className={`text-accent text-sm ${
                    index < rating.stars ? 'opacity-100' : 'opacity-30'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-accent text-xs font-medium ml-1">
              ({rating.count})
            </span>
          </div>
        )}
        
        <div className="w-full relative mb-4 sm:mb-6 text-center">
          {originalPrice && (
            <div className="text-text-subtle text-sm font-semibold line-through mb-1">
              {originalPrice}
            </div>
          )}
          <div className="text-foreground text-xl sm:text-2xl font-bold">
            {currentPrice}
          </div>
          <div className="text-text-subtle text-xs font-semibold mt-1">
            no pix
          </div>
        </div>
      </div>
      
      <button
        onClick={handleBuyClick}
        className="flex w-full h-12 sm:h-14 justify-center items-center bg-primary hover:bg-primary-hover text-primary-foreground font-semibold rounded-xl transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-primary/50 focus:outline-none"
      >
        Comprar
      </button>
    </article>
  );
};

export default ProductCard;

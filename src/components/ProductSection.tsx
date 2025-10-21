import React, { useRef } from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types';



interface ProductSectionProps {
  title: string;
  products: Product[];
  hasVerticalBanner?: boolean;
  bannerImage?: string;
}

const ProductSection: React.FC<ProductSectionProps> = ({
  title,
  products,
  hasVerticalBanner = false,
  bannerImage
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full max-w-[1140px] relative mx-auto my-[60px] px-5 py-0 max-sm:px-2.5 max-sm:py-0">
      <h2 className="text-black text-xl font-bold leading-6 uppercase mb-6 max-sm:text-lg max-sm:mb-5">
        {title}
      </h2>
      
      {hasVerticalBanner && bannerImage && (
        <div className="absolute w-[165px] left-0 top-[60px] max-md:hidden">
          <img
            src={bannerImage}
            alt="Banner vertical"
            className="w-[165px] h-[543px]"
          />
        </div>
      )}
      
      <div className="w-full relative">
        <div 
          ref={scrollRef}
          className={`flex gap-5 overflow-x-auto pb-5 hide-scrollbar max-md:gap-[15px] max-sm:gap-2.5 max-sm:px-5 max-sm:py-0 ${
            hasVerticalBanner ? 'ml-[200px] max-md:ml-0' : 'px-10 max-sm:px-5'
          }`}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <button
          onClick={scrollLeft}
          className={`flex w-[30px] h-[30px] justify-center items-center absolute -translate-y-2/4 cursor-pointer bg-[#3466F6] rounded-[50px] top-2/4 hover:bg-[#2855e6] transition-colors ${
            hasVerticalBanner ? 'left-[200px] max-md:left-0' : 'left-0'
          }`}
          aria-label="Scroll products left"
        >
          <svg width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width: '11px', height: '16px', fill: 'white'}}>
            <path d="M10.9388 2.79687L6.19768 7.53795L10.9388 12.279C11.0519 12.3921 11.1084 12.526 11.1084 12.6808C11.1084 12.8356 11.0519 12.9695 10.9388 13.0826L9.45661 14.5647C9.34352 14.6778 9.20959 14.7344 9.05483 14.7344C8.90007 14.7344 8.76614 14.6778 8.65304 14.5647L2.02804 7.93973C1.91495 7.82664 1.8584 7.69271 1.8584 7.53795C1.8584 7.38318 1.91495 7.24926 2.02804 7.13616L8.65304 0.51116C8.76614 0.398065 8.90007 0.341517 9.05483 0.341517C9.20959 0.341517 9.34352 0.398065 9.45661 0.51116L10.9388 1.9933C11.0519 2.1064 11.1084 2.24033 11.1084 2.39509C11.1084 2.54985 11.0519 2.68378 10.9388 2.79687Z" fill="white"/>
          </svg>
        </button>
        
        <button
          onClick={scrollRight}
          className="flex w-[30px] h-[30px] justify-center items-center absolute -translate-y-2/4 cursor-pointer bg-[#3466F6] rounded-[50px] right-0 top-2/4 hover:bg-[#2855e6] transition-colors"
          aria-label="Scroll products right"
        >
          <svg width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width: '11px', height: '16px', fill: 'white'}}>
            <path d="M10.3675 7.93973L3.74247 14.5647C3.62937 14.6778 3.49544 14.7344 3.34068 14.7344C3.18592 14.7344 3.05199 14.6778 2.9389 14.5647L1.45675 13.0826C1.34366 12.9695 1.28711 12.8356 1.28711 12.6808C1.28711 12.526 1.34366 12.3921 1.45675 12.279L6.19782 7.53795L1.45675 2.79687C1.34366 2.68378 1.28711 2.54985 1.28711 2.39509C1.28711 2.24033 1.34366 2.1064 1.45675 1.9933L2.9389 0.51116C3.05199 0.398065 3.18592 0.341517 3.34068 0.341517C3.49544 0.341517 3.62937 0.398065 3.74247 0.51116L10.3675 7.13616C10.4806 7.24926 10.5371 7.38318 10.5371 7.53795C10.5371 7.69271 10.4806 7.82664 10.3675 7.93973Z" fill="white"/>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default ProductSection;

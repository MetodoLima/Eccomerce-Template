import React, { useRef } from 'react';

interface Category {
  name: string;
  image: string;
}

const CategorySection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const categories: Category[] = [
    {
      name: 'Starlink',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/2ca0464408be9a9676553da33873cea78af34dc1?width=440'
    },
    {
      name: 'Macs',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/eaea2f06faeab84377b4cab90310cd302d8940ab?width=440'
    },
    {
      name: 'iPhones',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/156da650df89e98c77fd877f9456e703a728d621?width=440'
    },
    {
      name: 'iPads',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/30b36b0654dbd664aa61e0b13c31a8a83ea04819?width=440'
    },
    {
      name: 'Watchs',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/0444e4ac49dbe37615eb72b0358fa7d7d640abe7?width=440'
    },
    {
      name: 'Câmeras',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/bb84b37e26639b393b0c20eb8f96b06a7f6474da?width=440'
    },
    {
      name: 'AirPods',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/354cd22a1c3769d5bcb15041cd6198bcb15a0c30?width=440'
    },
    {
      name: 'Acessórios',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/e9ac0b8365b847d43364958f0a190dc89264bb63?width=440'
    },
    {
      name: 'Seminovos',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/295bc24ae9694cbec45ba422bcbc72ab1f6ca599?width=440'
    }
  ];

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-6 sm:py-8 lg:py-12">
      <div 
        ref={scrollRef}
        className="flex gap-4 sm:gap-6 lg:gap-8 justify-start items-center overflow-x-auto px-4 sm:px-6 lg:px-8 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category, index) => (
          <article key={index} className="flex flex-col items-center shrink-0">
            <a href="#" className="group">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 overflow-hidden rounded-full shadow-soft hover:shadow-medium transition-all duration-300 group-hover:scale-105">
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm lg:text-base font-medium text-foreground text-center">
                {category.name}
              </p>
            </a>
          </article>
        ))}
      </div>
      
      <div className="flex justify-between absolute inset-y-0 w-full pointer-events-none px-2 sm:px-4">
        <button
          onClick={scrollLeft}
          className="flex w-8 h-8 sm:w-10 sm:h-10 justify-center items-center my-auto bg-primary hover:bg-primary-hover rounded-full pointer-events-auto transition-all duration-300 shadow-soft hover:shadow-medium opacity-80 hover:opacity-100"
          aria-label="Scroll categories left"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        
        <button
          onClick={scrollRight}
          className="flex w-8 h-8 sm:w-10 sm:h-10 justify-center items-center my-auto bg-primary hover:bg-primary-hover rounded-full pointer-events-auto transition-all duration-300 shadow-soft hover:shadow-medium opacity-80 hover:opacity-100"
          aria-label="Scroll categories right"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default CategorySection;

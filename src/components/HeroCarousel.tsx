import React, { useState, useEffect } from 'react';

const slides = [
  {
    image: "/Figures/Capa 1-EccomerceIphone.svg",
    mobileImage: "/Figures/BannerMobileJoias1.svg",
    alt: "iPad Air M3"
  },
  {
    image: "/Figures/Capa2-EccomerceIphone.svg",
    mobileImage: "/Figures/BannerMobileJoias2.svg",
    alt: "iPhone 16 Pro Max"
  }
];

const HeroCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const totalSlides = slides.length;

  const trackSlides = [...slides, slides[0]]; // clone do primeiro para loop suave

  const nextSlide = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    // Mantém funcionalidade de voltar manualmente
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index % totalSlides);
  };

  // Auto-play: avança sempre da direita para a esquerda (incrementando o índice)
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 8000);
    return () => clearInterval(id);
  }, [totalSlides]);

  // Ao chegar no slide clonado, remover transição, resetar para 0 e reativar transição
  const handleTransitionEnd = () => {
    if (currentIndex === totalSlides) {
      setIsTransitioning(false);
      setCurrentIndex(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsTransitioning(true));
      });
    }
  };

  return (
    <section className="w-full relative">
      <div className="flex justify-center items-start gap-2 sm:gap-3 absolute left-1/2 transform -translate-x-1/2 bottom-4 z-10">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5 rounded-full border-2 border-primary transition-all duration-300 ${
              currentIndex === index ? 'bg-primary scale-110' : 'bg-transparent hover:bg-primary/30'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      <div className="w-full relative overflow-hidden max-h-[85vh] lg:max-h-full">
        <div
          className="flex"
          style={{
            transform: `translateX(-${(currentIndex % (totalSlides + 1)) * 100}%)`,
            transition: isTransitioning ? 'transform 500ms ease-out' : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {trackSlides.map((slide, index) => (
            <div key={index} className="min-w-full">
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-auto object-contain hidden md:block"
              />
              <img
                src={slide.mobileImage}
                alt={slide.alt}
                className="w-full h-auto object-contain block md:hidden"
              />
            </div>
          ))}
        </div>
      </div>
      
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-60 hover:opacity-100 transition-all duration-300 md:opacity-0 md:group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-60 hover:opacity-100 transition-all duration-300 md:opacity-0 md:group-hover:opacity-100"
        aria-label="Next slide"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>
    </section>
  );
};

export default HeroCarousel;

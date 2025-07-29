import React, { useState } from 'react';

const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 9;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="w-full max-w-7xl h-64 sm:h-80 lg:h-[427px] relative mt-6 sm:mt-8 lg:mt-12 mx-auto px-4 sm:px-6">
      <div className="flex justify-center items-start gap-2 sm:gap-3 absolute left-1/2 transform -translate-x-1/2 bottom-4 z-10">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5 rounded-full border-2 border-primary transition-all duration-300 ${
              currentSlide === index ? 'bg-primary scale-110' : 'bg-transparent hover:bg-primary/30'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      <div className="w-full h-full relative overflow-hidden rounded-xl lg:rounded-2xl shadow-medium">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/f29fedf509458b35a43549f78a308870c4eb3fbb?width=2220"
          alt="iPad Air M3"
          className="w-full h-full object-cover"
        />
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

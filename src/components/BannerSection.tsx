import React from 'react';

interface BannerSectionProps {
  images: string[];
  className?: string;
}

const BannerSection: React.FC<BannerSectionProps> = ({ images, className = "" }) => {
  return (
    <section className={`flex gap-5 max-md:flex-col max-md:gap-[15px] max-sm:gap-2.5 ${className}`}>
      {images.map((image, index) => (
        <div key={index} className="flex-1">
          <img
            src={image}
            alt={`Banner ${index + 1}`}
            className="w-full h-[329px] rounded-lg max-md:h-[250px] max-sm:h-[200px] object-cover"
          />
        </div>
      ))}
    </section>
  );
};

export default BannerSection;

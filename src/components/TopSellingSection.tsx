import React from 'react';

interface TopSellingItem {
  id: string;
  image: string;
  price?: string;
  alt: string;
}

const TopSellingSection: React.FC = () => {
  const topSellingItems: TopSellingItem[] = [
    {
      id: '1',
      image: 'https://placehold.co/150x150/ff6b6b/ff6b6b',
      alt: 'Instagram'
    },
    {
      id: '2',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/0357f22904a329ce22a933a0742af8a8455dbc75?width=400',
      price: 'R$ 1.499,00',
      alt: 'Apple AirPods Pro 2° Geração - USB-C'
    },
    {
      id: '3',
      image: 'https://placehold.co/150x150/4ecdc4/4ecdc4',
      price: 'R$ 179,00',
      alt: 'Computador'
    },
    {
      id: '4',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/cbc8b262f3504b4d74738367280f45536961bca0?width=428',
      price: 'R$ 1.599,00',
      alt: 'Watch SE 44mm GPS 2° Geração Pulseira Loop'
    }
  ];

  return (
    <section className="mx-0 my-10">
      <h2 className="text-base font-bold text-black text-center mb-5">
        OS MAIS VENDIDOS
      </h2>
      <div className="flex gap-5 justify-center flex-wrap max-sm:gap-[15px]">
        {topSellingItems.map((item) => (
          <article key={item.id} className="flex flex-col items-center w-[150px] max-sm:w-[120px]">
            <img
              src={item.image}
              alt={item.alt}
              className="w-[150px] h-[150px] object-contain mb-2.5 rounded-lg max-sm:w-[120px] max-sm:h-[120px]"
            />
            {item.price && (
              <div className="text-sm font-bold text-[#222]">{item.price}</div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

export default TopSellingSection;

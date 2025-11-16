import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const items = [
  { icon: '🚚', title: 'Frete Grátis', desc: 'Frete grátis para todo o Brasil!' },
  { icon: '💳', title: 'Pagamento Facilitado', desc: 'Parcele suas compras em até 12x no cartão' },
  { icon: '🛡️', title: 'Pagamento Seguro', desc: 'Ambiente seguro para compras online' },
  { icon: '🎧', title: 'Suporte', desc: 'Atendimento de Seg a Sex das 08h às 18h' },
];

const InfoFeatures: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = current.offsetWidth;
      current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };
  return (
    <section className="w-full max-w-[1140px] mx-auto px-5 max-sm:px-3 py-10 relative">
      <div ref={scrollRef} className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar lg:grid lg:grid-cols-4 lg:gap-8">
        {items.map((it) => (
          <div key={it.title} className="flex flex-col items-center gap-2 w-full flex-shrink-0 snap-center text-center p-4 lg:p-0">
            <div className="text-3xl">{it.icon}</div>
            <h3 className="font-medium">{it.title}</h3>
            <p className="text-sm text-muted-foreground max-w-[220px]">{it.desc}</p>
          </div>
        ))}
      </div>
      <div className="lg:hidden absolute top-1/2 -translate-y-1/2 left-0 right-0 max-w-[1140px] mx-auto flex justify-between px-6 sm:px-8">
        <button onClick={() => scroll('left')} className="bg-background rounded-full p-1 shadow-md">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={() => scroll('right')} className="bg-background rounded-full p-1 shadow-md">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default InfoFeatures;

import React from 'react';

const items = [
  { icon: '🚚', title: 'Frete Grátis', desc: 'Frete grátis para todo o Brasil!' },
  { icon: '💳', title: 'Pagamento Facilitado', desc: 'Parcele suas compras em até 12x no cartão' },
  { icon: '🛡️', title: 'Pagamento Seguro', desc: 'Ambiente seguro para compras online' },
  { icon: '🎧', title: 'Suporte', desc: 'Atendimento de Seg a Sex das 08h às 18h' },
];

const InfoFeatures: React.FC = () => {
  return (
    <section className="w-full max-w-[1140px] mx-auto px-5 max-sm:px-3 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {items.map((it) => (
          <div key={it.title} className="flex flex-col items-center gap-2">
            <div className="text-3xl">{it.icon}</div>
            <h3 className="font-medium">{it.title}</h3>
            <p className="text-sm text-muted-foreground max-w-[220px]">{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InfoFeatures;

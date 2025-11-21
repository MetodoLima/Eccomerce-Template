import React, { useEffect, useState } from 'react';

const messages = [
  'PARCELE SUAS COMPRAS EM ATÉ 12X',
  'BEM VINDO A NOSSA LOJA!',
  'FRETE GRÁTIS PARA TODO O BRASIL',
];

const AnnouncementBar: React.FC = () => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);
  const repeatCount = 2;
  const seq = Array(repeatCount).fill(messages).flat();
  return (
    <div className="w-full bg-black text-white overflow-hidden">
      <div className="marquee" data-ready={ready ? 'true' : undefined}>
        <div className="marquee-track">
          <div className="marquee-seq">
            {seq.map((msg, i) => (
              <React.Fragment key={`m1-${i}`}>
                <span className="whitespace-nowrap text-sm sm:text-base font-montserrat font-semibold tracking-wide uppercase">
                  {msg}
                </span>
                <span aria-hidden className="px-8 text-white/70">•</span>
              </React.Fragment>
            ))}
          </div>
          <div className="marquee-seq" aria-hidden="true">
            {seq.map((msg, i) => (
              <React.Fragment key={`m2-${i}`}>
                <span className="whitespace-nowrap text-sm sm:text-base font-montserrat font-semibold tracking-wide uppercase">
                  {msg}
                </span>
                <span aria-hidden className="px-8 text-white/70">•</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;

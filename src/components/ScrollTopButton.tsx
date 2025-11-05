import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      setVisible(y > 10);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
      className={`fixed right-6 bottom-6 z-[70] h-12 w-12 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 active:scale-95 transition transform ${
        visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      } flex items-center justify-center`}
    >
      <ArrowUp className="h-6 w-6" />
    </button>
  );
};

export default ScrollTopButton;

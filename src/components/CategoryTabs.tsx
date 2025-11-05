import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { products as allProducts } from '@/data/products';

const CATEGORIES = [
  { key: 'iphones', label: 'iPhones' },
  { key: 'macs', label: 'Macs' },
  { key: 'watchs', label: 'Watchs' },
] as const;

const CategoryTabs: React.FC = () => {
  const [active, setActive] = useState<typeof CATEGORIES[number]['key']>(CATEGORIES[0].key);

  const filtered = useMemo(() => {
    return allProducts.filter(p => p.category === active);
  }, [active]);

  return (
    <section className="w-full max-w-[1140px] mx-auto px-5 max-sm:px-3 py-8">
      <h2 className="text-center text-2xl font-semibold mb-4">Nossas Coleções</h2>
      <div className="flex justify-center gap-4 border-b mb-6 overflow-x-auto">
        {CATEGORIES.map(c => (
          <button
            key={c.key}
            onClick={() => setActive(c.key)}
            className={`px-3 py-2 text-sm whitespace-nowrap transition-colors ${active === c.key ? 'text-foreground border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="relative">
        <div className="flex gap-5 overflow-x-auto pb-4 hide-scrollbar">
          {filtered.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryTabs;

import React, { useEffect, useMemo, useState } from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types';
import { ProductService } from '@/services/ProductService';

const CATEGORIES = [
  { key: 'iphones', label: 'iPhones' },
  { key: 'macs', label: 'Macs' },
  { key: 'watchs', label: 'Watchs' },
] as const;

const CategoryTabs: React.FC = () => {
  const [active, setActive] = useState<typeof CATEGORIES[number]['key']>(CATEGORIES[0].key);
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let activeFlag = true;
    const run = async () => {
      setLoading(true);
      const { data } = await ProductService.getByCategory(active);
      if (!activeFlag) return;
      setItems((data || []).slice(0, 12));
      setLoading(false);
    };
    run();
    return () => { activeFlag = false; };
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
          {loading ? (
            <div className="py-6 px-3 text-sm text-muted-foreground">Carregando...</div>
          ) : (
            items.map(prod => (
              <ProductCard key={prod.id} product={prod} className="w-[calc(50%-10px)] sm:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] flex-shrink-0" />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoryTabs;

import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const normalize = (s: string) => s.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');

const SearchPage: React.FC = () => {
  const [params] = useSearchParams();
  const q = params.get('q')?.trim() || '';

  const results = useMemo(() => {
    if (!q) return [] as typeof products;
    const nq = normalize(q);
    return products.filter(p => {
      const inTitle = normalize(p.title).includes(nq);
      const inSku = normalize(p.sku).includes(nq);
      const inCategory = normalize(p.category).includes(nq);
      return inTitle || inSku || inCategory;
    });
  }, [q]);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" />
            Voltar para a Home
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Busca</h1>
          {q && (
            <p className="text-sm text-muted-foreground mt-1">Resultados para: <span className="font-medium text-foreground">"{q}"</span></p>
          )}
        </div>

        {!q ? (
          <p className="text-sm text-muted-foreground">Digite um termo na busca para encontrar produtos.</p>
        ) : results.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg font-medium text-gray-900">Nenhum produto encontrado.</p>
            <p className="text-sm text-gray-500 mt-1">Tente buscar por outro termo (ex.: nome, SKU ou categoria).</p>
            <div className="mt-6">
              <Link to="/">
                <Button variant="outline">Ver destaques</Button>
              </Link>
            </div>
          </div>
        ) : (
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {results.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default SearchPage;

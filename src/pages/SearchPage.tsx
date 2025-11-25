import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Product } from '@/types';
import { ProductService } from '@/services/ProductService';

const normalize = (s: string) => s.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');

const SearchPage: React.FC = () => {
  const [params] = useSearchParams();
  const q = params.get('q')?.trim() || '';

  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const run = async () => {
      if (!q) {
        setResults([]);
        return;
      }
      setLoading(true);
      setError(null);
      const { data, error } = await ProductService.search(q);
      if (!active) return;
      if (error) {
        setError('Erro ao buscar produtos');
        setResults([]);
      } else {
        setResults(data || []);
      }
      setLoading(false);
    };
    run();
    return () => { active = false; };
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
        ) : loading ? (
          <p className="text-sm text-muted-foreground">Carregando...</p>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-lg font-medium text-gray-900">{error}</p>
          </div>
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

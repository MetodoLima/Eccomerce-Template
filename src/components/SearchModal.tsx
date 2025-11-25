import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Dialog, DialogTopContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, X } from 'lucide-react';
import { Product } from '@/types';
import { ProductService } from '@/services/ProductService';

const normalize = (s: string) => s.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');

export const SearchModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const [categories, setCategories] = useState<string[]>([]);
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    const run = async () => {
      const { data } = await ProductService.getCategories();
      if (!active) return;
      setCategories(data || []);
    };
    run();
    return () => { active = false; };
  }, []);

  const categoryMatches = useMemo(() => {
    if (!q) return categories.slice(0, 5);
    const nq = normalize(q);
    return categories.filter(c => normalize(c).includes(nq)).slice(0, 5);
  }, [q, categories]);

  useEffect(() => {
    let active = true;
    const run = async () => {
      if (!q) { setResults([]); return; }
      setLoading(true);
      const { data } = await ProductService.search(q, 6);
      if (!active) return;
      setResults(data || []);
      setLoading(false);
    };
    run();
    return () => { active = false; };
  }, [q]);

  useEffect(() => {
    if (open) {
      // focus no input quando abrir
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setQ('');
    }
  }, [open]);

  const submitSearch = () => {
    const term = q.trim();
    if (!term) return;
    setOpen(false);
    navigate(`/busca?q=${encodeURIComponent(term)}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Abrir busca">
          <Search className="w-5 h-5" />
        </Button>
      </DialogTrigger>

      <DialogTopContent className="sm:max-w-3xl p-0 overflow-hidden">
        {/* Campo de busca */}
        <div className="pt-8 pb-2 px-2 sm:pt-10 sm:pb-3 sm:px-3 border-b bg-background">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Pesquisar"
              className="pl-9 pr-10 h-12 rounded-md"
              onKeyDown={(e) => {
                if (e.key === 'Enter') submitSearch();
              }}
            />
            {q && (
              <button
                aria-label="Limpar"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setQ('')}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Conteúdo sugestões e resultados */}
        <div className="p-3 sm:p-4 bg-background">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Sugestões */}
            <div className="sm:col-span-1">
              <div className="text-sm font-semibold text-muted-foreground px-2 mb-2">SUGESTÕES</div>
              <ul className="divide-y rounded-md border">
                {categoryMatches.length === 0 ? (
                  <li className="px-3 py-2 text-sm text-muted-foreground">Sem sugestões</li>
                ) : (
                  categoryMatches.map((c) => (
                    <li key={c} className="px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors">
                      <Link to={`/categoria/${c}`} onClick={() => setOpen(false)} className="block capitalize">
                        {c}
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </div>

            {/* Produtos */}
            <div className="sm:col-span-2">
              <div className="text-sm font-semibold text-muted-foreground px-2 mb-2">PRODUTOS</div>
              {q && loading ? (
                <div className="px-3 py-6 text-sm text-muted-foreground border rounded-md">Carregando...</div>
              ) : q && results.length === 0 ? (
                <div className="px-3 py-6 text-sm text-muted-foreground border rounded-md">Nenhum produto encontrado.</div>
              ) : (
                <ul className="divide-y rounded-md border">
                  {results.map((p) => (
                    <li key={p.id}>
                      <Link
                        to={`/produto/${p.id}`}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 p-3 hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        <div className="w-12 h-12 rounded-md bg-surface-subtle flex items-center justify-center overflow-hidden">
                          <img src={p.image_url} alt={p.title} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{p.title}</div>
                          <div className="text-xs text-muted-foreground truncate">SKU: {p.sku}</div>
                        </div>
                        <div className="text-sm font-semibold whitespace-nowrap">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.price)}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* CTA pesquisar termo */}
        <div className="px-3 sm:px-4 py-3 border-t bg-muted/30 flex justify-between items-center">
          <div className="text-sm text-muted-foreground">Pesquisar "{q || ''}"</div>
          <Button onClick={submitSearch} disabled={!q.trim()} className="gap-2">
            Ir <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </DialogTopContent>
    </Dialog>
  );
}; 

export default SearchModal;

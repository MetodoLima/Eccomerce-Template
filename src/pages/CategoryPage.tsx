import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ProductCard from '@/components/ProductCard';
import { products as allProducts } from '@/data/products';

const getCategoryName = (category: string) => {
  const names = {
    iphones: 'iPhones',
    airpods: 'AirPods', 
    acessorios: 'Acessórios',
    macs: 'Macs',
    ipads: 'iPads',
    watchs: 'Apple Watch',
    cameras: 'Câmeras',
    starlink: 'Starlink',
    seminovos: 'Seminovos'
  };
  
  return names[category as keyof typeof names] || category;
};

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [availability, setAvailability] = useState<'all' | 'in'>('all');
  const [priceRange, setPriceRange] = useState<'all' | 'low' | 'mid' | 'high'>('all');

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Categoria não encontrada</h1>
          <Link to="/">
            <Button>Voltar à loja</Button>
          </Link>
        </div>
      </div>
    );
  }

  const categoryName = getCategoryName(category);
  const categoryImages: Record<string, string> = {
    iphones: 'https://api.builder.io/api/v1/image/assets/TEMP/156da650df89e98c77fd877f9456e703a728d621?width=1200',
    airpods: 'https://api.builder.io/api/v1/image/assets/TEMP/354cd22a1c3769d5bcb15041cd6198bcb15a0c30?width=1200',
    acessorios: 'https://api.builder.io/api/v1/image/assets/TEMP/e9ac0b8365b847d43364958f0a190dc89264bb63?width=1200',
    macs: 'https://api.builder.io/api/v1/image/assets/TEMP/eaea2f06faeab84377b4cab90310cd302d8940ab?width=1200',
    ipads: 'https://api.builder.io/api/v1/image/assets/TEMP/30b36b0654dbd664aa61e0b13c31a8a83ea04819?width=1200',
    watchs: 'https://api.builder.io/api/v1/image/assets/TEMP/0444e4ac49dbe37615eb72b0358fa7d7d640abe7?width=1200',
    cameras: 'https://api.builder.io/api/v1/image/assets/TEMP/bb84b37e26639b393b0c20eb8f96b06a7f6474da?width=1200',
    starlink: 'https://api.builder.io/api/v1/image/assets/TEMP/2ca0464408be9a9676553da33873cea78af34dc1?width=1200',
    seminovos: 'https://api.builder.io/api/v1/image/assets/TEMP/295bc24ae9694cbec45ba422bcbc72ab1f6ca599?width=1200',
  };

  const baseProducts = useMemo(() => allProducts.filter(p => p.category.toLowerCase() === category.toLowerCase()), [category]);

  const filteredProducts = useMemo(() => {
    let list = [...baseProducts];
    // availability: all products are in stock in current dataset, so only apply if needed in future
    if (priceRange !== 'all') {
      list = list.filter(p => {
        if (priceRange === 'low') return p.price <= 2500;
        if (priceRange === 'mid') return p.price > 2500 && p.price <= 6000;
        return p.price > 6000; // high
      });
    }
    // sort
    switch (sortBy) {
      case 'price-low':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }
    return list;
  }, [baseProducts, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground">{categoryName}</span>
        </nav>

        {/* Back button */}
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
          </Link>
        </div>

        {/* Category visual header */}
        <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">{categoryName}</h1>
            <p className="text-muted-foreground">
              {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden bg-gradient-primary">
            <div className="aspect-[16/6] sm:aspect-[16/5] w-full">
              <img
                src={categoryImages[category.toLowerCase()] || 'https://via.placeholder.com/1200x400'}
                alt={`Banner da categoria ${categoryName}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Filters and controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center flex-wrap gap-3 sm:gap-4">
            <span className="text-sm text-muted-foreground">Filtrar:</span>
            <Select value={availability} onValueChange={(v: 'all' | 'in') => setAvailability(v)}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Disponibilidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="in">Em estoque</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={(v: 'all' | 'low' | 'mid' | 'high') => setPriceRange(v)}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Preço" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="low">Até R$ 2.500</SelectItem>
                <SelectItem value="mid">R$ 2.500 – R$ 6.000</SelectItem>
                <SelectItem value="high">Acima de R$ 6.000</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">Ordenar por:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Mais vendidos</SelectItem>
                <SelectItem value="price-low">Menor preço</SelectItem>
                <SelectItem value="price-high">Maior preço</SelectItem>
                <SelectItem value="name">Nome A-Z</SelectItem>
              </SelectContent>
            </Select>

            <div className="hidden sm:block text-sm text-muted-foreground">
              {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products grid */}
        {filteredProducts.length > 0 ? (
          <div className={`grid gap-4 sm:gap-5 ${
            viewMode === 'grid' 
              ? 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-muted-foreground mb-6">
              Não encontramos produtos nesta categoria no momento.
            </p>
            <Link to="/">
              <Button>Voltar à loja</Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default CategoryPage;
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Mock products data
const getCategoryProducts = (category: string) => {
  const allProducts = {
    iphones: [
      {
        id: '4',
        image: 'https://api.builder.io/api/v1/image/assets/TEMP/75c78a6443119fe0219f6af2bd9a34c7460ab271?width=428',
        title: 'iPhone 16 Pro Max 256GB',
        rating: { stars: 5, count: 30 },
        currentPrice: 'R$ 6.999,00'
      },
      {
        id: '5',
        image: 'https://api.builder.io/api/v1/image/assets/TEMP/75c78a6443119fe0219f6af2bd9a34c7460ab271?width=428',
        title: 'iPhone 16 Pro 128GB',
        rating: { stars: 5, count: 15 },
        currentPrice: 'R$ 5.999,00'
      }
    ],
    airpods: [
      {
        id: '2',
        image: 'https://api.builder.io/api/v1/image/assets/TEMP/0357f22904a329ce22a933a0742af8a8455dbc75?width=400',
        title: 'Apple AirPods Pro 2° Geração - USB-C',
        rating: { stars: 5, count: 110 },
        originalPrice: 'R$ 1.599,00',
        currentPrice: 'R$ 1.499,00'
      }
    ],
    acessorios: [
      {
        id: '1',
        image: 'https://api.builder.io/api/v1/image/assets/TEMP/cf4bbbd0fe128753a13fe6d9116d7ea7c6509247?width=400',
        title: 'AirTag : Pacote com 4 unidades',
        rating: { stars: 5, count: 28 },
        originalPrice: 'R$ 649,00',
        currentPrice: 'R$ 609,00'
      },
      {
        id: '3',
        image: 'https://api.builder.io/api/v1/image/assets/TEMP/40d165e9bbf0d0a5846ddcde88cbbb55766cf6a5?width=400',
        title: 'Apple Pencil (USB-C)',
        rating: { stars: 5, count: 11 },
        originalPrice: 'R$ 699,00',
        currentPrice: 'R$ 649,00'
      }
    ],
    macs: [
      {
        id: '6',
        image: 'https://api.builder.io/api/v1/image/assets/TEMP/8a3871dd26b4bf679804327d522477f1c6530126?width=428',
        title: 'Mac Mini M4, 16GB de Ram, 256GB SSD',
        rating: { stars: 5, count: 46 },
        currentPrice: 'R$ 5.199,00'
      }
    ]
  };

  return allProducts[category as keyof typeof allProducts] || [];
};

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

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Categoria não encontrada</h1>
          <Link to="/">
            <Button>Voltar à loja</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const products = getCategoryProducts(category);
  const categoryName = getCategoryName(category);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
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

        {/* Category header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{categoryName}</h1>
          <p className="text-muted-foreground">
            {products.length} produto{products.length !== 1 ? 's' : ''} encontrado{products.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Filters and controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filtros
            </Button>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevância</SelectItem>
                <SelectItem value="price-low">Menor preço</SelectItem>
                <SelectItem value="price-high">Maior preço</SelectItem>
                <SelectItem value="name">Nome A-Z</SelectItem>
                <SelectItem value="rating">Avaliação</SelectItem>
              </SelectContent>
            </Select>
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

        {/* Products grid */}
        {products.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {products.map((product) => (
              <Link key={product.id} to={`/produto/${product.id}`}>
                <ProductCard
                  image={product.image}
                  title={product.title}
                  rating={product.rating}
                  originalPrice={'originalPrice' in product ? product.originalPrice as string : undefined}
                  currentPrice={product.currentPrice}
                />
              </Link>
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

      <Footer />
    </div>
  );
};

export default CategoryPage;
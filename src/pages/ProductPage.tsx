import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Star, ShoppingCart, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Mock product data - in a real app, this would come from an API
const getProductById = (id: string) => {
  const products = {
    '1': {
      id: '1',
      title: 'AirTag : Pacote com 4 unidades',
      images: [
        'https://api.builder.io/api/v1/image/assets/TEMP/cf4bbbd0fe128753a13fe6d9116d7ea7c6509247?width=800',
        'https://api.builder.io/api/v1/image/assets/TEMP/cf4bbbd0fe128753a13fe6d9116d7ea7c6509247?width=800',
        'https://api.builder.io/api/v1/image/assets/TEMP/cf4bbbd0fe128753a13fe6d9116d7ea7c6509247?width=800'
      ],
      rating: { stars: 5, count: 28 },
      originalPrice: 'R$ 649,00',
      currentPrice: 'R$ 609,00',
      discount: '6%',
      description: 'O AirTag é uma forma fácil de rastrear seus objetos. Prenda um no suas chaves, enfie outro na mochila. E eles vão aparecer no app Buscar, que você já usa para localizar seus amigos e dispositivos.',
      features: [
        'Rastreamento preciso com tecnologia Ultra Wideband',
        'Som alto para encontrar objetos próximos',
        'Bateria que dura mais de um ano',
        'Resistente à água (IP67)',
        'Privacidade integrada'
      ],
      specifications: {
        'Dimensões': '31,9 × 31,9 × 8,0 mm',
        'Peso': '11 g',
        'Conectividade': 'Bluetooth, Ultra Wideband',
        'Bateria': 'CR2032 substituível',
        'Resistência': 'IP67'
      },
      inStock: true,
      category: 'Acessórios'
    },
    '2': {
      id: '2',
      title: 'Apple AirPods Pro 2° Geração - USB-C',
      images: [
        'https://api.builder.io/api/v1/image/assets/TEMP/0357f22904a329ce22a933a0742af8a8455dbc75?width=800',
        'https://api.builder.io/api/v1/image/assets/TEMP/0357f22904a329ce22a933a0742af8a8455dbc75?width=800'
      ],
      rating: { stars: 5, count: 110 },
      originalPrice: 'R$ 1.599,00',
      currentPrice: 'R$ 1.499,00',
      discount: '6%',
      description: 'Os AirPods Pro (2ª geração) foram repensados para oferecer uma experiência de áudio ainda mais rica. O chip H2 desenvolvido pela Apple promove áudio mais inteligente.',
      features: [
        'Cancelamento ativo de ruído até 2x melhor',
        'Áudio espacial personalizado',
        'Modo ambiente adaptável',
        'Até 6 horas de reprodução',
        'Case com USB-C e MagSafe'
      ],
      specifications: {
        'Chip': 'H2 da Apple',
        'Bateria': 'Até 6h (AirPods) + 30h (case)',
        'Conectividade': 'Bluetooth 5.3',
        'Carregamento': 'USB-C, MagSafe, Qi',
        'Resistência': 'IPX4'
      },
      inStock: true,
      category: 'AirPods'
    }
  };

  return products[id as keyof typeof products] || null;
};

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const product = id ? getProductById(id) : null;

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Produto não encontrado</h1>
          <Link to="/">
            <Button>Voltar à loja</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link to={`/categoria/${product.category.toLowerCase()}`} className="hover:text-foreground transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.title}</span>
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

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div>
            <div className="aspect-square bg-surface-subtle rounded-2xl overflow-hidden mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-contain p-8"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-primary' : 'border-border'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-contain p-2" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  {product.title}
                </h1>
                
                {product.rating && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={`w-4 h-4 ${
                            index < product.rating!.stars 
                              ? 'text-accent fill-accent' 
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({product.rating.count} avaliações)
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={isFavorite ? 'text-red-500' : ''}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              {product.originalPrice && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-muted-foreground line-through text-lg">
                    {product.originalPrice}
                  </span>
                  <Badge variant="destructive">{product.discount} OFF</Badge>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-foreground">
                  {product.currentPrice}
                </span>
                <span className="text-sm text-muted-foreground">no PIX</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                ou 12x de {(parseFloat(product.currentPrice.replace('R$ ', '').replace(',', '.')) / 12).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} sem juros
              </p>
            </div>

            {/* Stock status */}
            <div className="mb-6">
              <Badge variant={product.inStock ? "default" : "destructive"}>
                {product.inStock ? '✓ Em estoque' : 'Fora de estoque'}
              </Badge>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-2">
                Quantidade
              </label>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-12 text-center py-2 border rounded-md">
                  {quantity}
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3 mb-8">
              <Button 
                className="w-full h-12 text-lg font-semibold"
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Comprar Agora
              </Button>
              <Button variant="outline" className="w-full h-12">
                Adicionar ao Carrinho
              </Button>
            </div>

            {/* Benefits */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-primary" />
                <span>Frete grátis para todo o Brasil</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary" />
                <span>Garantia oficial Apple</span>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-5 h-5 text-primary" />
                <span>7 dias para troca ou devolução</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Descrição</TabsTrigger>
              <TabsTrigger value="features">Características</TabsTrigger>
              <TabsTrigger value="specifications">Especificações</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <div className="prose prose-gray max-w-none">
                <p className="text-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="features" className="mt-6">
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1.5">•</span>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <div className="grid gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-border">
                    <span className="font-medium text-foreground">{key}</span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;
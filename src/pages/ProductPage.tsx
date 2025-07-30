import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Star, ShoppingCart, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products } from '@/data/products';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
};

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!id) {
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

  const product = products.find(p => String(p.id) === id);

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

  // Cria um array com todas as imagens disponíveis (principal + secundárias)
  const productImages = [
    product.image,
    ...(product.secondaryImage1 ? [product.secondaryImage1] : []),
    ...(product.secondaryImage2 ? [product.secondaryImage2] : [])
  ].filter(Boolean); // Remove valores undefined

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" />
          Voltar à loja
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="aspect-square bg-surface-subtle rounded-2xl flex items-center justify-center p-4 sm:p-8 mb-4 overflow-hidden">
              <img 
                src={productImages[selectedImage]}
                alt={product.title}
                className="w-full h-full object-contain transition-opacity duration-300"
                onError={(e) => {
                  // Fallback para a imagem principal em caso de erro
                  if (e.currentTarget.src !== product.image) {
                    e.currentTarget.src = product.image;
                  }
                }}
              />
            </div>
            <div className="flex gap-2 sm:gap-3 overflow-x-auto py-2">
              {productImages.map((img, index) => (
                <button 
                  key={index} 
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-primary scale-105' 
                      : 'border-transparent hover:border-muted-foreground/30'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`${product.title} thumbnail ${index + 1}`} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback para a imagem principal em caso de erro
                      if (e.currentTarget.src !== product.image) {
                        e.currentTarget.src = product.image;
                      }
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <Badge variant="secondary" className="mb-2">{product.category}</Badge>
            <h1 className="text-3xl font-bold text-foreground mb-3">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.round(product.rating.rate) ? 'fill-current' : 'text-gray-300'}`} />
                ))}
              </div>
              <span className="text-muted-foreground text-sm">({product.rating.count} avaliações)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-3xl font-bold text-primary mr-3">
                {formatPrice(product.price)}
              </span>
            </div>

            {/* Stock & Actions */}
            <div className="flex items-center gap-4 mb-6">
              <span className='text-sm font-semibold text-green-600'>
                Em estoque
              </span>
              <div className="flex items-center gap-2 ml-auto">
                <Button variant="ghost" size="icon" onClick={() => setIsFavorite(!isFavorite)}>
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Share2 className="w-5 h-5 text-muted-foreground" />
                </Button>
              </div>
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
              {product.link ? (
                <a 
                  href={product.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block w-full"
                >
                  <Button className="w-full h-12 text-lg font-semibold">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Comprar Agora
                  </Button>
                </a>
              ) : (
                <Button className="w-full h-12 text-lg font-semibold" disabled>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Indisponível
                </Button>
              )}
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
                <span>Garantia oficial</span>
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
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="description">Descrição</TabsTrigger>
              <TabsTrigger value="specifications">Especificações</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <div className="prose prose-gray max-w-none">
                <p className="text-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
               <p className="text-foreground leading-relaxed">
                  Não há especificações detalhadas para este produto.
                </p>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;
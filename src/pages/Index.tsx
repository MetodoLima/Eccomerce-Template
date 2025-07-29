import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '../components/Navbar';
import HeroCarousel from '../components/HeroCarousel';
import CategorySection from '../components/CategorySection';
import ProductSection from '../components/ProductSection';
import BannerSection from '../components/BannerSection';
import TopSellingSection from '../components/TopSellingSection';
import Footer from '../components/Footer';

const Index = () => {
  const promotionProducts = [
    {
      id: '1',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/cf4bbbd0fe128753a13fe6d9116d7ea7c6509247?width=400',
      title: 'AirTag : Pacote com 4 unidades',
      rating: { stars: 5, count: 28 },
      originalPrice: 'R$ 649,00',
      currentPrice: 'R$ 609,00'
    },
    {
      id: '2',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/0357f22904a329ce22a933a0742af8a8455dbc75?width=400',
      title: 'Apple AirPods Pro 2° Geração - USB-C',
      rating: { stars: 5, count: 110 },
      originalPrice: 'R$ 1.599,00',
      currentPrice: 'R$ 1.499,00'
    },
    {
      id: '3',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/40d165e9bbf0d0a5846ddcde88cbbb55766cf6a5?width=400',
      title: 'Apple Pencil (USB-C)',
      rating: { stars: 5, count: 11 },
      originalPrice: 'R$ 699,00',
      currentPrice: 'R$ 649,00'
    },
    {
      id: '4',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/26183f4604e3af2c3d55f014f239dfc59c9150b4?width=400',
      title: 'Apple Pencil Pro',
      currentPrice: 'R$ 899,00'
    }
  ];

  const mostViewedProducts = [
    {
      id: '1',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/7ee7df771ce978d20de39a2c9581e45dd09c830f?width=428',
      title: 'Câmera De Vídeo Dji Osmo Pocket 3 4k',
      rating: { stars: 0, count: 0 },
      currentPrice: 'R$ 4.899,00'
    },
    {
      id: '2',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/cbc8b262f3504b4d74738367280f45536961bca0?width=428',
      title: 'Watch SE 44mm GPS 2° Geração Pulseira Loop',
      rating: { stars: 0, count: 0 },
      currentPrice: 'R$ 1.599,00'
    },
    {
      id: '3',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/8a3871dd26b4bf679804327d522477f1c6530126?width=428',
      title: 'Mac Mini M4, 16GB de Ram, 256GB SSD',
      rating: { stars: 5, count: 46 },
      currentPrice: 'R$ 5.199,00'
    },
    {
      id: '4',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/75c78a6443119fe0219f6af2bd9a34c7460ab271?width=428',
      title: 'iPhone 16 Pro Max 256GB',
      rating: { stars: 5, count: 30 },
      currentPrice: 'R$ 6.999,00'
    }
  ];

  const successProducts = [
    {
      id: '1',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/7ee7df771ce978d20de39a2c9581e45dd09c830f?width=428',
      title: 'Câmera De Vídeo Dji Osmo Pocket 3 4k',
      rating: { stars: 0, count: 0 },
      currentPrice: 'R$ 4.899,00'
    },
    {
      id: '2',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/8a3871dd26b4bf679804327d522477f1c6530126?width=428',
      title: 'Mac Mini M4, 16GB de Ram, 256GB SSD',
      rating: { stars: 5, count: 46 },
      currentPrice: 'R$ 5.199,00'
    },
    {
      id: '3',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/2bebfc229541025e4fcac89e6d1eb1b7b9de3c82?width=428',
      title: 'Película HPrime iPad Air 11" M3',
      rating: { stars: 4, count: 2 },
      currentPrice: 'R$ 149,00'
    },
    {
      id: '4',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/8a3871dd26b4bf679804327d522477f1c6530126?width=428',
      title: 'Mac Mini M4, 16GB de Ram, 512GB SSD',
      rating: { stars: 4, count: 5 },
      currentPrice: 'R$ 6.799,00'
    }
  ];

  const topGoProducts = [
    {
      id: '1',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/75c78a6443119fe0219f6af2bd9a34c7460ab271?width=428',
      title: 'iPhone 16 Pro Max 256GB',
      rating: { stars: 5, count: 30 },
      currentPrice: 'R$ 6.999,00'
    },
    {
      id: '2',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/75c78a6443119fe0219f6af2bd9a34c7460ab271?width=428',
      title: 'iPhone 16 Pro 128GB',
      rating: { stars: 5, count: 15 },
      currentPrice: 'R$ 5.999,00'
    },
    {
      id: '3',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/0357f22904a329ce22a933a0742af8a8455dbc75?width=428',
      title: 'Apple AirPods Pro 2° Geração - USB-C',
      rating: { stars: 5, count: 110 },
      currentPrice: 'R$ 1.499,00'
    }
  ];

  return (
    <div className="w-full min-h-screen bg-background">
      <Navbar />
      
      <main className="w-full max-w-7xl mx-auto">
        <HeroCarousel />
        
        <CategorySection />
        
        <BannerSection 
          images={[
            'https://api.builder.io/api/v1/image/assets/TEMP/7ff0386aec21f98dfab6f694cd6810c0d43e02a8?width=1080',
            'https://api.builder.io/api/v1/image/assets/TEMP/471ff3a33d02c0e34cb577b34fe9d73aceb126be?width=1080'
          ]}
          className="px-4 sm:px-6 py-6 sm:py-8"
        />
        
        <ProductSection
          title="Produtos em promoção"
          products={promotionProducts}
          hasVerticalBanner={true}
          bannerImage="https://api.builder.io/api/v1/image/assets/TEMP/ad94bd200e66cf514aad7006db570a372e83a498?width=330"
        />
        
        <ProductSection
          title="Mais vistos"
          products={mostViewedProducts}
        />
        
        <ProductSection
          title="Produtos que fazem sucesso"
          products={successProducts}
        />
        
        <section className="w-full max-w-7xl relative mx-auto my-16 px-4 sm:px-6">
          <h2 className="text-foreground text-xl font-bold uppercase mb-6">
            Top Go imports
          </h2>
          
          <div className="hidden lg:block w-64 h-[558px] absolute bg-muted left-4 top-12 rounded-xl" />
          
          <div className="lg:ml-72">
            <div className="flex gap-6 overflow-x-auto pb-4">
              {topGoProducts.map((product) => (
                <Link key={product.id} to={`/produto/${product.id}`}>
                  <article className="flex w-60 flex-col gap-4 shrink-0 shadow-soft hover:shadow-medium bg-surface-elevated p-4 rounded-2xl transition-all duration-300 hover:scale-105 group">
                    <div className="w-full flex flex-col">
                      <div className="aspect-square flex justify-center items-center bg-surface-subtle mb-4 p-4 rounded-3xl overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      
                      <div className="flex w-full justify-center items-center min-h-12 mb-4">
                        <h3 className="text-foreground text-center text-lg font-bold leading-tight line-clamp-2">
                          {product.title}
                        </h3>
                      </div>
                      
                      {product.rating && product.rating.count > 0 && (
                        <div className="flex justify-center items-center gap-1 w-full mb-4">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, index) => (
                              <span
                                key={index}
                                className={`text-accent text-sm ${
                                  index < product.rating!.stars ? 'opacity-100' : 'opacity-30'
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="text-accent text-xs font-medium ml-1">
                            ({product.rating.count})
                          </span>
                        </div>
                      )}
                      
                      <div className="w-full text-center mb-4">
                        <div className="text-foreground text-xl font-bold">
                          {product.currentPrice}
                        </div>
                        <div className="text-text-subtle text-xs font-semibold mt-1">
                          no pix
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full h-12">
                      Comprar
                    </Button>
                  </article>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="text-center my-10">
            <img
              src="https://placehold.co/400x100/333333/333333"
              alt="Ganhador Banner"
              className="w-full max-w-md h-24 rounded-lg mx-auto"
            />
          </div>
          
          <TopSellingSection />
          
          <div className="text-center my-10">
            <img
              src="https://placehold.co/400x80/2c3e50/2c3e50"
              alt="Atendimento Banner"
              className="w-full max-w-md h-20 rounded-lg mx-auto"
            />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

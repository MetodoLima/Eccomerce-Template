import React from 'react';
import Navbar from '../components/Navbar';
import HeroCarousel from '../components/HeroCarousel';
import CategorySection from '../components/CategorySection';
import ProductSection from '../components/ProductSection';
import BannerSection from '../components/BannerSection';
import TopSellingSection from '../components/TopSellingSection';
import Footer from '../components/Footer';
import { products as allProducts } from '@/data/products';
import { Product } from '@/types';



const Index: React.FC = () => {
  const novidades = allProducts.filter(p => p.isNew);
  const destaques = allProducts.filter(p => p.isFeatured);
  const maisAvaliados = allProducts.filter(p => p.isTopRated);

  return (
    <div className="w-full min-h-screen bg-background">
      <Navbar />
      <main className="w-full pt-8">
        <HeroCarousel />
        <CategorySection />
        <BannerSection
          images={[
            "/Figures/ImagemAux1-Eccomerce.svg",
            "/Figures/ImagemAux2-Eccomerce.svg",
          ]}
          className="px-4 sm:px-6 py-6 sm:py-8"
        />

        <ProductSection title="Novidades" products={novidades} />
        <ProductSection title="Destaques" products={destaques} />
        <ProductSection title="Mais Avaliados" products={maisAvaliados} />

        <TopSellingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

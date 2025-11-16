import React from 'react';
import HeroCarousel from '../components/HeroCarousel';
import CollectionsSection from '@/components/CollectionsSection';
import ProductSection from '@/components/ProductSection';
import CategoryTabs from '@/components/CategoryTabs';
import SecondaryCarousel from '@/components/SecondaryCarousel';
import InfoFeatures from '@/components/InfoFeatures';
import Footer from '../components/Footer';
import { products as allProducts } from '@/data/products';



const Index: React.FC = () => {
  const iphones = allProducts.filter(p => p.category === 'iphones');
  const macs = allProducts.filter(p => p.category === 'macs');
  const watchs = allProducts.filter(p => p.category === 'watchs');

  return (
    <div className="w-full min-h-screen bg-background">
      <main className="w-full">
        <HeroCarousel />
        {/* Nossos produtos */}
        <CollectionsSection />

        {/* Três categorias, uma abaixo da outra */}
        <ProductSection title="iPhones" products={iphones} centerTitle />
        <ProductSection title="Macs" products={macs} centerTitle />
        <ProductSection title="Watchs" products={watchs} centerTitle />

        {/* Segundo carrossel */}
        <SecondaryCarousel />

        {/* Nossas Coleções (abas) após o segundo carrossel */}
        <CategoryTabs />

        {/* Benefícios */}
        <InfoFeatures />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

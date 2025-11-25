import React, { useEffect, useState } from 'react';
import HeroCarousel from '../components/HeroCarousel';
import CollectionsSection from '@/components/CollectionsSection';
import ProductSection from '@/components/ProductSection';
import CategoryTabs from '@/components/CategoryTabs';
import SecondaryCarousel from '@/components/SecondaryCarousel';
import InfoFeatures from '@/components/InfoFeatures';
import Footer from '../components/Footer';
import { Product } from '@/types';
import { ProductService } from '@/services/ProductService';



const Index: React.FC = () => {
  const [iphones, setIphones] = useState<Product[]>([]);
  const [macs, setMacs] = useState<Product[]>([]);
  const [watchs, setWatchs] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const run = async () => {
      setLoading(true);
      const [r1, r2, r3] = await Promise.all([
        ProductService.getByCategory('iphones'),
        ProductService.getByCategory('macs'),
        ProductService.getByCategory('watchs'),
      ]);
      if (!active) return;
      setIphones(r1.data || []);
      setMacs(r2.data || []);
      setWatchs(r3.data || []);
      setLoading(false);
    };
    run();
    return () => { active = false; };
  }, []);

  return (
    <div className="w-full min-h-screen bg-background">
      <main className="w-full">
        <HeroCarousel />
        {/* Nossos produtos */}
        <CollectionsSection />

        {/* Três categorias, uma abaixo da outra */}
        {loading ? (
          <div className="w-full text-center py-8 text-sm text-muted-foreground">Carregando produtos...</div>
        ) : (
          <>
            <ProductSection title="iPhones" products={iphones} centerTitle />
            <ProductSection title="Macs" products={macs} centerTitle />
            <ProductSection title="Watchs" products={watchs} centerTitle />
          </>
        )}

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

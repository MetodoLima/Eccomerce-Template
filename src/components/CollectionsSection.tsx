import React from 'react';
import { Link } from 'react-router-dom';

interface CollectionItem {
  name: string;
  image: string;
  href: string;
}

const collections: CollectionItem[] = [
  { name: 'iPhones', image: 'https://api.builder.io/api/v1/image/assets/TEMP/156da650df89e98c77fd877f9456e703a728d621?width=440', href: '/categoria/iphones' },
  { name: 'Macs', image: 'https://api.builder.io/api/v1/image/assets/TEMP/eaea2f06faeab84377b4cab90310cd302d8940ab?width=440', href: '/categoria/macs' },
  { name: 'iPads', image: 'https://api.builder.io/api/v1/image/assets/TEMP/30b36b0654dbd664aa61e0b13c31a8a83ea04819?width=440', href: '/categoria/ipads' },
  { name: 'Watchs', image: 'https://api.builder.io/api/v1/image/assets/TEMP/0444e4ac49dbe37615eb72b0358fa7d7d640abe7?width=440', href: '/categoria/watchs' },
  { name: 'AirPods', image: 'https://api.builder.io/api/v1/image/assets/TEMP/354cd22a1c3769d5bcb15041cd6198bcb15a0c30?width=440', href: '/categoria/airpods' },
];

const CollectionsSection: React.FC = () => {
  return (
    <section className="w-full max-w-[1140px] mx-auto py-10 px-5 max-sm:px-3">
      <h2 className="text-center text-2xl font-semibold mb-8">Nossos produtos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {collections.map((item) => (
          <Link key={item.name} to={item.href} className="group">
            <article className="rounded-xl shadow-soft hover:shadow-medium transition-shadow bg-white overflow-hidden">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div className="px-4 py-3 flex items-center justify-between">
                <span className="text-sm font-medium">{item.name}</span>
                <span className="text-primary text-sm">→</span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CollectionsSection;

import { Product } from '@/types';

export const products: Product[] = [
  {
    id: 1,
    title: 'iPhone 14 Pro',
    price: 7999.99,
    description: 'O iPhone 14 Pro. Capture detalhes incríveis com a câmera grande-angular de 48 MP. E experimente uma nova forma de interagir com o iPhone na Dynamic Island.',
    category: 'iphones',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-1inch-deeppurple?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1663703840578',
    secondaryImage1: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-1inch-deeppurple_AV1?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1660944002705',
    secondaryImage2: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-1inch-deeppurple_AV2?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1660944002705',
    rating: {
      rate: 4.9,
      count: 120
    },
    isNew: true,
    isFeatured: true,
    isTopRated: true,
    link: 'https://wa.me/5585921592682?text=Quero%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20iphone%2014%20Pro'
  },
  {
    id: 2,
    title: 'Apple AirPods Pro 2ª Geração',
    price: 1899.00,
    description: 'Os AirPods Pro (2ª geração) foram repensados para oferecer uma experiência de áudio ainda mais rica. Cancelamento Ativo de Ruído e Áudio Espacial Personalizado.',
    category: 'Airpods',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MME73?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1632861342000',
    secondaryImage1: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MME73_AV2?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1632861342000',
    secondaryImage2: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MME73_AV3?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1632861342000',
    rating: {
      rate: 4.8,
      count: 250
    },
    isTopRated: true,
    link: '/produto/2'
  },
  {
    id: 3,
    title: 'Apple Watch Series 8',
    price: 3499.50,
    description: 'O Apple Watch Series 8 vem com apps e sensores de saúde avançados, para você fazer um ECG, medir seus batimentos cardíacos e o nível de oxigênio no sangue.',
    category: 'Watches',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ML773_VW_34FR+watch-41-alum-starlight-nc-8s_VW_34FR_WF_CO?wid=1400&hei=1400&trim=1,0&fmt=p-jpg&qlt=95&.v=1661971562125',
    rating: {
      rate: 4.7,
      count: 95
    },
    link: '/produto/3'
  },
  {
    id: 4,
    title: 'MacBook Air com chip M2',
    price: 9999.00,
    description: 'O MacBook Air está mais portátil do que nunca e pesa só 1,24 kg. É o notebook versátil para você trabalhar, jogar ou criar o que quiser, em qualquer lugar.',
    category: 'Macs',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1652989999839',
    rating: {
      rate: 4.9,
      count: 150
    },
    link: '/produto/4'
  },
  {
    "id": 5,
    "title": "iPhone 15 Pro Max (256GB) - Titânio Natural",
    "price": 10999.00,
    "description": "O ápice da tecnologia Apple. Com design em titânio aeroespacial, mais leve e resistente, e o revolucionário chip A17 Pro para um desempenho gráfico absurdo. Seu sistema de câmera Pro com zoom óptico de 5x captura fotos e vídeos com qualidade profissional.",
    "category": "iphones",
    "image": "https://www.iplacecorp.com.br/ccstore/v1/images/?source=/file/v3192512432927761115/products/226697.00-apple-iphone-15-pro-max-1tb-titanio-natural-mu7j3be-a.jpg&height=475&width=475",
    "secondaryImage1": "https://www.iplacecorp.com.br/ccstore/v1/images/?source=/file/v3192512432927761115/products/226697.00-apple-iphone-15-pro-max-1tb-titanio-natural-mu7j3be-a.jpg&height=475&width=475",
    "secondaryImage2": "https://www.iplacecorp.com.br/ccstore/v1/images/?source=/file/v3192512432927761115/products/226697.00-apple-iphone-15-pro-max-1tb-titanio-natural-mu7j3be-a.jpg&height=475&width=475",
    "rating": {
      "rate": 4.9,
      "count": 155
    },
    "isNew": true,
    "isFeatured": true,
    "isTopRated": true,
    "link": "https://wa.me/5585921592682?text=Quero%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20iPhone%2015%20Pro%20Max%20(256GB)%20-%20Tit%C3%A2nio%20Natural"
  },
  {
    "id": 6,
    "title": "iPhone 15 (128GB) - Azul",
    "price": 6899.00,
    "description": "O iPhone 15 traz inovações incríveis como a Dynamic Island. Sua nova câmera grande-angular de 48 MP captura fotos com detalhes impressionantes, e o chip A16 Bionic garante velocidade e fluidez em todas as tarefas. Com design de vidro pigmentado e bordas arredondadas.",
    "category": "iphones",
    "image": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-blue?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923777972",
    "secondaryImage1": "https://www.apple.com/newsroom/images/2023/09/apple-debuts-iphone-15-and-iphone-15-plus/article/Apple-iPhone-15-lineup-hero-230912/Apple-iPhone-15-hero-230912_Full-Bleed-Image.jpg.large.jpg",
    "secondaryImage2": "https://www.apple.com/v/iphone-15/a/images/overview/dynamic-island/dynamic_island_music__b84ibhpgs12i_large.jpg",
    "rating": {
      "rate": 4.8,
      "count": 180
    },
    "isNew": true,
    "isFeatured": false,
    "isTopRated": false,
    "link": "https://wa.me/5585921592682?text=Quero%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20iPhone%2015%20(128GB)%20-%20Azul"
  },
  {
    "id": 7,
    "title": "iPhone 14 (128GB) - Estelar",
    "price": 5499.00,
    "description": "Uma escolha inteligente que combina potência e custo-benefício. O iPhone 14 conta com o poderoso chip A15 Bionic, um sistema de câmera dupla avançado para fotos incríveis em qualquer luz e recursos de segurança essenciais, como Detecção de Acidente.",
    "category": "Airpods",
    "image": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-storage-select-202209-6-1inch-starlight?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1660691645469",
    "secondaryImage1": "https://www.notebookcheck.net/fileadmin/Notebooks/Apple/iPhone_14/DSC02269.jpg",
    "secondaryImage2": "https://www.movilcelular.es/fotos/apple-iphone-14/104936-apple-iphone-14.jpg",
    "rating": {
      "rate": 4.7,
      "count": 210
    },
    "isNew": false,
    "isFeatured": true,
    "isTopRated": false,
    "link": "https://wa.me/5585921592682?text=Quero%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20iPhone%2014%20(128GB)%20-%20Estelar"
  },
  {
    "id": 8,
    "title": "AirPods Pro (2ª geração)",
    "price": 1999.00,
    "description": "Mergulhe no som com o Cancelamento Ativo de Ruído até 2x mais eficaz. O modo Ambiente Adaptável permite ouvir o mundo ao redor, enquanto o Áudio Espacial Personalizado cria uma experiência sonora única e imersiva. Essencial para quem busca a melhor qualidade de som.",
    "category": "Airpods",
    "image": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MTJV3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1694014871985",
    "secondaryImage1": "https://www.apple.com/v/airpods-pro/g/images/overview/audio_quality_eq__bw20hkeiz1ua_large.jpg",
    "secondaryImage2": "https://www.apple.com/newsroom/images/product/airpods/standard/Apple-AirPods-Pro-2nd-gen-hero-220907/Apple-AirPods-Pro-2nd-gen-hero-220907_inline.jpg.large.jpg",
    "rating": {
      "rate": 4.9,
      "count": 250
    },
    "isNew": true,
    "isFeatured": true,
    "isTopRated": true,
    "link": "https://wa.me/5585921592682?text=Quero%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20AirPods%20Pro%20(2%C2%AA%20gera%C3%A7%C3%A3o)"
  },
  {
    "id": 9,
    "title": "AirPods (3ª geração)",
    "price": 1399.00,
    "description": "O equilíbrio perfeito entre design e tecnologia. Vêm com Áudio Espacial Personalizado para um som tridimensional, Equalização Adaptativa que ajusta a música aos seus ouvidos e maior duração de bateria. Seu design ergonômico torna o uso diário mais simples e confortável.",
    "category": "Airpods",
    "image": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MME73?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1632861342000",
    "secondaryImage1": "https://www.apple.com/newsroom/images/product/airpods/standard/Apple_AirPods_3rd-gen_hero_10202021_inline.jpg.large.jpg",
    "secondaryImage2": "https://www.istore.co.za/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/a/i/airpods_3rd_gen_case_1.jpg",
    "rating": {
      "rate": 4.7,
      "count": 310
    },
    "isNew": false,
    "isFeatured": false,
    "isTopRated": false,
    "link": "https://wa.me/5585921592682?text=Quero%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20AirPods%20(3%C2%AA%20gera%C3%A7%C3%A3o)"
  },
  {
    "id": 10,
    "title": "MacBook Pro 14 (Chip M3 Pro) - Preto-espacial",
    "price": 17999.00,
    "description": "A escolha definitiva para profissionais. Com o chip M3 Pro, o MacBook Pro executa tarefas pesadas, como edição de vídeo em 8K, com uma facilidade impressionante. Sua tela Liquid Retina XDR é a melhor já vista em um notebook, e seu conjunto de portas avançadas oferece toda a conectividade.",
    "category": "Macs",
    "image": "https://images-na.ssl-images-amazon.com/images/I/41+N3+l3RSL._AC_UL600_SR600,600_.jpg",
    "secondaryImage1": "https://images-na.ssl-images-amazon.com/images/I/41+N3+l3RSL._AC_UL600_SR600,600_.jpg",
    "secondaryImage2": "https://images-na.ssl-images-amazon.com/images/I/41+N3+l3RSL._AC_UL600_SR600,600_.jpg",
    "rating": {
      "rate": 4.9,
      "count": 115
    },
    "isNew": true,
    "isFeatured": true,
    "isTopRated": true,
    "link": "https://wa.me/5585921592682?text=Quero%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20MacBook%20Pro%2014%20(Chip%20M3%20Pro)"
  },
  {
    "id": 12,
    "title": "MacBook Air 13 (Chip M3) - Meia-noite",
    "price": 9999.00,
    "description": "Superportátil e mais poderoso do que nunca. O chip M3 transforma o MacBook Air em uma máquina veloz para trabalho e diversão, mantendo o design fino, leve e sem ventoinha. A espetacular tela Liquid Retina e a bateria para até 18 horas de uso permitem que você leve sua produtividade para qualquer lugar.",
    "category": "Macs",
    "image": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-midnight-select-202402?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1707332023253",
    "secondaryImage1": "https://www.apple.com/v/macbook-air/p/images/overview/design/design_hero__c7v6teu6cbcm_large.jpg",
    "secondaryImage2": "https://www.apple.com/newsroom/images/2024/03/apple-supercharges-macbook-air-with-new-m3-chip/article/Apple-MacBook-Air-M3-display-240304/Apple-MacBook-Air-M3-display-240304_Full-Bleed-Image.jpg.large.jpg",
    "rating": {
      "rate": 4.8,
      "count": 95
    },
    "isNew": true,
    "isFeatured": false,
    "isTopRated": false,
    "link": "https://wa.me/5585921592682?text=Quero%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20MacBook%20Air%2013%20(Chip%20M3)"
  }
];

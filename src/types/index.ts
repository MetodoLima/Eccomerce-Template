export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  image: string;
  secondaryImage1?: string;
  secondaryImage2?: string;
  rating: {
    rate: number;
    count: number;
  };
  isNew?: boolean;
  isFeatured?: boolean;
  isTopRated?: boolean;
  link?: string;
}

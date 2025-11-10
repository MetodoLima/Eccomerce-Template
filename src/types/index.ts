export interface Product {
  id: string;
  title: string;
  price: number;
  original_price?: number;
  description: string;
  image_url: string;
  hover_image_url?: string;
  sku: string;
  category: string;
  isNew?: boolean;
  isFeatured?: boolean;
  isTopRated?: boolean;
}

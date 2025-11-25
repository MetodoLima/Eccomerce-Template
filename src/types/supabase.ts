import { Product } from './index';

export interface OrderItem {
  product_id: string;
  title: string;
  quantity: number;
  price: number;
  image_url?: string;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  notes?: string;
}

export interface Order {
  id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address?: string;
  customer_city?: string;
  customer_state?: string;
  customer_zip_code?: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  total_amount: number;
  notes?: string;
  created_at?: string;
  updated_at?: string;
  items: OrderItem[];
  whatsapp_notification_sent: boolean;
  email_notification_sent: boolean;
  store_id: string;
}

// Tipos para as tabelas do Supabase
export type Tables = {
  orders: Order;
  products: Product;
  // Podemos adicionar mais tabelas aqui conforme necessário
};

export type TableName = keyof Tables;

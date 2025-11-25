import { supabase } from '@/lib/supabaseClient';
import { Product } from '@/types';

export interface DBProduct {
  id: string;
  title: string;
  price: number;
  original_price?: number | null;
  description: string;
  image_url: string;
  hover_image_url?: string | null;
  sku: string;
  category: string;
  is_new?: boolean | null;
  is_featured?: boolean | null;
  is_top_rated?: boolean | null;
  created_at?: string;
  updated_at?: string;
}

const mapDBToProduct = (p: DBProduct): Product => ({
  id: p.id,
  title: p.title,
  price: Number(p.price),
  original_price: p.original_price != null ? Number(p.original_price) : undefined,
  description: p.description,
  image_url: p.image_url,
  hover_image_url: p.hover_image_url ?? undefined,
  sku: p.sku,
  category: p.category,
  isNew: Boolean(p.is_new ?? false),
  isFeatured: Boolean(p.is_featured ?? false),
  isTopRated: Boolean(p.is_top_rated ?? false),
});

export const ProductService = {
  async getAll(): Promise<{ data: Product[] | null; error: Error | null }>{
    const { data, error } = await supabase
      .from('products')
      .select('id, title, price, original_price, description, image_url, hover_image_url, sku, category, is_new, is_featured, is_top_rated')
      .order('created_at', { ascending: false });

    if (error) return { data: null, error };
    return { data: (data as DBProduct[]).map(mapDBToProduct), error: null };
  },

  async getById(id: string): Promise<{ data: Product | null; error: Error | null }>{
    const { data, error } = await supabase
      .from('products')
      .select('id, title, price, original_price, description, image_url, hover_image_url, sku, category, is_new, is_featured, is_top_rated')
      .eq('id', id)
      .single();

    if (error) return { data: null, error };
    return { data: mapDBToProduct(data as DBProduct), error: null };
  },

  async getByCategory(category: string): Promise<{ data: Product[] | null; error: Error | null }>{
    const { data, error } = await supabase
      .from('products')
      .select('id, title, price, original_price, description, image_url, hover_image_url, sku, category, is_new, is_featured, is_top_rated')
      .ilike('category', category)
      .order('created_at', { ascending: false });

    if (error) return { data: null, error };
    return { data: (data as DBProduct[]).map(mapDBToProduct), error: null };
  },

  async search(q: string, limit?: number): Promise<{ data: Product[] | null; error: Error | null }>{
    const like = `%${q}%`;
    const { data, error } = await supabase
      .from('products')
      .select('id, title, price, original_price, description, image_url, hover_image_url, sku, category, is_new, is_featured, is_top_rated')
      .or(`title.ilike.${like},sku.ilike.${like},category.ilike.${like}`)
      .order('created_at', { ascending: false })
      .limit(limit ?? 100);

    if (error) return { data: null, error };
    return { data: (data as DBProduct[]).map(mapDBToProduct), error: null };
  },

  async getFeatured(limit?: number): Promise<{ data: Product[] | null; error: Error | null }>{
    const { data, error } = await supabase
      .from('products')
      .select('id, title, price, original_price, description, image_url, hover_image_url, sku, category, is_new, is_featured, is_top_rated')
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(limit ?? 50);

    if (error) return { data: null, error };
    return { data: (data as DBProduct[]).map(mapDBToProduct), error: null };
  },

  async getCategories(): Promise<{ data: string[] | null; error: Error | null }>{
    const { data, error } = await supabase
      .from('products')
      .select('category')
      .order('category', { ascending: true });

    if (error) return { data: null, error };
    const set = new Set((data as { category: string }[]).map(r => r.category));
    return { data: Array.from(set), error: null };
  },

  async getByCategories(categories: string[], excludeIds: string[] = [], limit: number = 8): Promise<{ data: Product[] | null; error: Error | null }>{
    if (categories.length === 0) {
      return { data: [], error: null };
    }
    let query = supabase
      .from('products')
      .select('id, title, price, original_price, description, image_url, hover_image_url, sku, category, is_new, is_featured, is_top_rated')
      .in('category', categories)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (excludeIds.length > 0) {
      const list = `(${excludeIds.map(id => `'${id}'`).join(',')})`;
      query = query.not('id', 'in', list);
    }

    const { data, error } = await query;
    if (error) return { data: null, error };
    return { data: (data as DBProduct[]).map(mapDBToProduct), error: null };
  },
};

import { supabase } from '@/lib/supabaseClient';
import { Order, TableName, Tables } from '@/types/supabase';

type SupabaseResponse<T> = {
  data: T | null;
  error: Error | null;
};

class SupabaseService {
  private static instance: SupabaseService;

  private constructor() {}

  public static getInstance(): SupabaseService {
    if (!SupabaseService.instance) {
      SupabaseService.instance = new SupabaseService();
    }
    return SupabaseService.instance;
  }

  // Método genérico para buscar dados de qualquer tabela
  async fetchData<T extends TableName>(
    table: T,
    columns = '*',
    filter?: Record<string, any>
  ): Promise<SupabaseResponse<Tables[T][]>> {
    type TableType = Tables[T];
    try {
      let query = supabase.from(table).select(columns);

      // Aplicar filtros se fornecidos
      if (filter) {
        Object.entries(filter).forEach(([key, value]) => {
          if (value !== undefined) {
            query = query.eq(key, value);
          }
        });
      }

      const { data, error } = await query as unknown as { 
        data: TableType[] | null; 
        error: Error | null 
      };

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error(`Error fetching data from ${table}:`, error);
      return { data: null, error: error as Error };
    }
  }

  // Método para criar um registro em qualquer tabela
  async createData<T extends TableName>(
    table: T,
    data: Omit<Tables[T], 'id' | 'created_at' | 'updated_at'>
  ): Promise<SupabaseResponse<Tables[T]>> {
    type TableType = Tables[T];
    try {
      const { data: result, error } = await supabase
        .from(table)
        .insert([data])
        .select()
        .single() as unknown as { 
          data: TableType | null; 
          error: Error | null 
        };

      if (error) throw error;
      return { data: result, error: null };
    } catch (error) {
      console.error(`Error creating data in ${table}:`, error);
      return { data: null, error: error as Error };
    }
  }

  // Método para atualizar um registro em qualquer tabela
  async updateData<T extends TableName>(
    table: T,
    id: string,
    updates: Partial<Tables[T]>
  ): Promise<SupabaseResponse<Tables[T]>> {
    type TableType = Tables[T];
    try {
      const { data: result, error } = await supabase
        .from(table)
        .update(updates)
        .eq('id', id)
        .select()
        .single() as unknown as { 
          data: TableType | null; 
          error: Error | null 
        };

      if (error) throw error;
      return { data: result, error: null };
    } catch (error) {
      console.error(`Error updating data in ${table}:`, error);
      return { data: null, error: error as Error };
    }
  }

  // Método para excluir um registro de qualquer tabela
  async deleteData<T extends TableName>(
    table: T,
    id: string
  ): Promise<{ error: Error | null }> {
    try {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error(`Error deleting data from ${table}:`, error);
      return { error: error as Error };
    }
  }

  // Métodos específicos para a tabela de pedidos (orders)
  async getOrdersByStore(storeId: string): Promise<SupabaseResponse<Order[]>> {
    const { data, error } = await this.fetchData('orders', '*', { store_id: storeId });
    return { data: data as unknown as Order[], error };
  }

  async getOrderById(orderId: string): Promise<SupabaseResponse<Order>> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching order:', error);
      return { data: null, error: error as Error };
    }
  }

  async updateOrderStatus(
    orderId: string,
    status: Order['status']
  ): Promise<SupabaseResponse<Order>> {
    return this.updateData('orders', orderId, { 
      status,
      updated_at: new Date().toISOString() 
    });
  }

  async markOrderAsNotified(
    orderId: string,
    notificationType: 'whatsapp' | 'email'
  ): Promise<SupabaseResponse<Order>> {
    const updateData = notificationType === 'whatsapp'
      ? { whatsapp_notification_sent: true }
      : { email_notification_sent: true };

    return this.updateData('orders', orderId, {
      ...updateData,
      updated_at: new Date().toISOString()
    });
  }
}

export default SupabaseService.getInstance();

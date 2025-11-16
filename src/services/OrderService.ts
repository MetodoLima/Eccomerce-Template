import { supabase } from '@/lib/supabaseClient';
import { CartItem } from '@/contexts/CartContext';
import { CustomerInfo, Order, OrderItem } from '@/types/supabase';

// Tipos importados de @/types/supabase

class OrderService {
  private static instance: OrderService;
  private tableName: 'orders' = 'orders';

  private constructor() {}

  public static getInstance(): OrderService {
    if (!OrderService.instance) {
      OrderService.instance = new OrderService();
    }
    return OrderService.instance;
  }

  async createOrder(
    customerInfo: CustomerInfo,
    items: CartItem[],
    total: number,
    storeId: string
  ): Promise<{ data: Order | null; error: Error | null }> {
    try {
      const orderItems: OrderItem[] = items.map(item => ({
        product_id: item.id,
        title: item.title,
        quantity: item.quantity,
        price: item.price || 0,
        image_url: item.image_url
      }));

      const orderData: Omit<Order, 'id' | 'created_at' | 'updated_at'> = {
        customer_name: customerInfo.name,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone,
        customer_address: customerInfo.address,
        customer_city: customerInfo.city,
        customer_state: customerInfo.state,
        customer_zip_code: customerInfo.zipCode,
        status: 'pending',
        total_amount: total,
        notes: customerInfo.notes,
        items: orderItems,
        whatsapp_notification_sent: false,
        email_notification_sent: false,
        store_id: storeId
      };

      const { data, error } = await supabase
        .from(this.tableName)
        .insert([orderData])
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Error creating order:', error);
      return { data: null, error: error as Error };
    }
  }

  async getOrderById(id: string): Promise<{ data: Order | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('id', id)
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
  ): Promise<{ data: Order | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', orderId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error updating order status:', error);
      return { data: null, error: error as Error };
    }
  }

  async getStoreOrders(storeId: string): Promise<{ data: Order[] | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('store_id', storeId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching store orders:', error);
      return { data: null, error: error as Error };
    }
  }

  async markOrderAsNotified(
    orderId: string,
    notificationType: 'whatsapp' | 'email'
  ): Promise<{ data: Order | null; error: Error | null }> {
    try {
      const updates =
        notificationType === 'whatsapp'
          ? { whatsapp_notification_sent: true }
          : { email_notification_sent: true };

      const { data, error } = await supabase
        .from(this.tableName)
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', orderId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error marking order as notified:', error);
      return { data: null, error: error as Error };
    }
  }
}

export default OrderService.getInstance();

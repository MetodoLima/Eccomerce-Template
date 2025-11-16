import { supabase } from '@/lib/supabaseClient';
import { CartItem } from '@/contexts/CartContext';
import { CustomerInfo, Order, OrderItem } from '@/types/supabase';

// Tipos importados de @/types/supabase

// Função para enviar webhook do n8n
const sendWebhookToN8n = async (order: Order): Promise<void> => {
  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.warn('N8N webhook URL não está configurada. Pulando envio do webhook.');
    return;
  }

  try {
    const payload = {
      orderId: order.id,
      customerName: order.customer_name,
      customerEmail: order.customer_email,
      customerPhone: order.customer_phone,
      customerAddress: order.customer_address,
      customerCity: order.customer_city,
      customerState: order.customer_state,
      customerZipCode: order.customer_zip_code,
      status: order.status,
      totalAmount: order.total_amount,
      notes: order.notes,
      items: order.items,
      storeId: order.store_id,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(`Webhook retornou status ${response.status}: ${response.statusText}`);
    } else {
      console.log('Pedido enviado com sucesso para o webhook do n8n');
    }
  } catch (error) {
    console.error('Erro ao enviar pedido para o webhook:', error);
  }
};

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

      // Enviar webhook do n8n de forma assíncrona (não bloqueia o fluxo)
      sendWebhookToN8n(data).catch(err => {
        console.error('Erro ao enviar webhook:', err);
      });

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

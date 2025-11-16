import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { CartItem } from '@/contexts/CartContext';
import { CustomerInfo, Order } from '@/types/supabase';
import OrderService from '@/services/OrderService';

export const useOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createOrder = async (
    customerInfo: CustomerInfo,
    cartItems: CartItem[],
    storeId: string
  ): Promise<{ order: Order | null; error: Error | null }> => {
    setIsLoading(true);
    setError(null);

    try {
      // Calcular o total do carrinho
      const total = cartItems.reduce(
        (sum, item) => sum + (item.price || 0) * item.quantity,
        0
      );

      // Criar o pedido usando o OrderService
      const { data: order, error } = await OrderService.createOrder(
        customerInfo,
        cartItems,
        total,
        storeId
      );

      if (error) throw error;
      if (!order) throw new Error('Falha ao criar o pedido');

      // Disparar notificação de sucesso
      toast.success('Pedido criado com sucesso!');
      
      return { order, error: null };
    } catch (err) {
      const error = err as Error;
      console.error('Error creating order:', error);
      toast.error(error.message || 'Erro ao criar o pedido');
      setError(error);
      return { order: null, error };
    } finally {
      setIsLoading(false);
    }
  };

  const getOrderById = async (orderId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: order, error } = await OrderService.getOrderById(orderId);
      
      if (error) throw error;
      if (!order) throw new Error('Pedido não encontrado');
      
      return { order, error: null };
    } catch (err) {
      const error = err as Error;
      console.error('Error fetching order:', error);
      setError(error);
      return { order: null, error };
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (
    orderId: string,
    status: Order['status']
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: order, error } = await OrderService.updateOrderStatus(
        orderId,
        status
      );

      if (error) throw error;
      if (!order) throw new Error('Falha ao atualizar o status do pedido');

      toast.success('Status do pedido atualizado com sucesso!');
      return { order, error: null };
    } catch (err) {
      const error = err as Error;
      console.error('Error updating order status:', error);
      toast.error(error.message || 'Erro ao atualizar o status do pedido');
      setError(error);
      return { order: null, error };
    } finally {
      setIsLoading(false);
    }
  };

  const markOrderAsNotified = async (
    orderId: string,
    notificationType: 'whatsapp' | 'email'
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: order, error } = await OrderService.markOrderAsNotified(
        orderId,
        notificationType
      );

      if (error) throw error;
      if (!order) throw new Error('Falha ao marcar notificação como enviada');

      return { order, error: null };
    } catch (err) {
      const error = err as Error;
      console.error('Error marking order as notified:', error);
      setError(error);
      return { order: null, error };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createOrder,
    getOrderById,
    updateOrderStatus,
    markOrderAsNotified,
    isLoading,
    error,
  };
};

export default useOrder;

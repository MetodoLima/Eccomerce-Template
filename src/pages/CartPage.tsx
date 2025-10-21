import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import toast from 'react-hot-toast';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
};

export const CartPage: React.FC = () => {
  const { items, total, updateQuantity, removeFromCart, getCartPayload, clearCart } = useCart();
  const [customerInfo, setCustomerInfo] = useState({ name: '', whatsapp: '', email: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerInfo.name || (!customerInfo.whatsapp && !customerInfo.email)) {
      toast.error('Por favor, preencha seu nome e pelo menos uma forma de contato (WhatsApp ou Email).');
      return;
    }

    const toastId = toast.loading('Enviando seu pedido...');

    const cartPayload = getCartPayload();
    const finalPayload = {
      customer_info: customerInfo,
      ...cartPayload,
    };

    try {
      const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK;
      if (!webhookUrl) {
        throw new Error('Webhook URL não está configurada.');
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalPayload),
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar o pedido.');
      }

      toast.success('Pedido enviado! Redirecionando para o WhatsApp...', { id: toastId });
      clearCart();

      setTimeout(() => {
        const message = `Olá! Acabei de finalizar meu pedido de ${formatPrice(total)}.`;
        const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || ''; // Adicione seu número do WhatsApp no .env
        window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      }, 1500);

    } catch (error) {
      console.error('Erro no checkout:', error);
      toast.error((error as Error).message || 'Ocorreu um erro desconhecido.', { id: toastId });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" />
            Continuar Comprando
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Seu Carrinho</h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-4 text-xl font-medium text-gray-900">Seu carrinho está vazio</h2>
            <p className="mt-1 text-sm text-gray-500">Adicione produtos para vê-los aqui.</p>
          </div>
        ) : (
          <form onSubmit={handleCheckout} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <ul role="list" className="divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img src={item.image_url} alt={item.title} className="h-full w-full object-contain object-center" />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <Link to={`/produto/${item.id}`}>{item.title}</Link>
                          </h3>
                          <p className="ml-4">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">Preço Unitário: {formatPrice(item.price)}</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <Button variant="ghost" size="icon" type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-8 w-8">
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input type="text" value={item.quantity} readOnly className="w-12 h-8 text-center border-l border-r rounded-none" />
                          <Button variant="ghost" size="icon" type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-8 w-8">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex">
                          <Button variant="ghost" type="button" onClick={() => removeFromCart(item.id)} className="font-medium text-red-600 hover:text-red-500">
                            <Trash2 className="w-4 h-4 mr-1" /> Remover
                          </Button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <Card className="lg:col-span-1 h-fit">
              <CardHeader>
                <CardTitle>Resumo e Checkout</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input id="name" name="name" value={customerInfo.name} onChange={handleInputChange} placeholder="Seu nome completo" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input id="whatsapp" name="whatsapp" type="tel" value={customerInfo.whatsapp} onChange={handleInputChange} placeholder="(XX) 9XXXX-XXXX" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" value={customerInfo.email} onChange={handleInputChange} placeholder="seu@email.com" />
                </div>
                <p className="text-xs text-muted-foreground pt-1">Preencha ao menos uma forma de contato.</p>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" size="lg">Finalizar e Enviar Pedido</Button>
              </CardFooter>
            </Card>
          </form>
        )}
      </main>
    </div>
  );
};

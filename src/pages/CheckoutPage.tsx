import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import toast from 'react-hot-toast';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
};

const CheckoutPage: React.FC = () => {
  const { total, getCartPayload, clearCart, items } = useCart();
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

    if (items.length === 0) {
      toast.error('Seu carrinho está vazio.');
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
        const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '';
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
          <Link to="/carrinho" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Carrinho
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Finalizar Compra</h1>
        </div>

        <form onSubmit={handleCheckout} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Seus Dados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input id="name" name="name" value={customerInfo.name} onChange={handleInputChange} placeholder="Seu nome completo" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    <Input id="whatsapp" name="whatsapp" type="tel" value={customerInfo.whatsapp} onChange={handleInputChange} placeholder="(XX) 9XXXX-XXXX" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={customerInfo.email} onChange={handleInputChange} placeholder="seu@email.com" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground pt-1">Preencha ao menos uma forma de contato.</p>
              </CardContent>
            </Card>
          </div>

          <Card className="lg:col-span-1 h-fit">
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Frete</span>
                <span>A calcular</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button type="submit" className="w-full" size="lg">Finalizar e Enviar Pedido</Button>
              <Link to="/carrinho" className="w-full">
                <Button type="button" variant="outline" className="w-full" size="lg">Voltar ao Carrinho</Button>
              </Link>
            </CardFooter>
          </Card>
        </form>
      </main>
    </div>
  );
};

export default CheckoutPage;

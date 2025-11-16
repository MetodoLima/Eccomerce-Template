import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';
import { useOrder } from '@/hooks/useOrder';
import { CustomerInfo } from '@/types/supabase';
import { validateEmail, formatPhoneNumber, validatePhoneNumber } from '@/lib/utils';
import { toast } from 'react-hot-toast';

// Formatar preço para exibição
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL' 
  }).format(price);
};

// Validação de formulário
type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
};

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { total, items, clearCart } = useCart();
  const { createOrder, isLoading } = useOrder();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirecionar se o carrinho estiver vazio
  useEffect(() => {
    if (items.length === 0) {
      toast.error('Seu carrinho está vazio.');
      navigate('/carrinho');
    }
  }, [items, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Formatar telefone enquanto digita
    if (name === 'phone') {
      const formattedPhone = formatPhoneNumber(value);
      setFormData(prev => ({ ...prev, [name]: formattedPhone }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Limpar erro do campo ao editar
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'WhatsApp é obrigatório';
    } else if (!validatePhoneNumber(formData.phone)) {
      newErrors.phone = 'Número de WhatsApp inválido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Preparar dados do cliente
      const customerInfo: CustomerInfo = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.replace(/\D/g, ''), // Remove formatação
        notes: ''
      };
      
      // ID da loja (pode vir de uma configuração ou contexto)
      const storeId = import.meta.env.VITE_STORE_ID || 'default-store';
      
      // Criar o pedido
      const { order, error } = await createOrder(customerInfo, items, storeId);
      
      if (error) throw error;
      
      // Limpar carrinho e redirecionar
      clearCart();
      
      // Redirecionar para página de confirmação
      navigate(`/pedido/${order?.id}`);
      
    } catch (error) {
      console.error('Erro ao processar pedido:', error);
      toast.error('Ocorreu um erro ao processar seu pedido. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Seu carrinho está vazio</h2>
          <p className="text-gray-600 mb-6">Adicione itens ao carrinho antes de finalizar a compra.</p>
          <Button asChild>
            <Link to="/produtos">Ver Produtos</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link 
            to="/carrinho" 
            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao carrinho
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Finalizar Compra</h1>
        </div>

        <form onSubmit={handleSubmit} className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Seção de informações do cliente */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Informações para Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Nome Completo *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={errors.name ? 'border-red-500' : ''}
                    placeholder="Seu nome completo"
                    autoComplete="name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      WhatsApp *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={errors.phone ? 'border-red-500' : ''}
                      placeholder="(00) 00000-0000"
                      autoComplete="tel"
                    />
                    {errors.phone ? (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    ) : (
                      <p className="mt-1 text-xs text-gray-500">
                        Enviaremos atualizações pelo WhatsApp
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      E-mail
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? 'border-red-500' : ''}
                      placeholder="seu@email.com"
                      autoComplete="email"
                    />
                    {errors.email ? (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    ) : (
                      <p className="mt-1 text-xs text-gray-500">
                        Para receber o comprovante
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resumo do pedido */}
          <div className="mt-10 lg:mt-0">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(total)}</span>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Frete calculado na próxima etapa
                    </p>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full mt-6 flex justify-center"
                    disabled={isSubmitting || isLoading}
                  >
                    {isSubmitting || isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      'Finalizar Pedido'
                    )}
                  </Button>

                  <p className="mt-4 text-center text-sm text-gray-500">
                    Seu pedido será processado e você receberá as informações por WhatsApp.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;

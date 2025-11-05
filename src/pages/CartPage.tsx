import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ProductSection from '@/components/ProductSection';
import { products } from '@/data/products';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
};

export const CartPage: React.FC = () => {
  const { items, total, updateQuantity, removeFromCart } = useCart();

  const cartProductIds = new Set(items.map(i => i.id));
  const categories = new Set(items.map(i => i.category));
  const related = products
    .filter(p => !cartProductIds.has(p.id) && (categories.size === 0 || categories.has(p.category)))
    .slice(0, 8);
  const fallback = products.filter(p => p.isFeatured || p.isTopRated || p.isNew).slice(0, 8);
  const relatedProducts = related.length > 0 ? related : fallback;

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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
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
                <CardTitle>Resumo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Link to="/checkout" className="w-full">
                  <Button className="w-full" size="lg">Finalizar Compra</Button>
                </Link>
                <Link to="/" className="w-full">
                  <Button variant="outline" className="w-full" size="lg">Continuar Comprando</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        )}

        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <ProductSection centerTitle title="Você também pode gostar" products={relatedProducts} />
          </div>
        )}
      </main>
    </div>
  );
};

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { User } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import toast from 'react-hot-toast';

export function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    const toastId = toast.loading('Saindo...');
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message, { id: toastId });
    } else {
      toast.success('Você saiu da sua conta.', { id: toastId });
    }
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-gray-800">Logo</a>
          </div>
          <div className="flex items-center">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">Olá, {user.user_metadata.name || user.email}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Meu Carrinho</DropdownMenuItem>
                  <DropdownMenuItem>Meus Pedidos</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>Sair</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button>Login / Conta</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="login">Login</TabsTrigger>
                      <TabsTrigger value="register">Criar Conta</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                      <DialogHeader className="mb-4">
                        <DialogTitle>Login</DialogTitle>
                      </DialogHeader>
                      <LoginForm onLoginSuccess={closeModal} />
                    </TabsContent>
                    <TabsContent value="register">
                      <DialogHeader className="mb-4">
                        <DialogTitle>Criar Conta</DialogTitle>
                      </DialogHeader>
                      <RegisterForm onRegisterSuccess={closeModal} />
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

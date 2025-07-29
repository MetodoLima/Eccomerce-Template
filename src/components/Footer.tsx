import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-foreground text-background mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-accent">TechStore</h3>
            <p className="text-sm text-background/80 mb-4">
              Sua loja especializada em produtos Apple e tecnologia de ponta. 
              Oferecemos qualidade, garantia e o melhor atendimento.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-background/60 hover:text-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-accent transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4 text-accent">Produtos</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/categoria/iphones" className="text-background/80 hover:text-accent transition-colors">iPhones</Link></li>
              <li><Link to="/categoria/macs" className="text-background/80 hover:text-accent transition-colors">Macs</Link></li>
              <li><Link to="/categoria/ipads" className="text-background/80 hover:text-accent transition-colors">iPads</Link></li>
              <li><Link to="/categoria/watchs" className="text-background/80 hover:text-accent transition-colors">Apple Watch</Link></li>
              <li><Link to="/categoria/airpods" className="text-background/80 hover:text-accent transition-colors">AirPods</Link></li>
              <li><Link to="/categoria/acessorios" className="text-background/80 hover:text-accent transition-colors">Acessórios</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-accent">Suporte</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contato" className="text-background/80 hover:text-accent transition-colors">Contato</Link></li>
              <li><Link to="/faq" className="text-background/80 hover:text-accent transition-colors">FAQ</Link></li>
              <li><Link to="/garantia" className="text-background/80 hover:text-accent transition-colors">Garantia</Link></li>
              <li><Link to="/trocas-devolucoes" className="text-background/80 hover:text-accent transition-colors">Trocas e Devoluções</Link></li>
              <li><Link to="/rastreamento" className="text-background/80 hover:text-accent transition-colors">Rastreamento</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-accent">Contato</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" />
                <span className="text-background/80">(11) 9999-9999</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                <span className="text-background/80">contato@techstore.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-accent mt-0.5" />
                <span className="text-background/80">
                  Av. Paulista, 1000<br />
                  São Paulo - SP<br />
                  CEP: 01310-100
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-background/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-background/60 mb-4 md:mb-0">
            © 2024 TechStore. Todos os direitos reservados.
          </div>
          <div className="flex space-x-6 text-sm">
            <Link to="/privacidade" className="text-background/60 hover:text-accent transition-colors">
              Política de Privacidade
            </Link>
            <Link to="/termos" className="text-background/60 hover:text-accent transition-colors">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
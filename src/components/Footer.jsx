import React from 'react';
import { MapPin, Phone, Clock, Instagram, Facebook, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative py-16 bg-gradient-to-b from-gray-950 via-red-950 to-gray-950 overflow-hidden text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiM3ZjFhMWEiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4zIj48cGF0aCBkPSJNIDAgMCBMIDYwIDYwIE0gNjAgMCBMIDAgNjAiLz48L2c+PC9zdmc+')]"></div>
      </div>

      {/* Gradient Border Top (ÚNICA linha divisória) */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400"></div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Contato */}
          <div className="bg-red-900/20 backdrop-blur-sm border border-red-700/30 rounded-xl p-6">
            <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-yellow-400 mt-1 flex-shrink-0" />
                <span className="text-red-100">Rua dos Hambúrgueres, 123<br />Nova Iguaçu, RJ</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-yellow-400 flex-shrink-0" />
                <span className="text-red-100">(21) 99999-9999</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-yellow-400 flex-shrink-0" />
                <span className="text-red-100">contato@burgerhouse.com</span>
              </div>
            </div>
          </div>

          {/* Horário de Funcionamento */}
          <div className="bg-red-900/20 backdrop-blur-sm border border-red-700/30 rounded-xl p-6">
            <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4">Horário</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-yellow-400 flex-shrink-0" />
                <div>
                  <p className="text-red-100 font-medium">Segunda a Quinta</p>
                  <p className="text-red-200">17:00 - 23:00</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-yellow-400 flex-shrink-0" />
                <div>
                  <p className="text-red-100 font-medium">Sexta a Domingo</p>
                  <p className="text-red-200">17:00 - 00:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Redes Sociais */}
          <div className="bg-red-900/20 backdrop-blur-sm border border-red-700/30 rounded-xl p-6">
            <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4">Siga-nos</h3>
            <div className="flex gap-4">
              <a href="#" role="button" className="bg-red-800/40 hover:bg-red-700/60 p-3 rounded-full transition-all duration-300 border border-red-700/30">
                <Instagram size={20} className="text-yellow-400" />
              </a>
              <a href="#" role="button" className="bg-red-800/40 hover:bg-red-700/60 p-3 rounded-full transition-all duration-300 border border-red-700/30">
                <Facebook size={20} className="text-yellow-400" />
              </a>
              <a href="#" role="button" className="bg-red-800/40 hover:bg-red-700/60 p-3 rounded-full transition-all duration-300 border border-red-700/30">
                <Phone size={20} className="text-yellow-400" />
              </a>
            </div>
            <p className="text-red-200 mt-4">Siga nossas redes para promoções exclusivas!</p>
          </div>

          {/* Formas de Pagamento */}
          <div className="bg-red-900/20 backdrop-blur-sm border border-red-700/30 rounded-xl p-6">
            <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4">Pagamento</h3>
            <div className="grid grid-cols-3 gap-2">
              {['Visa', 'Mastercard', 'Pix', 'Dinheiro', 'Elo', 'Ticket'].map((method, index) => (
                <div key={index} className="bg-red-800/30 p-2 rounded text-center text-xs text-red-100 border border-red-700/20">
                  {method}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright - Estilo mais profissional */}
        <div className="text-center pt-8">
          <p className="text-red-300 text-sm">
            © 2025 Burger House. Todos os direitos reservados.{' '}
            <span className="text-red-200">
              Desenvolvido por{' '}
              <a
                href="https://alexandrogranja.github.io/Portfolio/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-yellow-400 hover:text-yellow-300 transition-colors duration-200 hover:underline underline-offset-2"
              >
                Alexandro Granja
              </a>
            </span>
          </p>
        </div>
    </footer>
  );
};

export default Footer;
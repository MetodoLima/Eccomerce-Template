import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const OrderSuccessPage: React.FC = () => {
  const { id } = useParams()

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Obrigado por realizar o pedido!</h1>
          <p className="mt-4 text-gray-600">
            Uma mensagem de confirmação foi enviada para o e-mail informado. O procedimento será continuado pelo WhatsApp.
          </p>
          {id && (
            <p className="mt-2 text-sm text-gray-500">Número do pedido: <span className="font-mono">{id}</span></p>
          )}

          <div className="mt-8 flex items-center justify-center gap-3">
            <Button asChild>
              <Link to="/">Voltar para a loja</Link>
            </Button>
            <Button variant="outline" asChild>
              <a
                href={`https://wa.me/${(import.meta as any).env?.VITE_WHATSAPP_NUMBER || ''}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccessPage

'use client'

import { DollarSign } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { StatCard } from '@/components/ui/stat-card'
import { StarRating } from '@/components/forms/star-rating'

const mockHistorico = [
  { id: '1', title: 'Garçom para Casamento', company: 'Buffet Real', date: '2026-03-15', payment: 18000, rating: 5 },
  { id: '2', title: 'Promotor de Vendas', company: 'Eventos Star', date: '2026-03-10', payment: 15000, rating: 4 },
  { id: '3', title: 'Auxiliar de Cozinha', company: 'Restaurante Sabor', date: '2026-03-05', payment: 16000, rating: 5 },
  { id: '4', title: 'Recepcionista', company: 'Hotel Premium', date: '2026-02-28', payment: 14000, rating: 4 },
  { id: '5', title: 'Barman', company: 'Bar do Beco', date: '2026-02-20', payment: 20000, rating: 5 },
]

function fmt(c: number) { return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(c / 100) }

export default function HistoricoTrabPage() {
  const totalGanhos = mockHistorico.reduce((s, h) => s + h.payment, 0)

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <h1 className="text-2xl font-bold text-foreground">Histórico de Trabalhos</h1>

      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard title="Total de Ganhos" value={fmt(totalGanhos)} icon={DollarSign} iconColor="bg-success-100 text-success-600" />
        <StatCard title="Trabalhos Realizados" value={mockHistorico.length.toString()} icon={DollarSign} iconColor="bg-primary-100 text-primary-600" />
      </div>

      <div className="space-y-3">
        {mockHistorico.map((h) => (
          <Card key={h.id}>
            <CardContent className="pt-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">{h.title}</p>
                  <p className="text-sm text-foreground-secondary">{h.company} &middot; {new Date(h.date + 'T00:00:00').toLocaleDateString('pt-BR')}</p>
                  {h.rating && <StarRating value={h.rating} readonly size="sm" />}
                </div>
                <p className="text-lg font-bold text-success-600">{fmt(h.payment)}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

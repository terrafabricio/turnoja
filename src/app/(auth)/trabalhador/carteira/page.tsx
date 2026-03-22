'use client'

import { useState } from 'react'
import { Wallet, ArrowUpRight, ArrowDownLeft, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils/cn'

const mockTransactions = [
  { id: '1', description: 'Pagamento - Garçom Casamento', type: 'credit', amount: 18000, date: '2026-03-16', balance: 125000 },
  { id: '2', description: 'Pagamento - Promotor PDV', type: 'credit', amount: 15000, date: '2026-03-11', balance: 107000 },
  { id: '3', description: 'Saque PIX', type: 'withdrawal', amount: -50000, date: '2026-03-10', balance: 92000 },
  { id: '4', description: 'Pagamento - Auxiliar Cozinha', type: 'credit', amount: 16000, date: '2026-03-06', balance: 142000 },
  { id: '5', description: 'Saque PIX', type: 'withdrawal', amount: -80000, date: '2026-03-01', balance: 126000 },
  { id: '6', description: 'Pagamento - Recepcionista', type: 'credit', amount: 14000, date: '2026-02-28', balance: 206000 },
]

function fmt(c: number) { return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Math.abs(c) / 100) }

export default function CarteiraPage() {
  const [filter, setFilter] = useState('todos')
  const filtered = filter === 'todos' ? mockTransactions : mockTransactions.filter(t => t.type === filter)

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <h1 className="text-2xl font-bold text-foreground">Carteira</h1>

      <Card className="overflow-hidden">
        <div className="gradient-hero p-6 text-white">
          <p className="text-sm opacity-80">Saldo Disponível</p>
          <p className="text-4xl font-bold mt-1">R$ 1.250,00</p>
          <div className="flex items-center gap-1 mt-2 text-sm opacity-80">
            <TrendingUp className="h-4 w-4" />
            <span>+R$ 490,00 este mês</span>
          </div>
          <Button variant="accent" className="mt-4" size="sm">Solicitar Saque</Button>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Transações</CardTitle>
            <div className="flex gap-1">
              {[['todos', 'Todos'], ['credit', 'Créditos'], ['withdrawal', 'Saques']].map(([key, label]) => (
                <button key={key} onClick={() => setFilter(key)} className={cn('px-3 py-1 text-xs font-medium rounded-full transition-colors', filter === key ? 'bg-primary-100 text-primary-700' : 'text-foreground-secondary hover:bg-gray-50')}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {filtered.map((t) => (
              <div key={t.id} className="flex items-center gap-4 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg', t.amount > 0 ? 'bg-success-100' : 'bg-danger-100')}>
                  {t.amount > 0 ? <ArrowDownLeft className="h-4 w-4 text-success-600" /> : <ArrowUpRight className="h-4 w-4 text-danger-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{t.description}</p>
                  <p className="text-xs text-foreground-muted">{new Date(t.date + 'T00:00:00').toLocaleDateString('pt-BR')}</p>
                </div>
                <p className={cn('text-sm font-semibold', t.amount > 0 ? 'text-success-600' : 'text-danger-600')}>
                  {t.amount > 0 ? '+' : '-'}{fmt(t.amount)}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

'use client'

import { Bell, Briefcase, CheckCircle, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn'

const mockNotifs = [
  { id: '1', title: 'Candidatura aceita!', message: 'Buffet Real aceitou sua candidatura para "Garçom para Casamento"', type: 'success', read: false, time: 'há 1 hora' },
  { id: '2', title: 'Nova vaga na sua região', message: 'Barman para Inauguração - R$ 200,00 - São Paulo/SP', type: 'job', read: false, time: 'há 3 horas' },
  { id: '3', title: 'Pagamento recebido', message: 'R$ 180,00 referente a "Promotor de Vendas" foi creditado', type: 'payment', read: true, time: 'há 1 dia' },
  { id: '4', title: 'Avaliação recebida', message: 'Eventos Star te avaliou com 4 estrelas', type: 'review', read: true, time: 'há 2 dias' },
]

const iconMap: Record<string, { icon: typeof Bell; color: string }> = {
  success: { icon: CheckCircle, color: 'bg-success-100 text-success-600' },
  job: { icon: Briefcase, color: 'bg-primary-100 text-primary-600' },
  payment: { icon: CheckCircle, color: 'bg-accent-100 text-accent-600' },
  review: { icon: Star, color: 'bg-warning-100 text-warning-600' },
}

export default function NotificacoesTrabPage() {
  const unread = mockNotifs.filter(n => !n.read).length
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Notificações</h1>
        {unread > 0 && <Button variant="ghost" size="sm">Marcar todas como lidas</Button>}
      </div>
      <div className="space-y-2">
        {mockNotifs.map((n) => {
          const ic = iconMap[n.type] || { icon: Bell, color: 'bg-gray-100 text-gray-600' }
          const Icon = ic.icon
          return (
            <div key={n.id} className={cn('flex items-start gap-4 rounded-lg border border-border p-4', !n.read && 'bg-primary-50/50 border-primary-100')}>
              <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-lg', ic.color)}><Icon className="h-5 w-5" /></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={cn('text-sm', !n.read ? 'font-semibold' : 'font-medium')}>{n.title}</p>
                  <span className="shrink-0 text-xs text-foreground-muted">{n.time}</span>
                </div>
                <p className="text-sm text-foreground-secondary">{n.message}</p>
              </div>
              {!n.read && <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary-600" />}
            </div>
          )
        })}
      </div>
    </div>
  )
}

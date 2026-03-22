'use client'

import { Bell, Briefcase, CheckCircle, User, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn'

const mockNotificacoes = [
  { id: '1', title: 'Nova candidatura', message: 'João Silva se candidatou para "Garçom para Evento"', type: 'application', read: false, time: 'há 30 min' },
  { id: '2', title: 'Candidatura aceita', message: 'Maria Santos confirmou presença para "Promotora PDV"', type: 'confirmation', read: false, time: 'há 2 horas' },
  { id: '3', title: 'Avaliação recebida', message: 'Pedro Oliveira avaliou seu evento com 5 estrelas', type: 'review', read: true, time: 'há 1 dia' },
  { id: '4', title: 'Vaga encerrada', message: 'A vaga "Auxiliar de Cozinha" foi concluída com sucesso', type: 'job', read: true, time: 'há 2 dias' },
  { id: '5', title: 'Pagamento processado', message: 'Pagamento de R$ 180,00 para Ana Costa foi confirmado', type: 'payment', read: true, time: 'há 3 dias' },
]

const iconMap: Record<string, { icon: typeof Bell; color: string }> = {
  application: { icon: User, color: 'bg-primary-100 text-primary-600' },
  confirmation: { icon: CheckCircle, color: 'bg-success-100 text-success-600' },
  review: { icon: Bell, color: 'bg-warning-100 text-warning-600' },
  job: { icon: Briefcase, color: 'bg-secondary-100 text-secondary-600' },
  payment: { icon: CheckCircle, color: 'bg-accent-100 text-accent-600' },
}

export default function NotificacoesPage() {
  const unread = mockNotificacoes.filter(n => !n.read).length

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notificações</h1>
          {unread > 0 && <p className="text-sm text-foreground-secondary">{unread} não lida{unread > 1 ? 's' : ''}</p>}
        </div>
        {unread > 0 && <Button variant="ghost" size="sm">Marcar todas como lidas</Button>}
      </div>

      <div className="space-y-2">
        {mockNotificacoes.map((n) => {
          const ic = iconMap[n.type] || { icon: Bell, color: 'bg-gray-100 text-gray-600' }
          const Icon = ic.icon
          return (
            <div key={n.id} className={cn('flex items-start gap-4 rounded-lg border border-border p-4 transition-colors', !n.read && 'bg-primary-50/50 border-primary-100')}>
              <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-lg', ic.color)}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={cn('text-sm', !n.read ? 'font-semibold text-foreground' : 'font-medium text-foreground')}>{n.title}</p>
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

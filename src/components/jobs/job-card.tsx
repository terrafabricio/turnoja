'use client'

import { MapPin, Clock, DollarSign, Users, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { StatusBadge } from '@/components/ui/status-badge'
import { cn } from '@/lib/utils/cn'

interface JobCardProps {
  job: {
    id: string
    title: string
    category: string
    city: string
    state: string
    date: string
    start_time: string
    end_time: string
    payment_amount_cents: number
    slots: number
    filled_slots: number
    status: string
    includes_meal?: boolean
    includes_transport?: boolean
    company?: {
      trade_name: string
      logo_url?: string
    }
  }
  onClick?: () => void
  variant?: 'default' | 'compact'
  showStatus?: boolean
  className?: string
}

const categoryLabels: Record<string, string> = {
  eventos: 'Eventos',
  restaurante: 'Restaurante',
  bar: 'Bar',
  promotor: 'Promotor',
  reposicao: 'Reposição',
  logistica: 'Logística',
  atendimento: 'Atendimento',
  limpeza: 'Limpeza',
  cozinha: 'Cozinha',
  carga_descarga: 'Carga e Descarga',
  operacional: 'Operacional',
  outros: 'Outros',
}

function formatCurrency(cents: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100)
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
}

function formatTime(time: string) {
  return time.slice(0, 5)
}

export function JobCard({ job, onClick, variant = 'default', showStatus = false, className }: JobCardProps) {
  const spotsLeft = job.slots - job.filled_slots

  if (variant === 'compact') {
    return (
      <div
        onClick={onClick}
        className={cn(
          'flex items-center gap-4 rounded-lg border border-border bg-surface p-4 transition-all hover:shadow-sm cursor-pointer',
          className
        )}
      >
        <div className="flex-1 min-w-0">
          <p className="font-medium text-foreground truncate">{job.title}</p>
          <p className="text-sm text-foreground-secondary">
            {job.company?.trade_name} &middot; {job.city}/{job.state}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-semibold text-primary-600">{formatCurrency(job.payment_amount_cents)}</p>
          <p className="text-xs text-foreground-muted">{formatDate(job.date)}</p>
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        'group rounded-xl border border-border bg-surface p-5 transition-all duration-200 hover:shadow-md hover:border-primary-200 cursor-pointer',
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="secondary">{categoryLabels[job.category] || job.category}</Badge>
            {showStatus && <StatusBadge type="job" status={job.status} />}
          </div>
          <h3 className="mt-2 text-base font-semibold text-foreground group-hover:text-primary-600 transition-colors truncate">
            {job.title}
          </h3>
          {job.company && (
            <p className="mt-0.5 text-sm text-foreground-secondary">{job.company.trade_name}</p>
          )}
        </div>
        <div className="text-right shrink-0">
          <p className="text-lg font-bold text-primary-600">{formatCurrency(job.payment_amount_cents)}</p>
          <p className="text-xs text-foreground-muted">por diária</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-foreground-secondary">
        <span className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          {job.city}/{job.state}
        </span>
        <span className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          {formatDate(job.date)}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {formatTime(job.start_time)} - {formatTime(job.end_time)}
        </span>
        <span className="flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5" />
          {spotsLeft > 0 ? `${spotsLeft} vaga${spotsLeft > 1 ? 's' : ''}` : 'Lotada'}
        </span>
      </div>

      {(job.includes_meal || job.includes_transport) && (
        <div className="mt-3 flex gap-2">
          {job.includes_meal && (
            <span className="text-xs bg-success-50 text-success-700 px-2 py-0.5 rounded-full">
              Refeição inclusa
            </span>
          )}
          {job.includes_transport && (
            <span className="text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full">
              Transporte incluso
            </span>
          )}
        </div>
      )}
    </div>
  )
}

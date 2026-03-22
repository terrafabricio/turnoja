import { Star, MapPin, Briefcase } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils/cn'

interface WorkerCardProps {
  worker: {
    id: string
    full_name: string
    avatar_url?: string
    city: string
    state: string
    rating_avg: number
    rating_count: number
    completed_jobs_count: number
    skills: string[]
    categories: string[]
  }
  actions?: React.ReactNode
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
  carga_descarga: 'Carga/Descarga',
  operacional: 'Operacional',
  outros: 'Outros',
}

export function WorkerCard({ worker, actions, className }: WorkerCardProps) {
  const initials = worker.full_name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div className={cn('rounded-xl border border-border bg-surface p-4 transition-all hover:shadow-sm', className)}>
      <div className="flex items-start gap-4">
        <Avatar className="h-12 w-12">
          {worker.avatar_url && <AvatarImage src={worker.avatar_url} alt={worker.full_name} />}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground">{worker.full_name}</h4>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-foreground-secondary">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {worker.city}/{worker.state}
            </span>
            <span className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 text-warning-500 fill-warning-500" />
              {worker.rating_avg.toFixed(1)} ({worker.rating_count})
            </span>
            <span className="flex items-center gap-1">
              <Briefcase className="h-3.5 w-3.5" />
              {worker.completed_jobs_count} trabalhos
            </span>
          </div>

          {worker.categories.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {worker.categories.slice(0, 4).map((cat) => (
                <Badge key={cat} variant="secondary" className="text-xs">
                  {categoryLabels[cat] || cat}
                </Badge>
              ))}
              {worker.categories.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{worker.categories.length - 4}
                </Badge>
              )}
            </div>
          )}
        </div>

        {actions && <div className="flex shrink-0 gap-2">{actions}</div>}
      </div>
    </div>
  )
}

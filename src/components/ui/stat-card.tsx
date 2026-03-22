import { type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: LucideIcon
  iconColor?: string
  className?: string
}

export function StatCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  iconColor = 'bg-primary-100 text-primary-600',
  className,
}: StatCardProps) {
  return (
    <div className={cn('rounded-xl border border-border bg-surface p-5', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-foreground-secondary">{title}</p>
          <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
          {change && (
            <p
              className={cn(
                'mt-1 text-xs font-medium',
                changeType === 'positive' && 'text-success-600',
                changeType === 'negative' && 'text-danger-600',
                changeType === 'neutral' && 'text-foreground-muted'
              )}
            >
              {change}
            </p>
          )}
        </div>
        <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', iconColor)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  )
}

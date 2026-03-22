import { cn } from '@/lib/utils/cn'
import { type LucideIcon } from 'lucide-react'

interface ActivityItem {
  id: string
  icon: LucideIcon
  iconColor: string
  title: string
  description: string
  time: string
}

interface ActivityFeedProps {
  items: ActivityItem[]
  className?: string
}

export function ActivityFeed({ items, className }: ActivityFeedProps) {
  return (
    <div className={cn('space-y-1', className)}>
      {items.map((item, index) => (
        <div
          key={item.id}
          className="flex items-start gap-3 rounded-lg p-3 hover:bg-gray-50 transition-colors"
        >
          <div className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg', item.iconColor)}>
            <item.icon className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">{item.title}</p>
            <p className="text-sm text-foreground-secondary truncate">{item.description}</p>
          </div>
          <span className="shrink-0 text-xs text-foreground-muted">{item.time}</span>
        </div>
      ))}
    </div>
  )
}

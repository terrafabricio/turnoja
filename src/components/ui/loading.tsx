import { cn } from '@/lib/utils/cn'
import { Loader2 } from 'lucide-react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  return <Loader2 className={cn('animate-spin text-primary-600', sizes[size], className)} />
}

export function LoadingPage() {
  return (
    <div className="flex h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <LoadingSpinner size="lg" />
        <p className="text-sm text-foreground-secondary">Carregando...</p>
      </div>
    </div>
  )
}

export function LoadingCard() {
  return (
    <div className="animate-pulse rounded-xl border border-border p-5 space-y-3">
      <div className="h-4 w-2/3 rounded bg-gray-200" />
      <div className="h-3 w-full rounded bg-gray-100" />
      <div className="h-3 w-4/5 rounded bg-gray-100" />
      <div className="flex gap-2 pt-2">
        <div className="h-6 w-16 rounded-full bg-gray-100" />
        <div className="h-6 w-20 rounded-full bg-gray-100" />
      </div>
    </div>
  )
}

export function LoadingTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="animate-pulse space-y-2">
      <div className="h-10 rounded-lg bg-gray-100" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-12 rounded-lg bg-gray-50" />
      ))}
    </div>
  )
}

'use client'

import { Search, SlidersHorizontal } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn'

const categoryOptions = [
  { value: '', label: 'Todas categorias' },
  { value: 'eventos', label: 'Eventos' },
  { value: 'restaurante', label: 'Restaurante' },
  { value: 'bar', label: 'Bar' },
  { value: 'promotor', label: 'Promotor' },
  { value: 'reposicao', label: 'Reposição' },
  { value: 'logistica', label: 'Logística' },
  { value: 'atendimento', label: 'Atendimento' },
  { value: 'limpeza', label: 'Limpeza' },
  { value: 'cozinha', label: 'Cozinha' },
  { value: 'carga_descarga', label: 'Carga e Descarga' },
  { value: 'operacional', label: 'Operacional' },
  { value: 'outros', label: 'Outros' },
]

const sortOptions = [
  { value: 'recent', label: 'Mais Recentes' },
  { value: 'payment_high', label: 'Maior Pagamento' },
  { value: 'payment_low', label: 'Menor Pagamento' },
  { value: 'date', label: 'Data mais Próxima' },
]

interface JobFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  category: string
  onCategoryChange: (value: string) => void
  sortBy: string
  onSortChange: (value: string) => void
  className?: string
}

export function JobFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  sortBy,
  onSortChange,
  className,
}: JobFiltersProps) {
  return (
    <div className={cn('space-y-3', className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted" />
        <input
          type="text"
          placeholder="Buscar vagas por título, empresa ou local..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex h-11 w-full rounded-lg border border-border bg-white pl-10 pr-4 text-sm text-foreground placeholder:text-foreground-muted transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        />
      </div>
      <div className="flex flex-wrap gap-3">
        <div className="w-48">
          <Select
            options={categoryOptions}
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
          />
        </div>
        <div className="w-44">
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

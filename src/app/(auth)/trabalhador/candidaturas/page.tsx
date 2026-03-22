'use client'

import { useState } from 'react'
import { Briefcase } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/ui/status-badge'
import { EmptyState } from '@/components/ui/empty-state'
import { cn } from '@/lib/utils/cn'

const mockCandidaturas = [
  { id: '1', job_title: 'Garçom para Casamento', company: 'Buffet Real', date: '2026-03-28', payment: 18000, status: 'pendente', applied_at: '2026-03-20' },
  { id: '2', job_title: 'Promotor de Vendas', company: 'Eventos Star', date: '2026-03-29', payment: 15000, status: 'aceita', applied_at: '2026-03-19' },
  { id: '3', job_title: 'Barman para Inauguração', company: 'Bar do Beco', date: '2026-04-01', payment: 20000, status: 'pendente', applied_at: '2026-03-21' },
  { id: '4', job_title: 'Recepcionista', company: 'Hotel Premium', date: '2026-03-25', payment: 14000, status: 'recusada', applied_at: '2026-03-18' },
]

const tabs = ['todas', 'pendente', 'aceita', 'recusada'] as const

function fmt(c: number) { return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(c / 100) }

export default function CandidaturasPage() {
  const [activeTab, setActiveTab] = useState<string>('todas')

  const filtered = activeTab === 'todas' ? mockCandidaturas : mockCandidaturas.filter(c => c.status === activeTab)

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <h1 className="text-2xl font-bold text-foreground">Minhas Candidaturas</h1>

      <div className="flex gap-2 border-b border-border pb-2">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={cn('px-3 py-1.5 text-sm font-medium rounded-lg transition-colors', activeTab === tab ? 'bg-primary-100 text-primary-700' : 'text-foreground-secondary hover:bg-gray-50')}>
            {tab === 'todas' ? 'Todas' : tab.charAt(0).toUpperCase() + tab.slice(1) + 's'}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Briefcase} title="Nenhuma candidatura" description="Você ainda não se candidatou a nenhuma vaga." action={{ label: 'Buscar Vagas', onClick: () => {} }} />
      ) : (
        <div className="space-y-3">
          {filtered.map((c) => (
            <Card key={c.id}>
              <CardContent className="pt-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{c.job_title}</p>
                    <p className="text-sm text-foreground-secondary">{c.company} &middot; {new Date(c.date + 'T00:00:00').toLocaleDateString('pt-BR')}</p>
                    <p className="text-sm font-medium text-primary-600 mt-1">{fmt(c.payment)}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <StatusBadge type="application" status={c.status} />
                    <span className="text-xs text-foreground-muted">Candidatou em {new Date(c.applied_at + 'T00:00:00').toLocaleDateString('pt-BR')}</span>
                    {c.status === 'pendente' && <Button variant="ghost" size="sm" className="text-danger-600 hover:text-danger-700">Cancelar</Button>}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

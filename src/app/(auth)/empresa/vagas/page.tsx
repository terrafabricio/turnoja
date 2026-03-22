'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Plus, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { JobCard } from '@/components/jobs/job-card'
import { EmptyState } from '@/components/ui/empty-state'

const tabs = [
  { key: 'todas', label: 'Todas' },
  { key: 'publicada', label: 'Publicadas' },
  { key: 'rascunho', label: 'Rascunhos' },
  { key: 'em_andamento', label: 'Em Andamento' },
  { key: 'concluida', label: 'Concluídas' },
]

const mockJobs = [
  {
    id: '1',
    title: 'Garçom para Evento Corporativo',
    category: 'eventos',
    city: 'São Paulo',
    state: 'SP',
    date: '2026-03-28',
    start_time: '18:00:00',
    end_time: '23:00:00',
    payment_amount_cents: 18000,
    slots: 5,
    filled_slots: 3,
    status: 'publicada',
    includes_meal: true,
    includes_transport: false,
  },
  {
    id: '2',
    title: 'Auxiliar de Cozinha - Restaurante Centro',
    category: 'cozinha',
    city: 'São Paulo',
    state: 'SP',
    date: '2026-03-30',
    start_time: '10:00:00',
    end_time: '16:00:00',
    payment_amount_cents: 15000,
    slots: 3,
    filled_slots: 1,
    status: 'publicada',
    includes_meal: true,
    includes_transport: true,
  },
  {
    id: '3',
    title: 'Promotor de Vendas - Shopping Morumbi',
    category: 'promotor',
    city: 'São Paulo',
    state: 'SP',
    date: '2026-04-01',
    start_time: '09:00:00',
    end_time: '18:00:00',
    payment_amount_cents: 22000,
    slots: 4,
    filled_slots: 4,
    status: 'em_andamento',
    includes_meal: false,
    includes_transport: false,
  },
  {
    id: '4',
    title: 'Recepcionista para Congresso de Tecnologia',
    category: 'atendimento',
    city: 'Campinas',
    state: 'SP',
    date: '2026-04-05',
    start_time: '08:00:00',
    end_time: '17:00:00',
    payment_amount_cents: 20000,
    slots: 6,
    filled_slots: 0,
    status: 'rascunho',
    includes_meal: true,
    includes_transport: false,
  },
  {
    id: '5',
    title: 'Operador de Carga - Galpão Zona Leste',
    category: 'carga_descarga',
    city: 'São Paulo',
    state: 'SP',
    date: '2026-03-15',
    start_time: '06:00:00',
    end_time: '14:00:00',
    payment_amount_cents: 16000,
    slots: 8,
    filled_slots: 8,
    status: 'concluida',
    includes_meal: true,
    includes_transport: true,
  },
  {
    id: '6',
    title: 'Auxiliar de Limpeza - Escritório Corporativo',
    category: 'limpeza',
    city: 'São Paulo',
    state: 'SP',
    date: '2026-04-10',
    start_time: '07:00:00',
    end_time: '13:00:00',
    payment_amount_cents: 12000,
    slots: 2,
    filled_slots: 1,
    status: 'publicada',
    includes_meal: false,
    includes_transport: true,
  },
]

export default function EmpresaVagasPage() {
  const [activeTab, setActiveTab] = useState('todas')
  const router = useRouter()

  const filteredJobs =
    activeTab === 'todas'
      ? mockJobs
      : mockJobs.filter((job) => job.status === activeTab)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Minhas Vagas</h1>
          <p className="mt-1 text-sm text-foreground-secondary">
            Gerencie todas as suas vagas de trabalho
          </p>
        </div>
        <Link href="/empresa/vagas/nova">
          <Button>
            <Plus className="h-4 w-4" />
            Nova Vaga
          </Button>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="mt-6 flex gap-1 overflow-x-auto rounded-lg bg-gray-100 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-white text-foreground shadow-sm'
                : 'text-foreground-secondary hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Job List */}
      <div className="mt-6">
        {filteredJobs.length > 0 ? (
          <div className="space-y-3">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                showStatus
                onClick={() => router.push(`/empresa/vagas/${job.id}`)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Briefcase}
            title="Nenhuma vaga encontrada"
            description="Não há vagas com o filtro selecionado. Crie uma nova vaga para começar."
            action={{
              label: 'Nova Vaga',
              onClick: () => router.push('/empresa/vagas/nova'),
            }}
          />
        )}
      </div>
    </div>
  )
}

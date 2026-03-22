'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Briefcase,
  DollarSign,
  Star,
  Clock,
  Search,
  MapPin,
  Calendar,
  ArrowRight,
} from 'lucide-react'
import { StatCard } from '@/components/ui/stat-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { JobCard } from '@/components/jobs/job-card'

const upcomingJobs = [
  {
    id: '1',
    title: 'Garçom - Casamento',
    company: 'Buffet Estrela',
    date: '2026-03-24',
    time: '16:00 - 00:00',
    location: 'São Paulo, SP',
    payment: 'R$ 180,00',
    status: 'confirmado' as const,
  },
  {
    id: '2',
    title: 'Auxiliar de Cozinha',
    company: 'Restaurante Sabor & Arte',
    date: '2026-03-26',
    time: '10:00 - 18:00',
    location: 'São Paulo, SP',
    payment: 'R$ 150,00',
    status: 'confirmado' as const,
  },
  {
    id: '3',
    title: 'Promotor de Vendas',
    company: 'Agência Impulso',
    date: '2026-03-28',
    time: '09:00 - 17:00',
    location: 'Guarulhos, SP',
    payment: 'R$ 160,00',
    status: 'pendente' as const,
  },
]

const recommendedJobs = [
  {
    id: 'r1',
    title: 'Barman - Festa Corporativa',
    category: 'bar',
    city: 'São Paulo',
    state: 'SP',
    date: '2026-03-29',
    start_time: '18:00:00',
    end_time: '02:00:00',
    payment_amount_cents: 22000,
    slots: 4,
    filled_slots: 2,
    status: 'publicada',
    includes_meal: true,
    includes_transport: false,
    company: { trade_name: 'EventosPro' },
  },
  {
    id: 'r2',
    title: 'Auxiliar de Limpeza - Shopping',
    category: 'limpeza',
    city: 'São Paulo',
    state: 'SP',
    date: '2026-03-30',
    start_time: '06:00:00',
    end_time: '14:00:00',
    payment_amount_cents: 14000,
    slots: 6,
    filled_slots: 3,
    status: 'publicada',
    includes_meal: true,
    includes_transport: true,
    company: { trade_name: 'CleanMax Serviços' },
  },
  {
    id: 'r3',
    title: 'Carregador - Mudança Comercial',
    category: 'carga_descarga',
    city: 'Osasco',
    state: 'SP',
    date: '2026-04-01',
    start_time: '07:00:00',
    end_time: '15:00:00',
    payment_amount_cents: 18000,
    slots: 8,
    filled_slots: 5,
    status: 'publicada',
    includes_meal: true,
    includes_transport: false,
    company: { trade_name: 'TransLog Express' },
  },
]

const statusColors = {
  confirmado: 'bg-success-100 text-success-700',
  pendente: 'bg-warning-100 text-warning-700',
}

export default function TrabalhadorDashboardPage() {
  const router = useRouter()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Olá, João!</h1>
          <p className="mt-1 text-foreground-secondary">
            Você tem 2 trabalhos confirmados esta semana. Confira as novidades!
          </p>
        </div>
        <Button onClick={() => router.push('/trabalhador/vagas')}>
          <Search className="h-4 w-4" />
          Buscar Vagas
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Trabalhos Este Mês"
          value={7}
          change="+3 vs. mês passado"
          changeType="positive"
          icon={Briefcase}
          iconColor="bg-primary-100 text-primary-600"
        />
        <StatCard
          title="Ganhos do Mês"
          value="R$ 1.890,00"
          change="+12% vs. mês passado"
          changeType="positive"
          icon={DollarSign}
          iconColor="bg-success-100 text-success-600"
        />
        <StatCard
          title="Avaliação"
          value="4.8"
          change="32 avaliações"
          changeType="neutral"
          icon={Star}
          iconColor="bg-warning-100 text-warning-600"
        />
        <StatCard
          title="Candidaturas Pendentes"
          value={3}
          change="2 novas respostas"
          changeType="neutral"
          icon={Clock}
          iconColor="bg-accent-100 text-accent-600"
        />
      </div>

      {/* Upcoming Jobs */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Próximos Trabalhos</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/trabalhador/agenda')}
          >
            Ver agenda
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-3">
          {upcomingJobs.map((job) => (
            <div
              key={job.id}
              className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4 transition-all hover:shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50">
                <Calendar className="h-5 w-5 text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{job.title}</p>
                <p className="text-sm text-foreground-secondary">
                  {job.company} &middot; {job.time}
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-sm text-foreground-secondary">
                <MapPin className="h-3.5 w-3.5" />
                {job.location}
              </div>
              <div className="text-right shrink-0">
                <p className="font-semibold text-primary-600">{job.payment}</p>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[job.status]}`}
                >
                  {job.status === 'confirmado' ? 'Confirmado' : 'Pendente'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Jobs */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Vagas Recomendadas</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/trabalhador/vagas')}
          >
            Ver todas
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recommendedJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onClick={() => router.push(`/trabalhador/vagas/${job.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

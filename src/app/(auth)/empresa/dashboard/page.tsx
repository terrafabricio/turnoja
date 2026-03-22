'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Briefcase, Users, TrendingUp, Star, Plus, Clock, CheckCircle, UserPlus, AlertCircle } from 'lucide-react'
import { StatCard } from '@/components/ui/stat-card'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { JobCard } from '@/components/jobs/job-card'

const mockStats = {
  vagasAtivas: 8,
  candidaturasPendentes: 23,
  contratacoesDoMes: 45,
  avaliacaoMedia: 4.7,
}

const mockRecentJobs = [
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
]

const mockActivity = [
  {
    id: '1',
    icon: UserPlus,
    iconColor: 'text-primary-600 bg-primary-100',
    title: 'Nova candidatura recebida',
    description: 'Carlos Silva se candidatou para "Garçom para Evento Corporativo"',
    time: 'Há 15 minutos',
  },
  {
    id: '2',
    icon: CheckCircle,
    iconColor: 'text-success-600 bg-success-100',
    title: 'Candidatura aceita',
    description: 'Você aceitou Ana Oliveira para "Auxiliar de Cozinha"',
    time: 'Há 1 hora',
  },
  {
    id: '3',
    icon: Star,
    iconColor: 'text-warning-600 bg-warning-100',
    title: 'Nova avaliação recebida',
    description: 'Pedro Santos avaliou sua empresa com 5 estrelas',
    time: 'Há 3 horas',
  },
  {
    id: '4',
    icon: AlertCircle,
    iconColor: 'text-danger-600 bg-danger-100',
    title: 'Vaga quase lotada',
    description: '"Promotor de Vendas" tem todas as vagas preenchidas',
    time: 'Há 5 horas',
  },
  {
    id: '5',
    icon: Briefcase,
    iconColor: 'text-secondary-600 bg-secondary-100',
    title: 'Vaga publicada',
    description: '"Garçom para Evento Corporativo" foi publicada com sucesso',
    time: 'Ontem às 14:30',
  },
]

export default function EmpresaDashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="mt-1 text-sm text-foreground-secondary">
            Acompanhe suas vagas e atividades recentes
          </p>
        </div>
        <Link href="/empresa/vagas/nova">
          <Button>
            <Plus className="h-4 w-4" />
            Nova Vaga
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          title="Vagas Ativas"
          value={mockStats.vagasAtivas}
          change="+2 esta semana"
          changeType="positive"
          icon={Briefcase}
          iconColor="bg-primary-100 text-primary-600"
        />
        <StatCard
          title="Candidaturas Pendentes"
          value={mockStats.candidaturasPendentes}
          change="+5 hoje"
          changeType="positive"
          icon={Users}
          iconColor="bg-secondary-100 text-secondary-600"
        />
        <StatCard
          title="Contratações do Mês"
          value={mockStats.contratacoesDoMes}
          change="+12% vs mês anterior"
          changeType="positive"
          icon={TrendingUp}
          iconColor="bg-success-100 text-success-600"
        />
        <StatCard
          title="Avaliação Média"
          value={mockStats.avaliacaoMedia}
          change="Baseado em 128 avaliações"
          changeType="neutral"
          icon={Star}
          iconColor="bg-warning-100 text-warning-600"
        />
      </div>

      {/* Content Grid */}
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Recent Jobs */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Vagas Recentes</h2>
            <Link href="/empresa/vagas" className="text-sm font-medium text-primary-600 hover:text-primary-700">
              Ver todas
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {mockRecentJobs.map((job) => (
              <JobCard key={job.id} job={job} showStatus />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-lg font-semibold text-foreground">Atividade Recente</h2>
          <div className="mt-4 space-y-1">
            {mockActivity.map((activity) => {
              const Icon = activity.icon
              return (
                <div key={activity.id} className="flex gap-3 rounded-lg p-3 transition-colors hover:bg-gray-50">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${activity.iconColor}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.title}</p>
                    <p className="mt-0.5 text-xs text-foreground-secondary line-clamp-2">{activity.description}</p>
                    <p className="mt-1 text-xs text-foreground-muted">{activity.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

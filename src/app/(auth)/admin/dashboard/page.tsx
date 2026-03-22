'use client'

import { useState } from 'react'
import {
  Users,
  Building2,
  HardHat,
  Briefcase,
  CreditCard,
  LifeBuoy,
  ArrowRight,
  FileCheck,
  AlertTriangle,
  BarChart3,
  ShieldBan,
} from 'lucide-react'
import { StatCard } from '@/components/ui/stat-card'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

const stats = [
  { title: 'Total Usuarios', value: '2.847', change: '+12% este mes', changeType: 'positive' as const, icon: Users, iconColor: 'bg-primary-100 text-primary-600' },
  { title: 'Empresas Ativas', value: '184', change: '+8 esta semana', changeType: 'positive' as const, icon: Building2, iconColor: 'bg-secondary-100 text-secondary-600' },
  { title: 'Trabalhadores Ativos', value: '2.103', change: '+45 esta semana', changeType: 'positive' as const, icon: HardHat, iconColor: 'bg-accent-100 text-accent-600' },
  { title: 'Vagas Publicadas', value: '326', change: '42 abertas agora', changeType: 'neutral' as const, icon: Briefcase, iconColor: 'bg-success-100 text-success-600' },
  { title: 'Pagamentos Pendentes', value: 'R$ 18.450', change: '23 pendentes', changeType: 'negative' as const, icon: CreditCard, iconColor: 'bg-warning-100 text-warning-600' },
  { title: 'Tickets Abertos', value: '14', change: '3 urgentes', changeType: 'negative' as const, icon: LifeBuoy, iconColor: 'bg-danger-100 text-danger-600' },
]

const recentActivity = [
  { id: '1', action: 'Nova empresa cadastrada', detail: 'Restaurante Sabor & Arte LTDA', time: 'Há 12 min', type: 'empresa' },
  { id: '2', action: 'Documento enviado para verificacao', detail: 'Carlos Silva - RG', time: 'Há 25 min', type: 'documento' },
  { id: '3', action: 'Denuncia recebida', detail: 'Comportamento inadequado - Vaga #1234', time: 'Há 1h', type: 'denuncia' },
  { id: '4', action: 'Pagamento processado', detail: 'R$ 850,00 - Evento Corporativo XYZ', time: 'Há 1h30', type: 'pagamento' },
  { id: '5', action: 'Ticket de suporte aberto', detail: 'Problema com login - Maria Oliveira', time: 'Há 2h', type: 'suporte' },
  { id: '6', action: 'Novo trabalhador cadastrado', detail: 'Joao Pedro Santos', time: 'Há 2h30', type: 'trabalhador' },
  { id: '7', action: 'Vaga publicada', detail: 'Garcom - Evento Casamento Premium', time: 'Há 3h', type: 'vaga' },
  { id: '8', action: 'Avaliacao recebida', detail: '5 estrelas - Buffet Elegance', time: 'Há 4h', type: 'avaliacao' },
]

const quickLinks = [
  { label: 'Usuarios', href: '/admin/usuarios', icon: Users, description: 'Gerenciar usuarios da plataforma' },
  { label: 'Empresas', href: '/admin/empresas', icon: Building2, description: 'Gerenciar empresas cadastradas' },
  { label: 'Trabalhadores', href: '/admin/trabalhadores', icon: HardHat, description: 'Gerenciar trabalhadores' },
  { label: 'Vagas', href: '/admin/vagas', icon: Briefcase, description: 'Gerenciar vagas publicadas' },
  { label: 'Pagamentos', href: '/admin/pagamentos', icon: CreditCard, description: 'Acompanhar pagamentos' },
  { label: 'Verificacoes', href: '/admin/verificacoes', icon: FileCheck, description: 'Verificar documentos pendentes' },
  { label: 'Denuncias', href: '/admin/denuncias', icon: AlertTriangle, description: 'Resolver denuncias' },
  { label: 'Suporte', href: '/admin/suporte', icon: LifeBuoy, description: 'Tickets de suporte' },
  { label: 'Metricas', href: '/admin/metricas', icon: BarChart3, description: 'Metricas da plataforma' },
  { label: 'Suspensoes', href: '/admin/suspensoes', icon: ShieldBan, description: 'Gerenciar suspensoes' },
]

const activityBadgeVariant: Record<string, 'primary' | 'warning' | 'danger' | 'success' | 'default'> = {
  empresa: 'primary',
  documento: 'warning',
  denuncia: 'danger',
  pagamento: 'success',
  suporte: 'warning',
  trabalhador: 'primary',
  vaga: 'success',
  avaliacao: 'default',
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Painel Administrativo</h1>
        <p className="mt-1 text-sm text-foreground-secondary">
          Visao geral da plataforma TurnoJa
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 border-b border-border pb-3 last:border-0 last:pb-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-sm text-foreground-secondary truncate">{activity.detail}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <Badge variant={activityBadgeVariant[activity.type] ?? 'default'}>
                      {activity.type}
                    </Badge>
                    <span className="text-xs text-foreground-muted">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card>
          <CardHeader>
            <CardTitle>Acesso Rapido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-gray-50"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                    <link.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{link.label}</p>
                    <p className="text-xs text-foreground-muted truncate">{link.description}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-foreground-muted" />
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

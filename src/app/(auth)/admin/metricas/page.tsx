'use client'

import { Users, Briefcase, DollarSign, TrendingUp, Star, BarChart3 } from 'lucide-react'
import { StatCard } from '@/components/ui/stat-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminMetricasPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <h1 className="text-2xl font-bold text-foreground">Métricas e Relatórios</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Usuários Totais" value="1.247" icon={Users} change="+12% este mês" changeType="positive" />
        <StatCard title="Vagas Publicadas" value="342" icon={Briefcase} change="+8% este mês" changeType="positive" iconColor="bg-secondary-100 text-secondary-600" />
        <StatCard title="GMV do Mês" value="R$ 45.800" icon={DollarSign} change="+23% vs mês anterior" changeType="positive" iconColor="bg-success-100 text-success-600" />
        <StatCard title="Taxa de Conversão" value="68%" icon={TrendingUp} change="+5pp" changeType="positive" iconColor="bg-accent-100 text-accent-600" />
        <StatCard title="Avaliação Média" value="4.6" icon={Star} iconColor="bg-warning-100 text-warning-600" />
        <StatCard title="Taxa Plataforma" value="R$ 4.580" icon={BarChart3} change="10% do GMV" changeType="neutral" iconColor="bg-primary-100 text-primary-600" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Vagas por Categoria</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { label: 'Eventos', value: 85, pct: 25 },
                { label: 'Restaurante', value: 62, pct: 18 },
                { label: 'Promotor', value: 48, pct: 14 },
                { label: 'Logística', value: 42, pct: 12 },
                { label: 'Cozinha', value: 38, pct: 11 },
                { label: 'Outros', value: 67, pct: 20 },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="w-24 text-sm text-foreground-secondary">{item.label}</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-500 rounded-full" style={{ width: `${item.pct}%` }} />
                  </div>
                  <span className="w-8 text-sm font-medium text-foreground text-right">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Crescimento Mensal</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-48 text-foreground-muted text-sm">
              Gráfico de crescimento (integrar com biblioteca de charts)
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

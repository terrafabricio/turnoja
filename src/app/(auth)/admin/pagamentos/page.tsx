'use client'

import { DollarSign, Clock, CheckCircle } from 'lucide-react'
import { StatCard } from '@/components/ui/stat-card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { StatusBadge } from '@/components/ui/status-badge'

function fmt(c: number) { return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(c / 100) }

const mock = [
  { id: '1', worker: 'João Silva', company: 'Buffet Real', job: 'Garçom', amount: 18000, fee: 1800, status: 'pago', date: '2026-03-16' },
  { id: '2', worker: 'Maria Santos', company: 'Buffet Real', job: 'Garçom', amount: 18000, fee: 1800, status: 'pago', date: '2026-03-16' },
  { id: '3', worker: 'Pedro Oliveira', company: 'Eventos Star', job: 'Promotor', amount: 15000, fee: 1500, status: 'pendente', date: '2026-03-20' },
]

export default function AdminPagamentosPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <h1 className="text-2xl font-bold text-foreground">Gestão de Pagamentos</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="Total Processado" value={fmt(510000)} icon={DollarSign} iconColor="bg-primary-100 text-primary-600" />
        <StatCard title="Pendente" value={fmt(15000)} icon={Clock} iconColor="bg-warning-100 text-warning-600" />
        <StatCard title="Taxa Plataforma" value={fmt(51000)} icon={CheckCircle} iconColor="bg-success-100 text-success-600" />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Trabalhador</TableHead>
            <TableHead>Empresa</TableHead>
            <TableHead>Vaga</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Taxa</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Data</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mock.map((p) => (
            <TableRow key={p.id}>
              <TableCell className="font-medium">{p.worker}</TableCell>
              <TableCell>{p.company}</TableCell>
              <TableCell>{p.job}</TableCell>
              <TableCell>{fmt(p.amount)}</TableCell>
              <TableCell className="text-foreground-secondary">{fmt(p.fee)}</TableCell>
              <TableCell><StatusBadge type="payment" status={p.status} /></TableCell>
              <TableCell>{new Date(p.date + 'T00:00:00').toLocaleDateString('pt-BR')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

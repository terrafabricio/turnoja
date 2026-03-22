'use client'

import { DollarSign, Clock, CheckCircle } from 'lucide-react'
import { StatCard } from '@/components/ui/stat-card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { StatusBadge } from '@/components/ui/status-badge'

const mockPagamentos = [
  { id: '1', worker: 'João Silva', vaga: 'Garçom Evento', date: '2026-03-15', amount: 18000, status: 'pago' },
  { id: '2', worker: 'Maria Santos', vaga: 'Garçom Evento', date: '2026-03-15', amount: 18000, status: 'pago' },
  { id: '3', worker: 'Pedro Oliveira', vaga: 'Promotor PDV', date: '2026-03-20', amount: 15000, status: 'pendente' },
  { id: '4', worker: 'Ana Costa', vaga: 'Aux. Cozinha', date: '2026-03-18', amount: 16000, status: 'processando' },
]

function fmt(c: number) { return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(c / 100) }

export default function PagamentosPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <h1 className="text-2xl font-bold text-foreground">Pagamentos</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="Total Gasto" value={fmt(232000)} icon={DollarSign} iconColor="bg-primary-100 text-primary-600" />
        <StatCard title="Pendente" value={fmt(31000)} icon={Clock} iconColor="bg-warning-100 text-warning-600" />
        <StatCard title="Pago este mês" value={fmt(201000)} icon={CheckCircle} iconColor="bg-success-100 text-success-600" />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Trabalhador</TableHead>
            <TableHead>Vaga</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockPagamentos.map((p) => (
            <TableRow key={p.id}>
              <TableCell className="font-medium">{p.worker}</TableCell>
              <TableCell>{p.vaga}</TableCell>
              <TableCell>{new Date(p.date + 'T00:00:00').toLocaleDateString('pt-BR')}</TableCell>
              <TableCell><StatusBadge type="payment" status={p.status} /></TableCell>
              <TableCell className="text-right font-semibold">{fmt(p.amount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

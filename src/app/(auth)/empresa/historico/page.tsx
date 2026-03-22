'use client'

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { StatusBadge } from '@/components/ui/status-badge'
import { Badge } from '@/components/ui/badge'

const mockHistorico = [
  { id: '1', title: 'Garçom para Evento', date: '2026-03-15', workers: 5, status: 'concluida', total_cents: 90000 },
  { id: '2', title: 'Promotora PDV', date: '2026-03-10', workers: 2, status: 'concluida', total_cents: 30000 },
  { id: '3', title: 'Auxiliar de Cozinha', date: '2026-03-05', workers: 3, status: 'concluida', total_cents: 48000 },
  { id: '4', title: 'Recepcionista Evento', date: '2026-02-28', workers: 4, status: 'concluida', total_cents: 64000 },
  { id: '5', title: 'Carga e Descarga', date: '2026-02-20', workers: 6, status: 'cancelada', total_cents: 0 },
]

function fmt(c: number) { return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(c / 100) }

export default function HistoricoPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <h1 className="text-2xl font-bold text-foreground">Histórico</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vaga</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Trabalhadores</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Valor Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockHistorico.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>{new Date(item.date + 'T00:00:00').toLocaleDateString('pt-BR')}</TableCell>
              <TableCell>{item.workers}</TableCell>
              <TableCell><StatusBadge type="job" status={item.status} /></TableCell>
              <TableCell className="text-right font-semibold">{fmt(item.total_cents)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

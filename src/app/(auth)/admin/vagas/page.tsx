'use client'

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { StatusBadge } from '@/components/ui/status-badge'
import { Badge } from '@/components/ui/badge'

const mock = [
  { id: '1', title: 'Garçom para Casamento', company: 'Buffet Real', category: 'eventos', date: '2026-03-28', slots: 5, status: 'publicada' },
  { id: '2', title: 'Promotor de Vendas', company: 'Eventos Star', category: 'promotor', date: '2026-03-29', slots: 3, status: 'publicada' },
  { id: '3', title: 'Auxiliar de Cozinha', company: 'Restaurante Sabor', category: 'cozinha', date: '2026-03-30', slots: 2, status: 'publicada' },
  { id: '4', title: 'Carga e Descarga', company: 'Logística Express', category: 'carga_descarga', date: '2026-03-15', slots: 6, status: 'concluida' },
  { id: '5', title: 'Recepcionista Evento', company: 'Eventos Star', category: 'atendimento', date: '2026-03-10', slots: 4, status: 'cancelada' },
]

export default function AdminVagasPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <h1 className="text-2xl font-bold text-foreground">Gestão de Vagas</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vaga</TableHead>
            <TableHead>Empresa</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Vagas</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mock.map((j) => (
            <TableRow key={j.id}>
              <TableCell className="font-medium">{j.title}</TableCell>
              <TableCell>{j.company}</TableCell>
              <TableCell><Badge variant="secondary">{j.category}</Badge></TableCell>
              <TableCell>{new Date(j.date + 'T00:00:00').toLocaleDateString('pt-BR')}</TableCell>
              <TableCell>{j.slots}</TableCell>
              <TableCell><StatusBadge type="job" status={j.status} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

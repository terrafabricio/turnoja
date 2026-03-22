'use client'

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

const mock = [
  { id: '1', reporter: 'Buffet Real', reported: 'Carlos Lima', reason: 'No-show sem aviso', date: '2026-03-18', status: 'pendente' },
  { id: '2', reporter: 'João Silva', reported: 'Clean Service', reason: 'Não pagou a diária', date: '2026-03-15', status: 'investigando' },
  { id: '3', reporter: 'Maria Santos', reported: 'Bar do Beco', reason: 'Condições inadequadas', date: '2026-03-10', status: 'resolvido' },
]

export default function AdminDenunciasPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <h1 className="text-2xl font-bold text-foreground">Denúncias</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Denunciante</TableHead>
            <TableHead>Denunciado</TableHead>
            <TableHead>Motivo</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mock.map((d) => (
            <TableRow key={d.id}>
              <TableCell className="font-medium">{d.reporter}</TableCell>
              <TableCell>{d.reported}</TableCell>
              <TableCell>{d.reason}</TableCell>
              <TableCell>{new Date(d.date + 'T00:00:00').toLocaleDateString('pt-BR')}</TableCell>
              <TableCell><Badge variant={d.status === 'pendente' ? 'warning' : d.status === 'investigando' ? 'primary' : 'success'}>{d.status}</Badge></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

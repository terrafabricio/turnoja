'use client'

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const mock = [
  { id: '1', user: 'Carlos Lima', type: 'Trabalhador', reason: 'No-show reincidente (3x)', start: '2026-03-18', end: '2026-04-18', active: true },
  { id: '2', user: 'Empresa XYZ', type: 'Empresa', reason: 'Não pagamento de diárias', start: '2026-03-10', end: '2026-04-10', active: true },
  { id: '3', user: 'Pedro Teste', type: 'Trabalhador', reason: 'Comportamento inadequado', start: '2026-02-01', end: '2026-03-01', active: false },
]

export default function AdminSuspensoesPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Suspensões e Bloqueios</h1>
        <Button variant="danger">Suspender Usuário</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Usuário</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Motivo</TableHead>
            <TableHead>Início</TableHead>
            <TableHead>Fim</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mock.map((s) => (
            <TableRow key={s.id}>
              <TableCell className="font-medium">{s.user}</TableCell>
              <TableCell><Badge variant="outline">{s.type}</Badge></TableCell>
              <TableCell>{s.reason}</TableCell>
              <TableCell>{new Date(s.start + 'T00:00:00').toLocaleDateString('pt-BR')}</TableCell>
              <TableCell>{new Date(s.end + 'T00:00:00').toLocaleDateString('pt-BR')}</TableCell>
              <TableCell><Badge variant={s.active ? 'danger' : 'default'}>{s.active ? 'Ativa' : 'Expirada'}</Badge></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

'use client'

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

const mock = [
  { id: '#001', user: 'João Silva', type: 'Trabalhador', subject: 'Não recebi pagamento', priority: 'alta', status: 'aberto', date: '2026-03-20' },
  { id: '#002', user: 'Buffet Real', type: 'Empresa', subject: 'Problema com candidato', priority: 'media', status: 'em_andamento', date: '2026-03-19' },
  { id: '#003', user: 'Maria Santos', type: 'Trabalhador', subject: 'Erro no check-in', priority: 'baixa', status: 'resolvido', date: '2026-03-15' },
]

export default function AdminSuportePage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <h1 className="text-2xl font-bold text-foreground">Tickets de Suporte</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ticket</TableHead>
            <TableHead>Usuário</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Assunto</TableHead>
            <TableHead>Prioridade</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Data</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mock.map((t) => (
            <TableRow key={t.id}>
              <TableCell className="font-medium">{t.id}</TableCell>
              <TableCell>{t.user}</TableCell>
              <TableCell><Badge variant="outline">{t.type}</Badge></TableCell>
              <TableCell>{t.subject}</TableCell>
              <TableCell><Badge variant={t.priority === 'alta' ? 'danger' : t.priority === 'media' ? 'warning' : 'default'}>{t.priority}</Badge></TableCell>
              <TableCell><Badge variant={t.status === 'aberto' ? 'warning' : t.status === 'em_andamento' ? 'primary' : 'success'}>{t.status}</Badge></TableCell>
              <TableCell>{new Date(t.date + 'T00:00:00').toLocaleDateString('pt-BR')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

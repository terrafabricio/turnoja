'use client'

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { StarRating } from '@/components/forms/star-rating'
import { Search } from 'lucide-react'

const mock = [
  { id: '1', name: 'João Silva', cpf: '123.456.789-00', city: 'São Paulo', jobs: 32, rating: 4.8, docs: 'approved', active: true },
  { id: '2', name: 'Maria Santos', cpf: '234.567.890-01', city: 'São Paulo', jobs: 18, rating: 4.5, docs: 'approved', active: true },
  { id: '3', name: 'Pedro Oliveira', cpf: '345.678.901-02', city: 'Guarulhos', jobs: 45, rating: 4.9, docs: 'approved', active: true },
  { id: '4', name: 'Ana Costa', cpf: '456.789.012-03', city: 'São Paulo', jobs: 8, rating: 4.2, docs: 'pending', active: true },
  { id: '5', name: 'Carlos Lima', cpf: '567.890.123-04', city: 'Osasco', jobs: 5, rating: 3.9, docs: 'rejected', active: false },
]

export default function AdminTrabalhadoresPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <h1 className="text-2xl font-bold text-foreground">Gestão de Trabalhadores</h1>
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted" />
        <input type="text" placeholder="Buscar trabalhador..." className="flex h-10 w-full rounded-lg border border-border bg-white pl-10 pr-4 text-sm" />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>CPF</TableHead>
            <TableHead>Cidade</TableHead>
            <TableHead>Trabalhos</TableHead>
            <TableHead>Avaliação</TableHead>
            <TableHead>Docs</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mock.map((w) => (
            <TableRow key={w.id}>
              <TableCell className="font-medium">{w.name}</TableCell>
              <TableCell className="text-foreground-secondary">{w.cpf}</TableCell>
              <TableCell>{w.city}</TableCell>
              <TableCell>{w.jobs}</TableCell>
              <TableCell><StarRating value={w.rating} readonly size="sm" showValue /></TableCell>
              <TableCell><Badge variant={w.docs === 'approved' ? 'success' : w.docs === 'pending' ? 'warning' : 'danger'}>{w.docs === 'approved' ? 'OK' : w.docs === 'pending' ? 'Pendente' : 'Rejeitado'}</Badge></TableCell>
              <TableCell><Badge variant={w.active ? 'success' : 'danger'}>{w.active ? 'Ativo' : 'Suspenso'}</Badge></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

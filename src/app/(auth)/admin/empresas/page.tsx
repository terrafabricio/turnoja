'use client'

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

const mockEmpresas = [
  { id: '1', name: 'Buffet Real Eventos', cnpj: '12.345.678/0001-90', city: 'São Paulo', jobs: 15, verified: true, active: true },
  { id: '2', name: 'Eventos Star', cnpj: '23.456.789/0001-01', city: 'São Paulo', jobs: 8, verified: true, active: true },
  { id: '3', name: 'Bar do Beco', cnpj: '34.567.890/0001-12', city: 'São Paulo', jobs: 4, verified: false, active: true },
  { id: '4', name: 'Clean Service', cnpj: '45.678.901/0001-23', city: 'Campinas', jobs: 2, verified: true, active: false },
]

export default function AdminEmpresasPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <h1 className="text-2xl font-bold text-foreground">Gestão de Empresas</h1>
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted" />
        <input type="text" placeholder="Buscar empresa..." className="flex h-10 w-full rounded-lg border border-border bg-white pl-10 pr-4 text-sm" />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Empresa</TableHead>
            <TableHead>CNPJ</TableHead>
            <TableHead>Cidade</TableHead>
            <TableHead>Vagas</TableHead>
            <TableHead>Verificação</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockEmpresas.map((e) => (
            <TableRow key={e.id}>
              <TableCell className="font-medium">{e.name}</TableCell>
              <TableCell className="text-foreground-secondary">{e.cnpj}</TableCell>
              <TableCell>{e.city}</TableCell>
              <TableCell>{e.jobs}</TableCell>
              <TableCell><Badge variant={e.verified ? 'success' : 'warning'}>{e.verified ? 'Verificada' : 'Pendente'}</Badge></TableCell>
              <TableCell><Badge variant={e.active ? 'success' : 'default'}>{e.active ? 'Ativa' : 'Inativa'}</Badge></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

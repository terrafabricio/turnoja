'use client'

import { useState } from 'react'
import { Search, MoreHorizontal, Eye, Ban, ShieldBan } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

const mockUsers = [
  { id: '1', name: 'Maria Silva', email: 'maria@email.com', role: 'trabalhador', status: 'ativo', createdAt: '2025-10-15' },
  { id: '2', name: 'Restaurante Bom Sabor', email: 'contato@bomsabor.com', role: 'empresa', status: 'ativo', createdAt: '2025-09-20' },
  { id: '3', name: 'Joao Santos', email: 'joao@email.com', role: 'trabalhador', status: 'suspenso', createdAt: '2025-11-02' },
  { id: '4', name: 'Buffet Elegance', email: 'admin@elegance.com', role: 'empresa', status: 'ativo', createdAt: '2025-08-30' },
  { id: '5', name: 'Ana Oliveira', email: 'ana@email.com', role: 'trabalhador', status: 'ativo', createdAt: '2025-12-01' },
  { id: '6', name: 'Carlos Ferreira', email: 'carlos@email.com', role: 'trabalhador', status: 'bloqueado', createdAt: '2025-07-15' },
  { id: '7', name: 'Eventos Premium LTDA', email: 'contato@premium.com', role: 'empresa', status: 'ativo', createdAt: '2025-11-20' },
  { id: '8', name: 'Patricia Lima', email: 'patricia@email.com', role: 'trabalhador', status: 'ativo', createdAt: '2026-01-05' },
  { id: '9', name: 'Roberto Almeida', email: 'roberto@email.com', role: 'admin', status: 'ativo', createdAt: '2025-06-01' },
  { id: '10', name: 'Fernanda Costa', email: 'fernanda@email.com', role: 'trabalhador', status: 'ativo', createdAt: '2026-02-10' },
]

const roleOptions = [
  { value: '', label: 'Todos os tipos' },
  { value: 'trabalhador', label: 'Trabalhador' },
  { value: 'empresa', label: 'Empresa' },
  { value: 'admin', label: 'Admin' },
]

const statusOptions = [
  { value: '', label: 'Todos os status' },
  { value: 'ativo', label: 'Ativo' },
  { value: 'suspenso', label: 'Suspenso' },
  { value: 'bloqueado', label: 'Bloqueado' },
]

const roleBadge: Record<string, 'primary' | 'secondary' | 'accent'> = {
  trabalhador: 'primary',
  empresa: 'secondary',
  admin: 'accent',
}

const statusBadge: Record<string, 'success' | 'warning' | 'danger'> = {
  ativo: 'success',
  suspenso: 'warning',
  bloqueado: 'danger',
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AdminUsuariosPage() {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const filtered = mockUsers.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole = !roleFilter || u.role === roleFilter
    const matchStatus = !statusFilter || u.status === statusFilter
    return matchSearch && matchRole && matchStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Gerenciar Usuarios</h1>
        <p className="mt-1 text-sm text-foreground-secondary">
          {mockUsers.length} usuarios cadastrados na plataforma
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted" />
          <Input
            placeholder="Buscar por nome ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            options={roleOptions}
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Cadastro</TableHead>
            <TableHead className="text-right">Acoes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell className="text-foreground-secondary">{user.email}</TableCell>
              <TableCell>
                <Badge variant={roleBadge[user.role] ?? 'default'}>{user.role}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={statusBadge[user.status] ?? 'default'}>{user.status}</Badge>
              </TableCell>
              <TableCell className="text-foreground-secondary">
                {new Date(user.createdAt).toLocaleDateString('pt-BR')}
              </TableCell>
              <TableCell className="text-right">
                <div className="relative inline-block">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setOpenDropdown(openDropdown === user.id ? null : user.id)}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                  {openDropdown === user.id && (
                    <div className="absolute right-0 z-10 mt-1 w-40 rounded-lg border border-border bg-surface py-1 shadow-lg">
                      <button
                        className="flex w-full items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-gray-50"
                        onClick={() => setOpenDropdown(null)}
                      >
                        <Eye className="h-4 w-4" /> Ver
                      </button>
                      <button
                        className="flex w-full items-center gap-2 px-3 py-2 text-sm text-warning-600 hover:bg-gray-50"
                        onClick={() => setOpenDropdown(null)}
                      >
                        <Ban className="h-4 w-4" /> Suspender
                      </button>
                      <button
                        className="flex w-full items-center gap-2 px-3 py-2 text-sm text-danger-600 hover:bg-gray-50"
                        onClick={() => setOpenDropdown(null)}
                      >
                        <ShieldBan className="h-4 w-4" /> Bloquear
                      </button>
                    </div>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

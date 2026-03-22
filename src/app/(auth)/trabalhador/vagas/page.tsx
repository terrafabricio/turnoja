'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { JobCard } from '@/components/jobs/job-card'
import { JobFilters } from '@/components/jobs/job-filters'

const mockVagas = [
  { id: '1', title: 'Garçom para Casamento', category: 'eventos', city: 'São Paulo', state: 'SP', date: '2026-03-28', start_time: '18:00', end_time: '02:00', payment_amount_cents: 18000, slots: 5, filled_slots: 2, status: 'publicada', includes_meal: true, includes_transport: false, company: { trade_name: 'Buffet Real' } },
  { id: '2', title: 'Promotor de Vendas', category: 'promotor', city: 'São Paulo', state: 'SP', date: '2026-03-29', start_time: '09:00', end_time: '17:00', payment_amount_cents: 15000, slots: 3, filled_slots: 1, status: 'publicada', includes_meal: false, includes_transport: true, company: { trade_name: 'Eventos Star' } },
  { id: '3', title: 'Auxiliar de Cozinha', category: 'cozinha', city: 'São Paulo', state: 'SP', date: '2026-03-30', start_time: '06:00', end_time: '14:00', payment_amount_cents: 16000, slots: 2, filled_slots: 0, status: 'publicada', includes_meal: true, includes_transport: false, company: { trade_name: 'Restaurante Sabor' } },
  { id: '4', title: 'Barman para Inauguração', category: 'bar', city: 'São Paulo', state: 'SP', date: '2026-04-01', start_time: '20:00', end_time: '04:00', payment_amount_cents: 20000, slots: 2, filled_slots: 0, status: 'publicada', includes_meal: true, includes_transport: false, company: { trade_name: 'Bar do Beco' } },
  { id: '5', title: 'Repositor de Supermercado', category: 'reposicao', city: 'Guarulhos', state: 'SP', date: '2026-03-27', start_time: '07:00', end_time: '15:00', payment_amount_cents: 12000, slots: 4, filled_slots: 2, status: 'publicada', includes_meal: false, includes_transport: false, company: { trade_name: 'Super Mercado ABC' } },
  { id: '6', title: 'Recepcionista para Evento', category: 'atendimento', city: 'São Paulo', state: 'SP', date: '2026-04-02', start_time: '08:00', end_time: '18:00', payment_amount_cents: 17000, slots: 3, filled_slots: 1, status: 'publicada', includes_meal: true, includes_transport: true, company: { trade_name: 'Eventos Star' } },
  { id: '7', title: 'Auxiliar de Limpeza', category: 'limpeza', city: 'Osasco', state: 'SP', date: '2026-03-28', start_time: '06:00', end_time: '12:00', payment_amount_cents: 11000, slots: 2, filled_slots: 0, status: 'publicada', includes_meal: false, includes_transport: false, company: { trade_name: 'Clean Service' } },
  { id: '8', title: 'Carga e Descarga - Mudança', category: 'carga_descarga', city: 'São Paulo', state: 'SP', date: '2026-03-26', start_time: '07:00', end_time: '17:00', payment_amount_cents: 22000, slots: 6, filled_slots: 3, status: 'publicada', includes_meal: true, includes_transport: true, company: { trade_name: 'Logística Express' } },
]

export default function VagasPage() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [sortBy, setSortBy] = useState('recent')

  const filtered = mockVagas.filter((v) => {
    if (search && !v.title.toLowerCase().includes(search.toLowerCase()) && !v.company.trade_name.toLowerCase().includes(search.toLowerCase())) return false
    if (category && v.category !== category) return false
    return true
  })

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <h1 className="text-2xl font-bold text-foreground">Buscar Vagas</h1>
      <JobFilters search={search} onSearchChange={setSearch} category={category} onCategoryChange={setCategory} sortBy={sortBy} onSortChange={setSortBy} />
      <p className="text-sm text-foreground-secondary">{filtered.length} vaga{filtered.length !== 1 ? 's' : ''} encontrada{filtered.length !== 1 ? 's' : ''}</p>
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((vaga) => (
          <JobCard key={vaga.id} job={vaga} onClick={() => router.push(`/trabalhador/vagas/${vaga.id}`)} />
        ))}
      </div>
    </div>
  )
}

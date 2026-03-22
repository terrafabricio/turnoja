'use client'

import { use } from 'react'
import { ArrowLeft, MapPin, Calendar, Clock, DollarSign, Users, CheckCircle, XCircle, User } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusBadge } from '@/components/ui/status-badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { StarRating } from '@/components/forms/star-rating'

const mockJob = {
  id: '1',
  title: 'Garçom para Evento Corporativo',
  category: 'eventos',
  description: 'Precisamos de garçons experientes para evento corporativo de grande porte. O evento acontecerá em salão de festas com capacidade para 300 pessoas. É necessário ter experiência prévia com serviço de mesa e bandejas.',
  address: 'Av. Paulista, 1000',
  city: 'São Paulo',
  state: 'SP',
  date: '2026-03-28',
  start_time: '18:00',
  end_time: '02:00',
  payment_amount_cents: 18000,
  slots: 5,
  filled_slots: 3,
  status: 'publicada',
  includes_meal: true,
  includes_transport: false,
  requirements: ['Experiência com eventos', 'Boa apresentação', 'Pontualidade'],
  dress_code: 'Calça preta, camisa branca, sapato social',
  created_at: '2026-03-20',
}

const mockCandidatos = [
  { id: '1', full_name: 'João Silva', city: 'São Paulo', state: 'SP', rating_avg: 4.8, completed_jobs: 32, status: 'pendente' },
  { id: '2', full_name: 'Maria Santos', city: 'São Paulo', state: 'SP', rating_avg: 4.5, completed_jobs: 18, status: 'aceita' },
  { id: '3', full_name: 'Pedro Oliveira', city: 'Guarulhos', state: 'SP', rating_avg: 4.9, completed_jobs: 45, status: 'aceita' },
  { id: '4', full_name: 'Ana Costa', city: 'São Paulo', state: 'SP', rating_avg: 4.2, completed_jobs: 8, status: 'pendente' },
  { id: '5', full_name: 'Carlos Lima', city: 'Osasco', state: 'SP', rating_avg: 3.9, completed_jobs: 5, status: 'recusada' },
]

function fmt(cents: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100)
}

export default function VagaDetalhePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div className="flex items-center gap-3">
        <Link href="/empresa/vagas">
          <Button variant="ghost" size="icon-sm"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">{mockJob.title}</h1>
          <div className="flex items-center gap-2 mt-1">
            <StatusBadge type="job" status={mockJob.status} />
            <Badge variant="secondary">Eventos</Badge>
          </div>
        </div>
        <Link href={`/empresa/vagas/${id}/editar`}>
          <Button variant="outline">Editar</Button>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Detalhes da Vaga</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-foreground-secondary leading-relaxed">{mockJob.description}</p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-foreground-muted" />
                  <span>{mockJob.city}/{mockJob.state}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-foreground-muted" />
                  <span>{new Date(mockJob.date + 'T00:00:00').toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-foreground-muted" />
                  <span>{mockJob.start_time.slice(0, 5)} - {mockJob.end_time.slice(0, 5)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-foreground-muted" />
                  <span className="font-semibold text-primary-600">{fmt(mockJob.payment_amount_cents)}</span>
                </div>
              </div>
              {mockJob.requirements.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Requisitos:</p>
                  <ul className="list-disc list-inside text-sm text-foreground-secondary space-y-1">
                    {mockJob.requirements.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                </div>
              )}
              {mockJob.dress_code && (
                <div>
                  <p className="text-sm font-medium text-foreground">Dress code:</p>
                  <p className="text-sm text-foreground-secondary">{mockJob.dress_code}</p>
                </div>
              )}
              <div className="flex gap-3">
                {mockJob.includes_meal && <Badge variant="success">Refeição inclusa</Badge>}
                {mockJob.includes_transport && <Badge variant="primary">Transporte incluso</Badge>}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Candidatos ({mockCandidatos.length})</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockCandidatos.map((c) => (
                <div key={c.id} className="flex items-center gap-4 rounded-lg border border-border p-4">
                  <Avatar>
                    <AvatarFallback>{c.full_name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground">{c.full_name}</p>
                    <div className="flex items-center gap-3 text-sm text-foreground-secondary">
                      <span>{c.city}/{c.state}</span>
                      <StarRating value={c.rating_avg} readonly size="sm" showValue />
                      <span>{c.completed_jobs} trabalhos</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {c.status === 'pendente' ? (
                      <>
                        <Button size="sm" variant="success"><CheckCircle className="h-3.5 w-3.5 mr-1" />Aceitar</Button>
                        <Button size="sm" variant="outline"><XCircle className="h-3.5 w-3.5 mr-1" />Recusar</Button>
                      </>
                    ) : (
                      <StatusBadge type="application" status={c.status} />
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="pt-5">
              <div className="text-center space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <Users className="h-5 w-5 text-primary-600" />
                  <span className="text-2xl font-bold">{mockJob.filled_slots}/{mockJob.slots}</span>
                </div>
                <p className="text-sm text-foreground-secondary">vagas preenchidas</p>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all"
                    style={{ width: `${(mockJob.filled_slots / mockJob.slots) * 100}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 space-y-2">
              <p className="text-sm font-medium">Endereço completo</p>
              <p className="text-sm text-foreground-secondary">{mockJob.address}</p>
              <p className="text-sm text-foreground-secondary">{mockJob.city}/{mockJob.state}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

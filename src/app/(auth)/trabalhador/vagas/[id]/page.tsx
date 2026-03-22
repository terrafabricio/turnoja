'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, MapPin, Calendar, Clock, DollarSign, Users, Star, Utensils, Bus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { StarRating } from '@/components/forms/star-rating'

const mockJob = {
  id: '1',
  title: 'Garçom para Casamento',
  category: 'eventos',
  description: 'Precisamos de garçons para casamento de 200 convidados em salão no Morumbi. Serviço de mesa francesa, espumante na recepção e jantar servido. Traje fornecido pela empresa.',
  address: 'Rua dos Eventos, 500 - Morumbi',
  city: 'São Paulo',
  state: 'SP',
  date: '2026-03-28',
  start_time: '18:00',
  end_time: '02:00',
  payment_amount_cents: 18000,
  slots: 5,
  filled_slots: 2,
  status: 'publicada',
  includes_meal: true,
  includes_transport: false,
  requirements: ['Experiência com serviço de mesa', 'Boa apresentação', 'Pontualidade'],
  dress_code: 'Fornecido pela empresa',
  company: {
    trade_name: 'Buffet Real Eventos',
    description: 'Empresa com 10 anos de experiência em eventos corporativos e sociais.',
    rating_avg: 4.7,
    rating_count: 85,
    logo_url: null,
  },
}

function fmt(c: number) { return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(c / 100) }

export default function VagaDetalheTrabPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [message, setMessage] = useState('')
  const [applied, setApplied] = useState(false)
  const spotsLeft = mockJob.slots - mockJob.filled_slots

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <Link href="/trabalhador/vagas">
        <Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-2" />Voltar</Button>
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="pt-5 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <Badge variant="secondary" className="mb-2">Eventos</Badge>
                  <h1 className="text-2xl font-bold text-foreground">{mockJob.title}</h1>
                  <p className="text-foreground-secondary">{mockJob.company.trade_name}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary-600">{fmt(mockJob.payment_amount_cents)}</p>
                  <p className="text-xs text-foreground-muted">por diária</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-foreground-secondary">
                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{mockJob.city}/{mockJob.state}</span>
                <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{new Date(mockJob.date + 'T00:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{mockJob.start_time.slice(0, 5)} - {mockJob.end_time.slice(0, 5)}</span>
                <span className="flex items-center gap-1.5"><Users className="h-4 w-4" />{spotsLeft} vaga{spotsLeft !== 1 ? 's' : ''} restante{spotsLeft !== 1 ? 's' : ''}</span>
              </div>

              <div className="flex gap-2">
                {mockJob.includes_meal && <Badge variant="success"><Utensils className="h-3 w-3 mr-1" />Refeição inclusa</Badge>}
                {mockJob.includes_transport && <Badge variant="primary"><Bus className="h-3 w-3 mr-1" />Transporte incluso</Badge>}
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Descrição</h3>
                <p className="text-sm text-foreground-secondary leading-relaxed">{mockJob.description}</p>
              </div>

              {mockJob.requirements.length > 0 && (
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Requisitos</h3>
                  <ul className="list-disc list-inside text-sm text-foreground-secondary space-y-1">
                    {mockJob.requirements.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                </div>
              )}

              {mockJob.dress_code && (
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Dress Code</h3>
                  <p className="text-sm text-foreground-secondary">{mockJob.dress_code}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Sobre a Empresa</CardTitle></CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="text-lg">BR</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-foreground">{mockJob.company.trade_name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <StarRating value={mockJob.company.rating_avg} readonly size="sm" />
                    <span className="text-sm text-foreground-secondary">({mockJob.company.rating_count})</span>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm text-foreground-secondary">{mockJob.company.description}</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className={applied ? 'border-success-200 bg-success-50' : ''}>
            <CardContent className="pt-5">
              {applied ? (
                <div className="text-center py-4">
                  <div className="h-12 w-12 mx-auto rounded-full bg-success-100 flex items-center justify-center mb-3">
                    <Star className="h-6 w-6 text-success-600" />
                  </div>
                  <p className="font-semibold text-success-700">Candidatura Enviada!</p>
                  <p className="text-sm text-success-600 mt-1">Você receberá uma notificação quando a empresa responder.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Candidatar-se</h3>
                  <Textarea
                    placeholder="Mensagem para a empresa (opcional)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[80px]"
                  />
                  <Button className="w-full" size="lg" onClick={() => setApplied(true)}>
                    Quero essa vaga!
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5">
              <p className="text-sm font-medium text-foreground mb-1">Endereço</p>
              <p className="text-sm text-foreground-secondary">{mockJob.address}</p>
              <p className="text-sm text-foreground-secondary">{mockJob.city}/{mockJob.state}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

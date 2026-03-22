'use client'

import { Star } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { StarRating } from '@/components/forms/star-rating'

const mockAvaliacoes = [
  { id: '1', worker: 'João Silva', rating: 5, comment: 'Excelente profissional, pontual e dedicado. Superou as expectativas.', date: '2026-03-16' },
  { id: '2', worker: 'Maria Santos', rating: 4, comment: 'Boa profissional, trabalhou bem durante todo o evento.', date: '2026-03-16' },
  { id: '3', worker: 'Pedro Oliveira', rating: 5, comment: 'Muito experiente, já trabalhamos juntos antes. Sempre entrega.', date: '2026-03-11' },
  { id: '4', worker: 'Ana Costa', rating: 3, comment: 'Cumpriu o básico, mas poderia ter sido mais proativa.', date: '2026-03-06' },
]

export default function AvaliacoesPage() {
  const avgRating = mockAvaliacoes.reduce((s, r) => s + r.rating, 0) / mockAvaliacoes.length

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <h1 className="text-2xl font-bold text-foreground">Avaliações</h1>

      <Card>
        <CardContent className="pt-5">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-foreground">{avgRating.toFixed(1)}</p>
              <StarRating value={avgRating} readonly size="md" />
              <p className="mt-1 text-sm text-foreground-secondary">{mockAvaliacoes.length} avaliações</p>
            </div>
            <div className="flex-1 space-y-1">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = mockAvaliacoes.filter(r => r.rating === star).length
                const pct = (count / mockAvaliacoes.length) * 100
                return (
                  <div key={star} className="flex items-center gap-2">
                    <span className="w-3 text-xs text-foreground-secondary">{star}</span>
                    <Star className="h-3 w-3 text-warning-500 fill-warning-500" />
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-warning-500 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="w-6 text-xs text-foreground-muted text-right">{count}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {mockAvaliacoes.map((av) => (
          <Card key={av.id}>
            <CardContent className="pt-5">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarFallback>{av.worker.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-foreground">{av.worker}</p>
                    <span className="text-xs text-foreground-muted">{new Date(av.date + 'T00:00:00').toLocaleDateString('pt-BR')}</span>
                  </div>
                  <StarRating value={av.rating} readonly size="sm" />
                  <p className="mt-2 text-sm text-foreground-secondary">{av.comment}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

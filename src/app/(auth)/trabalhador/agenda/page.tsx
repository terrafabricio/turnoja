'use client'

import { Calendar, MapPin, Clock, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const today = new Date()
const mockAgenda = [
  { id: '1', title: 'Promotor de Vendas', company: 'Eventos Star', location: 'Shopping Morumbi', date: today.toISOString().split('T')[0], start_time: '09:00', end_time: '17:00', status: 'confirmado', checked_in: false },
  { id: '2', title: 'Garçom para Casamento', company: 'Buffet Real', location: 'Av. Paulista, 1000', date: new Date(today.getTime() + 86400000 * 2).toISOString().split('T')[0], start_time: '18:00', end_time: '02:00', status: 'confirmado', checked_in: false },
  { id: '3', title: 'Barman para Inauguração', company: 'Bar do Beco', location: 'R. Augusta, 500', date: new Date(today.getTime() + 86400000 * 5).toISOString().split('T')[0], start_time: '20:00', end_time: '04:00', status: 'confirmado', checked_in: false },
]

export default function AgendaPage() {
  const todayStr = today.toISOString().split('T')[0]

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <h1 className="text-2xl font-bold text-foreground">Agenda</h1>

      <div className="space-y-4">
        {mockAgenda.map((item) => {
          const isToday = item.date === todayStr
          const dt = new Date(item.date + 'T00:00:00')
          return (
            <Card key={item.id} className={isToday ? 'border-primary-300 bg-primary-50/30' : ''}>
              <CardContent className="pt-5">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    {isToday && <Badge variant="accent">Hoje</Badge>}
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-foreground-secondary">{item.company}</p>
                    <div className="flex flex-wrap gap-3 text-sm text-foreground-secondary">
                      <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{dt.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{item.start_time} - {item.end_time}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{item.location}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {isToday && !item.checked_in && (
                      <Button size="sm" variant="success">
                        <CheckCircle className="h-3.5 w-3.5 mr-1" />Check-in
                      </Button>
                    )}
                    <Badge variant="primary">Confirmado</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

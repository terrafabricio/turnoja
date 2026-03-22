'use client'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const mockTickets = [
  { id: '1', subject: 'Problema com pagamento', status: 'aberto', priority: 'alta', date: '2026-03-20' },
  { id: '2', subject: 'Trabalhador não compareceu', status: 'resolvido', priority: 'media', date: '2026-03-15' },
]

export default function SuportePage() {
  return (
    <div className="space-y-6 p-4 lg:p-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-foreground">Suporte</h1>

      <Card>
        <CardHeader><CardTitle>Abrir Novo Ticket</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Input label="Assunto" id="subject" placeholder="Descreva brevemente o problema" />
          <Select label="Prioridade" id="priority" options={[
            { value: 'baixa', label: 'Baixa' },
            { value: 'media', label: 'Média' },
            { value: 'alta', label: 'Alta' },
          ]} placeholder="Selecione a prioridade" />
          <Textarea label="Descrição" id="description" placeholder="Descreva o problema em detalhes" />
          <Button>Enviar Ticket</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Meus Tickets</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockTickets.map((t) => (
              <div key={t.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="font-medium text-foreground">{t.subject}</p>
                  <p className="text-sm text-foreground-secondary">{new Date(t.date + 'T00:00:00').toLocaleDateString('pt-BR')}</p>
                </div>
                <div className="flex gap-2">
                  <Badge variant={t.priority === 'alta' ? 'danger' : 'default'}>{t.priority}</Badge>
                  <Badge variant={t.status === 'aberto' ? 'warning' : 'success'}>{t.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

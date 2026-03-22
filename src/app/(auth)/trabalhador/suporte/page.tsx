'use client'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function SuporteTrabPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-foreground">Suporte</h1>
      <Card>
        <CardHeader><CardTitle>Abrir Novo Ticket</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Input label="Assunto" id="subject" placeholder="Descreva brevemente" />
          <Select label="Prioridade" id="priority" options={[{ value: 'baixa', label: 'Baixa' }, { value: 'media', label: 'Média' }, { value: 'alta', label: 'Alta' }]} placeholder="Selecione" />
          <Textarea label="Descrição" id="desc" placeholder="Descreva em detalhes" />
          <Button>Enviar Ticket</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Meus Tickets</CardTitle></CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border p-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Não recebi pagamento</p>
              <p className="text-sm text-foreground-secondary">18/03/2026</p>
            </div>
            <Badge variant="warning">Em andamento</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

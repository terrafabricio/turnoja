'use client'

import { FileText, CheckCircle, XCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const mock = [
  { id: '1', worker: 'Ana Costa', doc_type: 'RG/CNH', uploaded: '2026-03-20', status: 'pending' },
  { id: '2', worker: 'Carlos Lima', doc_type: 'Comprovante de Residência', uploaded: '2026-03-19', status: 'pending' },
  { id: '3', worker: 'Fernanda Souza', doc_type: 'CPF', uploaded: '2026-03-18', status: 'pending' },
]

export default function AdminVerificacoesPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <h1 className="text-2xl font-bold text-foreground">Verificação de Documentos</h1>
      <p className="text-sm text-foreground-secondary">{mock.length} documento(s) aguardando revisão</p>
      <div className="space-y-3">
        {mock.map((d) => (
          <Card key={d.id}>
            <CardContent className="pt-5">
              <div className="flex items-center gap-4">
                <Avatar><AvatarFallback>{d.worker.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{d.worker}</p>
                  <div className="flex items-center gap-2 text-sm text-foreground-secondary">
                    <FileText className="h-3.5 w-3.5" />
                    <span>{d.doc_type}</span>
                    <span>&middot;</span>
                    <span>Enviado em {new Date(d.uploaded + 'T00:00:00').toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="success"><CheckCircle className="h-3.5 w-3.5 mr-1" />Aprovar</Button>
                  <Button size="sm" variant="danger"><XCircle className="h-3.5 w-3.5 mr-1" />Rejeitar</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

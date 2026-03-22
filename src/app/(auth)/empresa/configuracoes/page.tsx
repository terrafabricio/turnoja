'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function ConfiguracoesPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-foreground">Configurações</h1>

      <Card>
        <CardHeader>
          <CardTitle>Notificações por Email</CardTitle>
          <CardDescription>Escolha quais notificações deseja receber</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {['Nova candidatura recebida', 'Confirmação de presença', 'Avaliação recebida', 'Resumo semanal'].map((item) => (
            <label key={item} className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-foreground">{item}</span>
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-border text-primary-600 focus:ring-primary-500" />
            </label>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Alterar Senha</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input type="password" label="Senha Atual" id="current_password" />
          <Input type="password" label="Nova Senha" id="new_password" />
          <Input type="password" label="Confirmar Nova Senha" id="confirm_password" />
          <Button>Alterar Senha</Button>
        </CardContent>
      </Card>

      <Card className="border-danger-200">
        <CardHeader>
          <CardTitle className="text-danger-600">Zona de Perigo</CardTitle>
          <CardDescription>Ações irreversíveis</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="danger">Desativar Conta</Button>
        </CardContent>
      </Card>
    </div>
  )
}

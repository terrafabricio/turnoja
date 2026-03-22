'use client'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Upload } from 'lucide-react'

export default function PerfilEmpresaPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <h1 className="text-2xl font-bold text-foreground">Perfil da Empresa</h1>

      <Card>
        <CardHeader><CardTitle>Logo</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-2xl">BR</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm"><Upload className="h-4 w-4 mr-2" />Alterar logo</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Dados da Empresa</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Nome Fantasia" defaultValue="Buffet Real Eventos" id="trade_name" />
            <Input label="Razão Social" defaultValue="Buffet Real Ltda" id="legal_name" />
            <Input label="CNPJ" defaultValue="12.345.678/0001-90" id="cnpj" disabled />
            <Input label="Telefone" defaultValue="(11) 99999-1234" id="phone" />
            <Input label="Email" defaultValue="contato@buffetreal.com.br" id="email" />
            <Input label="Website" defaultValue="www.buffetreal.com.br" id="website" />
          </div>
          <Textarea label="Descrição" defaultValue="Empresa especializada em eventos corporativos e sociais com mais de 10 anos de experiência." id="description" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Endereço</CardTitle></CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Endereço" defaultValue="Av. Paulista, 1000" id="address" className="sm:col-span-2" />
            <Input label="Cidade" defaultValue="São Paulo" id="city" />
            <Input label="Estado" defaultValue="SP" id="state" />
            <Input label="CEP" defaultValue="01310-100" id="cep" />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button size="lg">Salvar Alterações</Button>
      </div>
    </div>
  )
}

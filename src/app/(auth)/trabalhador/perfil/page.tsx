'use client'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Upload } from 'lucide-react'

const categories = [
  { value: 'eventos', label: 'Eventos' }, { value: 'restaurante', label: 'Restaurante' },
  { value: 'bar', label: 'Bar' }, { value: 'promotor', label: 'Promotor' },
  { value: 'reposicao', label: 'Reposição' }, { value: 'logistica', label: 'Logística' },
  { value: 'atendimento', label: 'Atendimento' }, { value: 'limpeza', label: 'Limpeza' },
  { value: 'cozinha', label: 'Cozinha' }, { value: 'carga_descarga', label: 'Carga e Descarga' },
  { value: 'operacional', label: 'Operacional' },
]

export default function PerfilTrabPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-foreground">Meu Perfil</h1>

      <Card>
        <CardHeader><CardTitle>Foto</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20"><AvatarFallback className="text-2xl">JS</AvatarFallback></Avatar>
            <Button variant="outline" size="sm"><Upload className="h-4 w-4 mr-2" />Alterar foto</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Dados Pessoais</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Nome Completo" defaultValue="João Silva Santos" id="name" />
            <Input label="CPF" defaultValue="123.456.789-00" id="cpf" disabled />
            <Input label="Telefone" defaultValue="(11) 99999-5678" id="phone" />
            <Input label="Email" defaultValue="joao@email.com" id="email" />
            <Input label="Data de Nascimento" type="date" defaultValue="1995-06-15" id="dob" />
            <Input label="Anos de Experiência" type="number" defaultValue="3" id="exp" />
          </div>
          <Textarea label="Bio" defaultValue="Profissional dedicado com experiência em eventos e gastronomia. Pontual, responsável e sempre disposto a ajudar." id="bio" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Categorias de Interesse</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <label key={c.value} className="cursor-pointer">
                <input type="checkbox" className="peer sr-only" defaultChecked={['eventos', 'bar', 'cozinha'].includes(c.value)} />
                <Badge variant="outline" className="peer-checked:bg-primary-100 peer-checked:text-primary-700 peer-checked:border-primary-300 transition-colors">
                  {c.label}
                </Badge>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Endereço</CardTitle></CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Cidade" defaultValue="São Paulo" id="city" />
            <Input label="Estado" defaultValue="SP" id="state" />
            <Input label="CEP" defaultValue="01310-100" id="cep" />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button size="lg">Salvar Perfil</Button>
      </div>
    </div>
  )
}

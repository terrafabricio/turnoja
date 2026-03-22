'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const categoryOptions = [
  { value: 'eventos', label: 'Eventos' },
  { value: 'restaurante', label: 'Restaurante' },
  { value: 'bar', label: 'Bar' },
  { value: 'promotor', label: 'Promotor' },
  { value: 'reposicao', label: 'Reposição' },
  { value: 'logistica', label: 'Logística' },
  { value: 'atendimento', label: 'Atendimento' },
  { value: 'limpeza', label: 'Limpeza' },
  { value: 'cozinha', label: 'Cozinha' },
  { value: 'carga_descarga', label: 'Carga e Descarga' },
  { value: 'operacional', label: 'Operacional' },
  { value: 'outros', label: 'Outros' },
]

export default function NovaVagaPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    address: '',
    city: '',
    state: '',
    cep: '',
    date: '',
    start_time: '',
    end_time: '',
    payment_amount: '',
    slots: '',
    requirements: '',
    dress_code: '',
    includes_meal: false,
    includes_transport: false,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent, isDraft: boolean = false) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    router.push('/empresa/vagas')
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/empresa/vagas"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground-secondary hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para vagas
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-foreground">Nova Vaga</h1>
        <p className="mt-1 text-sm text-foreground-secondary">
          Preencha as informações abaixo para criar uma nova vaga de trabalho
        </p>
      </div>

      <form onSubmit={(e) => handleSubmit(e, false)}>
        {/* Basic Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              id="title"
              name="title"
              label="Título da Vaga"
              placeholder="Ex: Garçom para Evento Corporativo"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <Select
              id="category"
              name="category"
              label="Categoria"
              placeholder="Selecione uma categoria"
              options={categoryOptions}
              value={formData.category}
              onChange={handleChange}
              required
            />
            <Textarea
              id="description"
              name="description"
              label="Descrição da Vaga"
              placeholder="Descreva as atividades, responsabilidades e qualquer informação relevante..."
              value={formData.description}
              onChange={handleChange}
              rows={5}
              required
            />
          </CardContent>
        </Card>

        {/* Location */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Local de Trabalho</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              id="address"
              name="address"
              label="Endereço"
              placeholder="Rua, número, complemento"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Input
                id="city"
                name="city"
                label="Cidade"
                placeholder="São Paulo"
                value={formData.city}
                onChange={handleChange}
                required
              />
              <Input
                id="state"
                name="state"
                label="Estado"
                placeholder="SP"
                value={formData.state}
                onChange={handleChange}
                maxLength={2}
                required
              />
              <Input
                id="cep"
                name="cep"
                label="CEP"
                placeholder="00000-000"
                value={formData.cep}
                onChange={handleChange}
              />
            </div>
          </CardContent>
        </Card>

        {/* Schedule & Payment */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Data, Horário e Pagamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Input
                id="date"
                name="date"
                type="date"
                label="Data"
                value={formData.date}
                onChange={handleChange}
                required
              />
              <Input
                id="start_time"
                name="start_time"
                type="time"
                label="Hora de Início"
                value={formData.start_time}
                onChange={handleChange}
                required
              />
              <Input
                id="end_time"
                name="end_time"
                type="time"
                label="Hora de Término"
                value={formData.end_time}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                id="payment_amount"
                name="payment_amount"
                type="number"
                label="Valor da Diária (R$)"
                placeholder="150,00"
                value={formData.payment_amount}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
              <Input
                id="slots"
                name="slots"
                type="number"
                label="Número de Vagas"
                placeholder="5"
                value={formData.slots}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Requirements */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Requisitos e Detalhes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              id="requirements"
              name="requirements"
              label="Requisitos"
              placeholder="Ex: Experiência com atendimento, boa comunicação, pontualidade"
              hint="Separe os requisitos por vírgula"
              value={formData.requirements}
              onChange={handleChange}
            />
            <Input
              id="dress_code"
              name="dress_code"
              label="Traje / Dress Code (opcional)"
              placeholder="Ex: Camisa social preta e calça social"
              value={formData.dress_code}
              onChange={handleChange}
            />

            {/* Toggles */}
            <div className="flex flex-col gap-3 pt-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="includes_meal"
                  checked={formData.includes_meal}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-border text-primary-600 focus:ring-primary-500"
                />
                <div>
                  <span className="text-sm font-medium text-foreground">Inclui refeição</span>
                  <p className="text-xs text-foreground-muted">A empresa fornecerá refeição durante o turno</p>
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="includes_transport"
                  checked={formData.includes_transport}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-border text-primary-600 focus:ring-primary-500"
                />
                <div>
                  <span className="text-sm font-medium text-foreground">Inclui transporte</span>
                  <p className="text-xs text-foreground-muted">A empresa fornecerá vale-transporte ou transporte</p>
                </div>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={(e) => handleSubmit(e as React.FormEvent, true)}
            disabled={isSubmitting}
          >
            Salvar Rascunho
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            Publicar Vaga
          </Button>
        </div>
      </form>
    </div>
  )
}

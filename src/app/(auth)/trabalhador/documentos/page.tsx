'use client'

import { FileUpload } from '@/components/forms/file-upload'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function DocumentosPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Documentos</h1>
        <p className="text-sm text-foreground-secondary mt-1">Envie seus documentos para verificação. Seus dados são protegidos.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>RG ou CNH</CardTitle>
          <CardDescription>Documento de identidade com foto</CardDescription>
        </CardHeader>
        <CardContent>
          <FileUpload label="" accept="image/*,.pdf" status="approved" currentFile="rg_joao_silva.pdf" onFileSelect={() => {}} onRemove={() => {}} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>CPF</CardTitle>
          <CardDescription>Cadastro de Pessoa Física</CardDescription>
        </CardHeader>
        <CardContent>
          <FileUpload label="" accept="image/*,.pdf" status="approved" currentFile="cpf_joao.pdf" onFileSelect={() => {}} onRemove={() => {}} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Comprovante de Residência</CardTitle>
          <CardDescription>Conta de luz, água ou telefone dos últimos 3 meses</CardDescription>
        </CardHeader>
        <CardContent>
          <FileUpload label="" accept="image/*,.pdf" status="pending" currentFile="comprovante_residencia.pdf" onFileSelect={() => {}} onRemove={() => {}} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Certidão de Antecedentes</CardTitle>
          <CardDescription>Opcional, mas aumenta suas chances</CardDescription>
        </CardHeader>
        <CardContent>
          <FileUpload label="" accept="image/*,.pdf" onFileSelect={() => {}} />
        </CardContent>
      </Card>
    </div>
  )
}

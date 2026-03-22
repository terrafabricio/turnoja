'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import {
  passwordResetRequestSchema,
  type PasswordResetRequestInput,
} from '@/lib/validations/auth'

export default function RecuperarSenhaPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetRequestInput>({
    resolver: zodResolver(passwordResetRequestSchema),
  })

  async function onSubmit(data: PasswordResetRequestInput) {
    setIsLoading(true)
    try {
      // TODO: wire up Supabase password reset
      console.log('Password reset request:', data)
      await new Promise((r) => setTimeout(r, 1000))
      setSubmitted(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
              <span className="text-lg font-bold text-white">T</span>
            </div>
            <span className="text-2xl font-bold text-foreground">
              Turno<span className="text-primary-600">Já</span>
            </span>
          </Link>
        </div>

        <Card className="shadow-lg border-border">
          {submitted ? (
            <>
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-success-100">
                  <CheckCircle className="h-6 w-6 text-success-600" />
                </div>
                <CardTitle className="text-xl">E-mail enviado!</CardTitle>
                <CardDescription>
                  Verifique sua caixa de entrada e siga as instruções para
                  redefinir sua senha.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="mb-5 text-center text-sm text-foreground-secondary">
                  Não recebeu o e-mail? Verifique a pasta de spam ou{' '}
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="font-medium text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    tente novamente
                  </button>
                  .
                </p>
                <Link href="/login">
                  <Button variant="outline" className="w-full gap-2" size="lg">
                    <ArrowLeft className="h-4 w-4" />
                    Voltar ao login
                  </Button>
                </Link>
              </CardContent>
            </>
          ) : (
            <>
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-100">
                  <Mail className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle className="text-xl">Recuperar senha</CardTitle>
                <CardDescription>
                  Insira seu e-mail e enviaremos um link para redefinir sua
                  senha.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <Input
                    id="email"
                    label="E-mail"
                    type="email"
                    placeholder="seu@email.com"
                    autoComplete="email"
                    error={errors.email?.message}
                    {...register('email')}
                  />

                  <Button
                    type="submit"
                    className="w-full gap-2"
                    size="lg"
                    isLoading={isLoading}
                  >
                    <Mail className="h-4.5 w-4.5" />
                    Enviar link de recuperação
                  </Button>
                </form>

                <div className="mt-5 text-center">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground-secondary hover:text-foreground transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Voltar ao login
                  </Link>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}

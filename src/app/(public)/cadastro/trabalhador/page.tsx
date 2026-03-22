'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { HardHat, Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { registerWorkerSchema, type RegisterWorkerInput } from '@/lib/validations/auth'

export default function CadastroTrabalhadorPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterWorkerInput>({
    resolver: zodResolver(registerWorkerSchema),
  })

  async function onSubmit(data: RegisterWorkerInput) {
    setIsLoading(true)
    try {
      // TODO: wire up Supabase auth
      console.log('Register worker data:', data)
      await new Promise((r) => setTimeout(r, 1000))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
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
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-100">
              <HardHat className="h-6 w-6 text-accent-600" />
            </div>
            <CardTitle className="text-xl">Cadastro de Trabalhador</CardTitle>
            <CardDescription>
              Crie sua conta gratuita e encontre oportunidades de trabalho
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Account */}
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
                  Dados de Acesso
                </p>
                <Input
                  id="email"
                  label="E-mail"
                  type="email"
                  placeholder="seu@email.com"
                  autoComplete="email"
                  error={errors.email?.message}
                  {...register('email')}
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="relative">
                    <Input
                      id="password"
                      label="Senha"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Mínimo 8 caracteres"
                      autoComplete="new-password"
                      error={errors.password?.message}
                      {...register('password')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-[34px] text-foreground-muted hover:text-foreground transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <div className="relative">
                    <Input
                      id="password_confirmation"
                      label="Confirmar Senha"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Repita a senha"
                      autoComplete="new-password"
                      error={errors.password_confirmation?.message}
                      {...register('password_confirmation')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-[34px] text-foreground-muted hover:text-foreground transition-colors"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Personal */}
              <div className="space-y-3 pt-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
                  Dados Pessoais
                </p>
                <Input
                  id="full_name"
                  label="Nome Completo"
                  placeholder="Seu nome completo"
                  error={errors.full_name?.message}
                  {...register('full_name')}
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  <Input
                    id="cpf"
                    label="CPF"
                    placeholder="000.000.000-00"
                    error={errors.cpf?.message}
                    {...register('cpf')}
                  />
                  <Input
                    id="phone"
                    label="Telefone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    error={errors.phone?.message}
                    {...register('phone')}
                  />
                </div>
                <Input
                  id="date_of_birth"
                  label="Data de Nascimento"
                  type="date"
                  error={errors.date_of_birth?.message}
                  {...register('date_of_birth')}
                />
              </div>

              {/* Terms */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 rounded border-border text-primary-600 focus:ring-primary-500"
                    {...register('accept_terms')}
                  />
                  <span className="text-sm text-foreground-secondary leading-relaxed">
                    Eu li e aceito os{' '}
                    <Link
                      href="#"
                      className="font-medium text-primary-600 hover:underline"
                    >
                      Termos de Uso
                    </Link>{' '}
                    e a{' '}
                    <Link
                      href="#"
                      className="font-medium text-primary-600 hover:underline"
                    >
                      Política de Privacidade
                    </Link>
                  </span>
                </label>
                {errors.accept_terms && (
                  <p className="mt-1 text-sm text-danger-600">
                    {errors.accept_terms.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full gap-2"
                size="lg"
                variant="accent"
                isLoading={isLoading}
              >
                Criar Minha Conta
                <ArrowRight className="h-4.5 w-4.5" />
              </Button>
            </form>

            <p className="mt-5 text-center text-sm text-foreground-secondary">
              Já tem uma conta?{' '}
              <Link
                href="/login"
                className="font-medium text-primary-600 hover:text-primary-700 transition-colors"
              >
                Faça login
              </Link>
            </p>
          </CardContent>
        </Card>

        {/* Benefits mini */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-foreground-muted">
          <span className="flex items-center gap-1">
            <CheckCircle className="h-3.5 w-3.5 text-success-500" />
            100% gratuito
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle className="h-3.5 w-3.5 text-success-500" />
            Sem compromisso
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle className="h-3.5 w-3.5 text-success-500" />
            Receba rápido
          </span>
        </div>
      </div>
    </div>
  )
}

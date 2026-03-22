'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LogIn, Eye, EyeOff, Building2, HardHat } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { loginSchema, type LoginInput } from '@/lib/validations/auth'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(data: LoginInput) {
    setIsLoading(true)
    try {
      // TODO: wire up Supabase auth
      console.log('Login data:', data)
      await new Promise((r) => setTimeout(r, 1000))
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
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-xl">Entrar na plataforma</CardTitle>
            <CardDescription>
              Acesse sua conta para continuar
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

              <div>
                <div className="relative">
                  <Input
                    id="password"
                    label="Senha"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Sua senha"
                    autoComplete="current-password"
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
                      <EyeOff className="h-4.5 w-4.5" />
                    ) : (
                      <Eye className="h-4.5 w-4.5" />
                    )}
                  </button>
                </div>
                <div className="mt-1.5 text-right">
                  <Link
                    href="/recuperar-senha"
                    className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full gap-2"
                size="lg"
                isLoading={isLoading}
              >
                <LogIn className="h-4.5 w-4.5" />
                Entrar
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-surface px-3 text-foreground-muted">
                  Não tem conta?
                </span>
              </div>
            </div>

            {/* Register links */}
            <div className="grid grid-cols-2 gap-3">
              <Link href="/cadastro/trabalhador">
                <Button
                  variant="outline"
                  className="w-full gap-2 text-sm"
                  size="md"
                >
                  <HardHat className="h-4 w-4" />
                  Trabalhador
                </Button>
              </Link>
              <Link href="/cadastro/empresa">
                <Button
                  variant="outline"
                  className="w-full gap-2 text-sm"
                  size="md"
                >
                  <Building2 className="h-4 w-4" />
                  Empresa
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-foreground-muted">
          Ao entrar, você concorda com nossos{' '}
          <Link href="#" className="underline hover:text-foreground-secondary">
            Termos de Uso
          </Link>{' '}
          e{' '}
          <Link href="#" className="underline hover:text-foreground-secondary">
            Política de Privacidade
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

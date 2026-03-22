import Link from 'next/link'
import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  UserPlus,
  Search,
  CalendarCheck,
  Wallet,
  Star,
  Shield,
  ClipboardList,
  Users,
  CheckCircle,
  Building2,
  BadgeCheck,
  Clock,
  CreditCard,
  type LucideIcon,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Como Funciona',
  description:
    'Saiba como o TurnoJá conecta trabalhadores temporários a empresas em poucos passos.',
}

interface Step {
  icon: LucideIcon
  title: string
  description: string
}

const workerSteps: Step[] = [
  {
    icon: UserPlus,
    title: 'Crie sua conta grátis',
    description:
      'Preencha seus dados, adicione suas habilidades, experiências e foto de perfil. Quanto mais completo, maior sua visibilidade.',
  },
  {
    icon: Search,
    title: 'Encontre vagas ideais',
    description:
      'Use filtros por localização, categoria, valor e horário para encontrar diárias que se encaixam na sua rotina.',
  },
  {
    icon: CalendarCheck,
    title: 'Candidate-se e seja aprovado',
    description:
      'Envie sua candidatura com um clique. A empresa analisa seu perfil e confirma. Você recebe uma notificação em tempo real.',
  },
  {
    icon: Clock,
    title: 'Realize o turno',
    description:
      'Compareça ao local no horário combinado. Faça o check-in pelo app e registre seu trabalho.',
  },
  {
    icon: Wallet,
    title: 'Receba seu pagamento',
    description:
      'Ao final do turno, o pagamento é processado de forma segura. Sem complicações, sem atrasos.',
  },
  {
    icon: Star,
    title: 'Construa sua reputação',
    description:
      'Receba avaliações das empresas. Quanto melhor sua reputação, mais oportunidades você conquista.',
  },
]

const companySteps: Step[] = [
  {
    icon: Building2,
    title: 'Cadastre sua empresa',
    description:
      'Crie seu perfil empresarial com CNPJ, dados de contato e informações sobre seu negócio.',
  },
  {
    icon: ClipboardList,
    title: 'Publique vagas',
    description:
      'Descreva a função, horários, local e valor da diária. Configure requisitos e quantidade de vagas necessárias.',
  },
  {
    icon: Users,
    title: 'Receba candidaturas',
    description:
      'Trabalhadores qualificados enviam suas candidaturas. Filtre por avaliação, experiência e disponibilidade.',
  },
  {
    icon: BadgeCheck,
    title: 'Selecione e confirme',
    description:
      'Aprove os melhores candidatos. Eles são notificados instantaneamente e confirmam presença.',
  },
  {
    icon: CreditCard,
    title: 'Pagamento simplificado',
    description:
      'Gerencie pagamentos de forma centralizada. Controle de custos transparente e sem surpresas.',
  },
  {
    icon: Star,
    title: 'Avalie e fidelize',
    description:
      'Dê notas aos trabalhadores após cada turno. Crie sua lista de favoritos para contratações futuras.',
  },
]

function StepCard({
  step,
  index,
  accentClass,
  bgClass,
}: {
  step: Step
  index: number
  accentClass: string
  bgClass: string
}) {
  return (
    <div className="relative flex gap-5">
      {/* Timeline line */}
      <div className="flex flex-col items-center">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-md ${accentClass}`}
        >
          {index + 1}
        </div>
        <div className="mt-2 flex-1 w-px bg-border" />
      </div>

      {/* Content */}
      <div className="pb-10">
        <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${bgClass} mb-3`}>
          <step.icon className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-foreground-secondary max-w-md">
          {step.description}
        </p>
      </div>
    </div>
  )
}

export default function ComoFuncionaPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-gray-50 py-16 sm:py-24">
        <div className="absolute inset-0 opacity-5 gradient-hero" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Como o <span className="text-primary-600">TurnoJá</span> funciona
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-secondary">
            De cadastro a pagamento em poucos passos. Veja como é simples
            encontrar trabalho ou contratar profissionais temporários.
          </p>
        </div>
      </section>

      {/* Trust */}
      <section className="border-b border-border bg-white py-8">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-8 px-4 text-sm font-medium text-foreground-secondary">
          <span className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary-500" />
            Pagamentos protegidos
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success-500" />
            Perfis verificados
          </span>
          <span className="flex items-center gap-2">
            <Star className="h-5 w-5 text-warning-500" />
            Sistema de avaliação
          </span>
        </div>
      </section>

      {/* Worker Steps */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-100 px-4 py-1.5 text-sm font-semibold text-accent-700">
              <Users className="h-4 w-4" />
              Para Trabalhadores
            </span>
            <h2 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">
              Encontre trabalho na sua região
            </h2>
          </div>

          <div>
            {workerSteps.map((step, i) => (
              <StepCard
                key={step.title}
                step={step}
                index={i}
                accentClass="gradient-accent"
                bgClass="bg-accent-50 text-accent-600"
              />
            ))}
          </div>

          <div className="mt-4 text-center">
            <Link href="/cadastro/trabalhador">
              <Button size="lg" variant="accent" className="gap-2">
                Criar minha conta grátis
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Company Steps */}
      <section className="bg-gray-50 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-100 px-4 py-1.5 text-sm font-semibold text-primary-700">
              <Building2 className="h-4 w-4" />
              Para Empresas
            </span>
            <h2 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">
              Contrate profissionais em minutos
            </h2>
          </div>

          <div>
            {companySteps.map((step, i) => (
              <StepCard
                key={step.title}
                step={step}
                index={i}
                accentClass="gradient-primary"
                bgClass="bg-primary-50 text-primary-600"
              />
            ))}
          </div>

          <div className="mt-4 text-center">
            <Link href="/cadastro/empresa">
              <Button size="lg" className="gap-2">
                Cadastrar minha empresa
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Ainda tem dúvidas?
          </h2>
          <p className="mt-3 text-foreground-secondary">
            Entre em contato com nossa equipe. Estamos prontos para ajudar.
          </p>
          <div className="mt-8">
            <Link href="/login">
              <Button variant="outline" size="lg">
                Entrar na plataforma
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

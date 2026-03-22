import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Search,
  Building2,
  UserCheck,
  CalendarCheck,
  ClipboardList,
  Users,
  Star,
  Zap,
  Shield,
  UtensilsCrossed,
  ShoppingCart,
  Hammer,
  Truck,
  Headphones,
  Paintbrush,
  TrendingUp,
  CheckCircle,
} from 'lucide-react'

const workerSteps = [
  {
    icon: UserCheck,
    title: 'Crie seu perfil',
    description:
      'Cadastre-se gratuitamente, adicione suas habilidades e experiências.',
  },
  {
    icon: Search,
    title: 'Encontre vagas',
    description:
      'Busque diárias e vagas temporárias na sua região, com filtros por categoria e valor.',
  },
  {
    icon: CalendarCheck,
    title: 'Trabalhe e receba',
    description:
      'Candidate-se, seja aprovado e receba o pagamento de forma rápida e segura.',
  },
]

const companySteps = [
  {
    icon: ClipboardList,
    title: 'Publique uma vaga',
    description:
      'Descreva a diária, defina horário, local e valor. Em minutos sua vaga está no ar.',
  },
  {
    icon: Users,
    title: 'Selecione candidatos',
    description:
      'Receba candidaturas de trabalhadores qualificados e avaliados pela comunidade.',
  },
  {
    icon: Star,
    title: 'Avalie e repita',
    description:
      'Ao final do turno, avalie o trabalhador. Crie sua equipe de confiança.',
  },
]

const categories = [
  { icon: UtensilsCrossed, label: 'Alimentação', color: 'bg-orange-100 text-orange-600' },
  { icon: ShoppingCart, label: 'Varejo', color: 'bg-blue-100 text-blue-600' },
  { icon: Hammer, label: 'Construção', color: 'bg-amber-100 text-amber-600' },
  { icon: Truck, label: 'Logística', color: 'bg-green-100 text-green-600' },
  { icon: Headphones, label: 'Atendimento', color: 'bg-purple-100 text-purple-600' },
  { icon: Paintbrush, label: 'Limpeza', color: 'bg-teal-100 text-teal-600' },
]

const stats = [
  { value: '5.000+', label: 'Trabalhadores cadastrados' },
  { value: '800+', label: 'Empresas parceiras' },
  { value: '15.000+', label: 'Diárias realizadas' },
]

export default function HomePage() {
  return (
    <>
      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 gradient-hero" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-accent-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm animate-fade-in">
              <Zap className="h-4 w-4" />
              A plataforma #1 de trabalho temporário
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl animate-fade-in-up">
              Conecte-se ao trabalho certo,{' '}
              <span className="relative">
                <span className="relative z-10">na hora certa</span>
                <span className="absolute bottom-1 left-0 z-0 h-3 w-full bg-accent-500/40 rounded-sm sm:h-4" />
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl animate-fade-in-up">
              O marketplace que conecta empresas a trabalhadores temporários de
              forma rápida, segura e profissional. Diárias, extras e turnos
              avulsos em todo o Brasil.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center animate-fade-in-up">
              <Link href="/cadastro/trabalhador">
                <Button size="xl" variant="accent" className="w-full sm:w-auto gap-2 text-base shadow-lg shadow-accent-500/25">
                  Quero Trabalhar
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/cadastro/empresa">
                <Button
                  size="xl"
                  variant="outline"
                  className="w-full sm:w-auto gap-2 text-base border-white/30 text-white hover:bg-white/10 hover:border-white/50 hover:text-white"
                >
                  <Building2 className="h-5 w-5" />
                  Sou Empresa
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-white/60 animate-fade-in">
              <span className="flex items-center gap-1.5">
                <Shield className="h-4 w-4" /> Pagamento seguro
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4" /> Perfis verificados
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4" /> Avaliações reais
              </span>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0 80h1440V30c-240 30-480 50-720 40S240 10 0 50v30z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ==================== STATS ==================== */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-extrabold text-primary-600 sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm font-medium text-foreground-secondary">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== COMO FUNCIONA ==================== */}
      <section className="bg-gray-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Como Funciona
            </h2>
            <p className="mt-3 text-lg text-foreground-secondary">
              Simples, rápido e sem burocracia
            </p>
          </div>

          {/* Workers */}
          <div className="mt-16">
            <div className="mb-8 flex items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-100 px-4 py-1.5 text-sm font-semibold text-accent-700">
                <UserCheck className="h-4 w-4" />
                Para Trabalhadores
              </span>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {workerSteps.map((step, i) => (
                <div
                  key={step.title}
                  className="relative rounded-2xl border border-border bg-white p-8 text-center shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full gradient-accent text-sm font-bold text-white shadow-md">
                      {i + 1}
                    </span>
                  </div>
                  <div className="mx-auto mt-2 mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-50">
                    <step.icon className="h-7 w-7 text-accent-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Companies */}
          <div className="mt-20">
            <div className="mb-8 flex items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-100 px-4 py-1.5 text-sm font-semibold text-primary-700">
                <Building2 className="h-4 w-4" />
                Para Empresas
              </span>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {companySteps.map((step, i) => (
                <div
                  key={step.title}
                  className="relative rounded-2xl border border-border bg-white p-8 text-center shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full gradient-primary text-sm font-bold text-white shadow-md">
                      {i + 1}
                    </span>
                  </div>
                  <div className="mx-auto mt-2 mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50">
                    <step.icon className="h-7 w-7 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CATEGORIES ==================== */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Categorias em Destaque
            </h2>
            <p className="mt-3 text-lg text-foreground-secondary">
              Vagas temporárias nos principais setores do mercado
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((cat) => (
              <div
                key={cat.label}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary-200"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${cat.color}`}
                >
                  <cat.icon className="h-7 w-7" />
                </div>
                <span className="text-sm font-semibold text-foreground">
                  {cat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== BENEFITS ==================== */}
      <section className="bg-gray-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Por que escolher o{' '}
                <span className="text-primary-600">TurnoJá</span>?
              </h2>
              <p className="mt-4 text-lg text-foreground-secondary leading-relaxed">
                Desenvolvemos a plataforma pensando em quem precisa de
                flexibilidade e segurança no trabalho temporário.
              </p>

              <div className="mt-8 space-y-5">
                {[
                  {
                    icon: Zap,
                    title: 'Rapidez',
                    desc: 'Publique vagas ou encontre trabalho em minutos, não em dias.',
                  },
                  {
                    icon: Shield,
                    title: 'Segurança',
                    desc: 'Perfis verificados, pagamentos protegidos e avaliações transparentes.',
                  },
                  {
                    icon: TrendingUp,
                    title: 'Crescimento',
                    desc: 'Construa sua reputação, ganhe visibilidade e aumente seus ganhos.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-100">
                      <item.icon className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-sm text-foreground-secondary leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual placeholder card */}
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary-500/20 via-secondary-500/20 to-accent-500/20 blur-2xl" />
              <div className="relative rounded-2xl border border-border bg-white p-8 shadow-xl">
                <div className="flex items-center gap-3 pb-5 border-b border-border">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full gradient-primary">
                    <span className="text-base font-bold text-white">T</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      TurnoJá
                    </p>
                    <p className="text-xs text-foreground-muted">
                      Painel do trabalhador
                    </p>
                  </div>
                </div>
                <div className="mt-5 space-y-4">
                  <div className="rounded-xl bg-success-50 p-4">
                    <p className="text-xs font-medium text-success-700">
                      Ganhos esta semana
                    </p>
                    <p className="mt-1 text-2xl font-bold text-success-700">
                      R$ 1.240,00
                    </p>
                  </div>
                  <div className="space-y-2">
                    {['Garçom - Restaurante Bella', 'Estoquista - Loja Express', 'Auxiliar - Evento Corp'].map(
                      (item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 rounded-lg bg-gray-50 p-3"
                        >
                          <CheckCircle className="h-4 w-4 text-success-500 shrink-0" />
                          <span className="text-sm text-foreground">
                            {item}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="relative overflow-hidden bg-gray-900 py-20 sm:py-28">
        <div className="absolute inset-0 opacity-30 gradient-hero" />
        <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-primary-500/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-accent-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Pronto para começar?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Junte-se a milhares de trabalhadores e empresas que já estão
            transformando o mercado de trabalho temporário no Brasil.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/cadastro/trabalhador">
              <Button size="xl" variant="accent" className="w-full sm:w-auto gap-2 text-base shadow-lg">
                Quero Trabalhar
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/cadastro/empresa">
              <Button
                size="xl"
                variant="outline"
                className="w-full sm:w-auto gap-2 text-base border-gray-600 text-white hover:bg-white/10 hover:border-gray-400 hover:text-white"
              >
                <Building2 className="h-5 w-5" />
                Cadastrar Empresa
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

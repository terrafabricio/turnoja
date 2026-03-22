'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Briefcase,
  Users,
  History,
  CreditCard,
  Star,
  User,
  Settings,
  Bell,
  HelpCircle,
  Search,
  Calendar,
  FileText,
  Wallet,
  Shield,
  Flag,
  BarChart3,
  Ban,
  CheckSquare,
  Menu,
  X,
  LogOut,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface NavItem {
  label: string
  href: string
  icon: LucideIcon
  badge?: number
}

const empresaNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/empresa/dashboard', icon: LayoutDashboard },
  { label: 'Minhas Vagas', href: '/empresa/vagas', icon: Briefcase },
  { label: 'Histórico', href: '/empresa/historico', icon: History },
  { label: 'Pagamentos', href: '/empresa/pagamentos', icon: CreditCard },
  { label: 'Avaliações', href: '/empresa/avaliacoes', icon: Star },
  { label: 'Perfil', href: '/empresa/perfil', icon: User },
  { label: 'Notificações', href: '/empresa/notificacoes', icon: Bell },
  { label: 'Configurações', href: '/empresa/configuracoes', icon: Settings },
  { label: 'Suporte', href: '/empresa/suporte', icon: HelpCircle },
]

const trabalhadorNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/trabalhador/dashboard', icon: LayoutDashboard },
  { label: 'Buscar Vagas', href: '/trabalhador/vagas', icon: Search },
  { label: 'Candidaturas', href: '/trabalhador/candidaturas', icon: Briefcase },
  { label: 'Agenda', href: '/trabalhador/agenda', icon: Calendar },
  { label: 'Histórico', href: '/trabalhador/historico', icon: History },
  { label: 'Carteira', href: '/trabalhador/carteira', icon: Wallet },
  { label: 'Avaliações', href: '/trabalhador/avaliacoes', icon: Star },
  { label: 'Perfil', href: '/trabalhador/perfil', icon: User },
  { label: 'Documentos', href: '/trabalhador/documentos', icon: FileText },
  { label: 'Notificações', href: '/trabalhador/notificacoes', icon: Bell },
  { label: 'Configurações', href: '/trabalhador/configuracoes', icon: Settings },
  { label: 'Suporte', href: '/trabalhador/suporte', icon: HelpCircle },
]

const adminNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Usuários', href: '/admin/usuarios', icon: Users },
  { label: 'Empresas', href: '/admin/empresas', icon: Briefcase },
  { label: 'Trabalhadores', href: '/admin/trabalhadores', icon: User },
  { label: 'Vagas', href: '/admin/vagas', icon: Search },
  { label: 'Pagamentos', href: '/admin/pagamentos', icon: CreditCard },
  { label: 'Verificações', href: '/admin/verificacoes', icon: CheckSquare },
  { label: 'Denúncias', href: '/admin/denuncias', icon: Flag },
  { label: 'Suporte', href: '/admin/suporte', icon: HelpCircle },
  { label: 'Métricas', href: '/admin/metricas', icon: BarChart3 },
  { label: 'Suspensões', href: '/admin/suspensoes', icon: Ban },
]

interface SidebarProps {
  role: 'empresa' | 'trabalhador' | 'admin'
  userName?: string
  userEmail?: string
}

export function Sidebar({ role, userName = 'Usuário', userEmail = '' }: SidebarProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = role === 'empresa'
    ? empresaNavItems
    : role === 'trabalhador'
    ? trabalhadorNavItems
    : adminNavItems

  const roleLabel = role === 'empresa' ? 'Empresa' : role === 'trabalhador' ? 'Trabalhador' : 'Admin'
  const roleColor = role === 'empresa' ? 'bg-primary-100 text-primary-700' : role === 'trabalhador' ? 'bg-accent-100 text-accent-700' : 'bg-secondary-100 text-secondary-700'

  const sidebarContent = (
    <>
      <div className="flex items-center gap-3 px-4 py-5 border-b border-border">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
          <span className="text-sm font-bold text-white">T</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-foreground">TurnoJá</p>
          <span className={cn('inline-block text-xs font-medium px-1.5 py-0.5 rounded-full mt-0.5', roleColor)}>
            {roleLabel}
          </span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-foreground-secondary hover:bg-gray-50 hover:text-foreground'
              )}
            >
              <item.icon className={cn('h-4.5 w-4.5 shrink-0', isActive ? 'text-primary-600' : '')} />
              <span className="truncate">{item.label}</span>
              {item.badge && item.badge > 0 && (
                <span className="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-danger-500 px-1.5 text-xs font-medium text-white">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-border px-3 py-3">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-medium text-primary-700">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{userName}</p>
            <p className="text-xs text-foreground-muted truncate">{userEmail}</p>
          </div>
          <button className="rounded-lg p-1.5 text-foreground-muted hover:text-foreground hover:bg-gray-100 transition-colors">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="fixed left-4 top-4 z-50 rounded-lg bg-white p-2 shadow-md border border-border lg:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-border bg-white transition-transform duration-200 lg:static lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {sidebarContent}
      </aside>
    </>
  )
}

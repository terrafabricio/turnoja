'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn'

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
            <span className="text-sm font-bold text-white">T</span>
          </div>
          <span className="text-xl font-bold text-foreground">
            Turno<span className="text-primary-600">Já</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/como-funciona" className="text-sm font-medium text-foreground-secondary hover:text-foreground transition-colors">
            Como Funciona
          </Link>
          <Link href="/login" className="text-sm font-medium text-foreground-secondary hover:text-foreground transition-colors">
            Entrar
          </Link>
          <Link href="/cadastro/empresa">
            <Button variant="outline" size="sm">
              Sou Empresa
            </Button>
          </Link>
          <Link href="/cadastro/trabalhador">
            <Button size="sm">
              Quero Trabalhar
            </Button>
          </Link>
        </nav>

        <button
          className="md:hidden rounded-lg p-2 hover:bg-gray-100 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white animate-fade-in">
          <div className="flex flex-col gap-2 p-4">
            <Link
              href="/como-funciona"
              className="rounded-lg px-3 py-2 text-sm font-medium text-foreground-secondary hover:bg-gray-50"
              onClick={() => setMobileOpen(false)}
            >
              Como Funciona
            </Link>
            <Link
              href="/login"
              className="rounded-lg px-3 py-2 text-sm font-medium text-foreground-secondary hover:bg-gray-50"
              onClick={() => setMobileOpen(false)}
            >
              Entrar
            </Link>
            <div className="flex flex-col gap-2 pt-2 border-t border-border">
              <Link href="/cadastro/empresa" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" className="w-full">
                  Sou Empresa
                </Button>
              </Link>
              <Link href="/cadastro/trabalhador" onClick={() => setMobileOpen(false)}>
                <Button className="w-full">
                  Quero Trabalhar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

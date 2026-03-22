import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                <span className="text-sm font-bold text-white">T</span>
              </div>
              <span className="text-xl font-bold text-foreground">
                Turno<span className="text-primary-600">Já</span>
              </span>
            </div>
            <p className="mt-3 text-sm text-foreground-secondary leading-relaxed">
              Conectando empresas a trabalhadores temporários de forma rápida, segura e profissional.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Plataforma</h4>
            <ul className="mt-3 space-y-2">
              <li><Link href="/como-funciona" className="text-sm text-foreground-secondary hover:text-primary-600 transition-colors">Como Funciona</Link></li>
              <li><Link href="/cadastro/empresa" className="text-sm text-foreground-secondary hover:text-primary-600 transition-colors">Para Empresas</Link></li>
              <li><Link href="/cadastro/trabalhador" className="text-sm text-foreground-secondary hover:text-primary-600 transition-colors">Para Trabalhadores</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Suporte</h4>
            <ul className="mt-3 space-y-2">
              <li><Link href="#" className="text-sm text-foreground-secondary hover:text-primary-600 transition-colors">Central de Ajuda</Link></li>
              <li><Link href="#" className="text-sm text-foreground-secondary hover:text-primary-600 transition-colors">Termos de Uso</Link></li>
              <li><Link href="#" className="text-sm text-foreground-secondary hover:text-primary-600 transition-colors">Privacidade</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Contato</h4>
            <ul className="mt-3 space-y-2">
              <li><span className="text-sm text-foreground-secondary">contato@turnoja.com.br</span></li>
              <li><span className="text-sm text-foreground-secondary">(11) 99999-9999</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-center text-sm text-foreground-muted">
            &copy; {new Date().getFullYear()} TurnoJá. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

import { Sidebar } from '@/components/layout/sidebar'

export default function EmpresaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar role="empresa" />
      <main className="flex-1 overflow-y-auto bg-background-secondary p-6 lg:p-8">
        {children}
      </main>
    </div>
  )
}

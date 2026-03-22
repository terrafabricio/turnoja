import { Badge } from './badge'

const jobStatusConfig: Record<string, { label: string; variant: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'secondary' }> = {
  rascunho: { label: 'Rascunho', variant: 'default' },
  publicada: { label: 'Publicada', variant: 'primary' },
  em_andamento: { label: 'Em Andamento', variant: 'warning' },
  concluida: { label: 'Concluída', variant: 'success' },
  cancelada: { label: 'Cancelada', variant: 'danger' },
}

const applicationStatusConfig: Record<string, { label: string; variant: 'default' | 'primary' | 'success' | 'warning' | 'danger' }> = {
  pendente: { label: 'Pendente', variant: 'warning' },
  aceita: { label: 'Aceita', variant: 'success' },
  recusada: { label: 'Recusada', variant: 'danger' },
  cancelada: { label: 'Cancelada', variant: 'default' },
}

const assignmentStatusConfig: Record<string, { label: string; variant: 'default' | 'primary' | 'success' | 'warning' | 'danger' }> = {
  confirmado: { label: 'Confirmado', variant: 'primary' },
  em_andamento: { label: 'Em Andamento', variant: 'warning' },
  concluido: { label: 'Concluído', variant: 'success' },
  no_show: { label: 'No-show', variant: 'danger' },
  cancelado: { label: 'Cancelado', variant: 'default' },
}

const paymentStatusConfig: Record<string, { label: string; variant: 'default' | 'primary' | 'success' | 'warning' | 'danger' }> = {
  pendente: { label: 'Pendente', variant: 'warning' },
  processando: { label: 'Processando', variant: 'primary' },
  pago: { label: 'Pago', variant: 'success' },
  falhou: { label: 'Falhou', variant: 'danger' },
}

type StatusType = 'job' | 'application' | 'assignment' | 'payment'

const configMap: Record<StatusType, Record<string, { label: string; variant: string }>> = {
  job: jobStatusConfig,
  application: applicationStatusConfig,
  assignment: assignmentStatusConfig,
  payment: paymentStatusConfig,
}

interface StatusBadgeProps {
  type: StatusType
  status: string
}

export function StatusBadge({ type, status }: StatusBadgeProps) {
  const config = configMap[type]?.[status]
  if (!config) return <Badge>{status}</Badge>
  return <Badge variant={config.variant as 'default'}>{config.label}</Badge>
}

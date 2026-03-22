/**
 * Application constants for TurnoJá
 */

export const JOB_CATEGORIES: Record<string, string> = {
  garcom: 'Garcom',
  cozinheiro: 'Cozinheiro(a)',
  auxiliar_cozinha: 'Auxiliar de Cozinha',
  barman: 'Barman/Barwoman',
  hostess: 'Hostess/Recepcionista',
  lavador: 'Lavador(a) de Pratos',
  confeiteiro: 'Confeiteiro(a)',
  padeiro: 'Padeiro(a)',
  churrasqueiro: 'Churrasqueiro(a)',
  pizzaiolo: 'Pizzaiolo(a)',
  sushiman: 'Sushiman',
  sommelier: 'Sommelier',
  maitre: 'Maitre',
  copeiro: 'Copeiro(a)',
  steward: 'Steward',
  cumim: 'Cumim',
  bartender: 'Bartender',
  atendente: 'Atendente',
  caixa: 'Caixa',
  entregador: 'Entregador(a)',
  promoter: 'Promoter',
  seguranca: 'Seguranca',
  limpeza: 'Limpeza',
  outro: 'Outro',
}

export const JOB_STATUS_LABELS: Record<string, string> = {
  draft: 'Rascunho',
  open: 'Aberta',
  in_progress: 'Em Andamento',
  filled: 'Preenchida',
  completed: 'Concluida',
  cancelled: 'Cancelada',
}

export const APPLICATION_STATUS_LABELS: Record<string, string> = {
  pending: 'Pendente',
  accepted: 'Aceita',
  rejected: 'Recusada',
  withdrawn: 'Retirada',
  completed: 'Concluida',
  no_show: 'Nao Compareceu',
}

export const PAYMENT_STATUS_LABELS: Record<string, string> = {
  pending: 'Pendente',
  processing: 'Processando',
  completed: 'Pago',
  failed: 'Falhou',
  refunded: 'Reembolsado',
}

export const BRAZILIAN_STATES = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapa' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceara' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espirito Santo' },
  { value: 'GO', label: 'Goias' },
  { value: 'MA', label: 'Maranhao' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Para' },
  { value: 'PB', label: 'Paraiba' },
  { value: 'PR', label: 'Parana' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piaui' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondonia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'Sao Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
] as const

export const DEFAULT_AVATAR_URL = '/images/default-avatar.png'

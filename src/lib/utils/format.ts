/**
 * Brazilian formatting helpers for TurnoJá
 */

/**
 * Formats a value in cents to Brazilian Real currency format.
 * @example formatCurrency(15990) => "R$ 159,90"
 * @example formatCurrency(1000000) => "R$ 10.000,00"
 */
export function formatCurrency(cents: number): string {
  const value = cents / 100
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

/**
 * Formats a CPF string.
 * @example formatCPF("12345678901") => "123.456.789-01"
 */
export function formatCPF(cpf: string): string {
  const digits = cpf.replace(/\D/g, '')
  if (digits.length !== 11) return cpf
  return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

/**
 * Formats a CNPJ string.
 * @example formatCNPJ("12345678000190") => "12.345.678/0001-90"
 */
export function formatCNPJ(cnpj: string): string {
  const digits = cnpj.replace(/\D/g, '')
  if (digits.length !== 14) return cnpj
  return digits.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    '$1.$2.$3/$4-$5'
  )
}

/**
 * Formats a phone number to Brazilian format.
 * @example formatPhone("11999998888") => "(11) 99999-8888"
 * @example formatPhone("1133334444") => "(11) 3333-4444"
 */
export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')

  if (digits.length === 11) {
    return digits.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }
  if (digits.length === 10) {
    return digits.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }

  return phone
}

/**
 * Formats a date to DD/MM/YYYY.
 * @example formatDate("2024-03-15") => "15/03/2024"
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

/**
 * Formats a date to DD/MM/YYYY HH:MM.
 * @example formatDateTime("2024-03-15T14:30:00") => "15/03/2024 14:30"
 */
export function formatDateTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Formats a time string to HH:MM.
 * @example formatTime("14:30:00") => "14:30"
 * @example formatTime("09:05") => "09:05"
 */
export function formatTime(time: string): string {
  const parts = time.split(':')
  if (parts.length >= 2) {
    return `${parts[0].padStart(2, '0')}:${parts[1].padStart(2, '0')}`
  }
  return time
}

/**
 * Returns a relative time string in Portuguese.
 * @example getRelativeTime(new Date(Date.now() - 3600000)) => "há 1 hora"
 * @example getRelativeTime(new Date(Date.now() - 86400000)) => "ontem"
 */
export function getRelativeTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffSeconds = Math.floor(diffMs / 1000)
  const diffMinutes = Math.floor(diffSeconds / 60)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)
  const diffWeeks = Math.floor(diffDays / 7)
  const diffMonths = Math.floor(diffDays / 30)
  const diffYears = Math.floor(diffDays / 365)

  if (diffSeconds < 60) {
    return 'agora mesmo'
  }
  if (diffMinutes === 1) {
    return 'há 1 minuto'
  }
  if (diffMinutes < 60) {
    return `há ${diffMinutes} minutos`
  }
  if (diffHours === 1) {
    return 'há 1 hora'
  }
  if (diffHours < 24) {
    return `há ${diffHours} horas`
  }
  if (diffDays === 1) {
    return 'ontem'
  }
  if (diffDays < 7) {
    return `há ${diffDays} dias`
  }
  if (diffWeeks === 1) {
    return 'há 1 semana'
  }
  if (diffWeeks < 4) {
    return `há ${diffWeeks} semanas`
  }
  if (diffMonths === 1) {
    return 'há 1 mês'
  }
  if (diffMonths < 12) {
    return `há ${diffMonths} meses`
  }
  if (diffYears === 1) {
    return 'há 1 ano'
  }
  return `há ${diffYears} anos`
}

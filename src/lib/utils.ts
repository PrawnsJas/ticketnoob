import { DifficultyMode } from '@/types'

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 0,
  }).format(price)
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 5).toUpperCase()
  return `ORD-${timestamp}-${random}`
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}m ${secs}s`
}

export function getDifficultyColor(difficulty: DifficultyMode): string {
  switch (difficulty) {
    case 'easy':
      return '#00FF00'
    case 'sale-day':
      return '#FFD60A'
    case 'bts-chaos':
      return '#FF006E'
    default:
      return '#00D9FF'
  }
}

export function getDifficultyLabel(difficulty: DifficultyMode): string {
  switch (difficulty) {
    case 'easy':
      return 'Easy Mode'
    case 'sale-day':
      return 'Sale Day'
    case 'bts-chaos':
      return 'BTS-Level Chaos'
    default:
      return 'Unknown'
  }
}

export type DifficultyMode = 'easy' | 'sale-day' | 'bts-chaos'

export type SeatStatus = 'available' | 'sold' | 'selected'

export type TicketTier = 'vip' | 'lower' | 'upper' | 'gen'

export interface Event {
  id: string
  artist: string
  date: string
  venue: string
  venueId: string
  totalCapacity: number
  currentSoldOut: boolean
  saleOpenTime: string
  tiers: TicketTierInfo[]
  imageUrl?: string
}

export interface TicketTierInfo {
  id: TicketTier
  name: string
  price: number
  available: number
  total: number
}

export interface Seat {
  id: string
  section: string
  row: string
  seatNumber: number
  status: SeatStatus
  tier: TicketTier
}

export interface QueuePosition {
  position: number
  totalInQueue: number
  estimatedWaitSeconds: number
  status: 'waiting' | 'paused' | 'ready'
  ticketsRemaining: number
}

export interface CartItem {
  eventId: string
  tier: TicketTier
  seats: string[]
  quantity: number
  totalPrice: number
}

export interface Order {
  orderNumber: string
  eventId: string
  tier: TicketTier
  seats: string[]
  totalPrice: number
  paymentMethod: string
  timestamp: number
  queueWaitTime: number
  seatSelectionTime: number
  checkoutTime: number
}

export interface TrainingStats {
  queueWaitTime: number
  seatSelectionTime: number
  checkoutTime: number
  totalTime: number
  ticketsPurchased: number
  ordersCompleted: number
  highestQueuePosition: number
}

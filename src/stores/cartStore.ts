import { create } from 'zustand'
import { TicketTier } from '../types'

interface CartItem {
  id: string
  section: string
  row: string
  seatNumber: number
  tier: TicketTier
  price: number
}

interface CartStoreState {
  items: CartItem[]
  eventId: string | null
  tier: TicketTier | null
  cartExpiresAt: number | null
  seatSelectionStartTime: number | null

  addItem: (item: CartItem) => void
  removeItem: (itemId: string) => void
  setEventContext: (eventId: string, tier: TicketTier) => void
  setCartExpiry: (expiresAt: number) => void
  setSeatSelectionStartTime: (time: number) => void
  getTotalPrice: () => number
  reset: () => void
}

export const useCartStore = create<CartStoreState>((set, get) => ({
  items: [],
  eventId: null,
  tier: null,
  cartExpiresAt: null,
  seatSelectionStartTime: null,

  addItem: (item) => set((state) => ({
    items: [...state.items, item],
  })),

  removeItem: (itemId) => set((state) => ({
    items: state.items.filter((item) => item.id !== itemId),
  })),

  setEventContext: (eventId, tier) => set({
    eventId,
    tier,
  }),

  setCartExpiry: (expiresAt) => set({ cartExpiresAt: expiresAt }),

  setSeatSelectionStartTime: (time) => set({ seatSelectionStartTime: time }),

  getTotalPrice: () => {
    const { items } = get()
    return items.reduce((sum, item) => sum + item.price, 0)
  },

  reset: () => set({
    items: [],
    eventId: null,
    tier: null,
    cartExpiresAt: null,
    seatSelectionStartTime: null,
  }),
}))

import { create } from 'zustand'
import { Event, TicketTier } from '../types'

interface EventStoreState {
  selectedEvent: Event | null
  selectedDate: string | null
  selectedVenue: string | null
  selectedTier: TicketTier | null
  quantity: number

  setSelectedEvent: (event: Event) => void
  setSelectedDate: (date: string) => void
  setSelectedVenue: (venue: string) => void
  setSelectedTier: (tier: TicketTier) => void
  setQuantity: (qty: number) => void
  reset: () => void
}

export const useEventStore = create<EventStoreState>((set) => ({
  selectedEvent: null,
  selectedDate: null,
  selectedVenue: null,
  selectedTier: null,
  quantity: 1,

  setSelectedEvent: (event) => set({ selectedEvent: event }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setSelectedVenue: (venue) => set({ selectedVenue: venue }),
  setSelectedTier: (tier) => set({ selectedTier: tier }),
  setQuantity: (qty) => set({ quantity: qty }),
  reset: () => set({
    selectedEvent: null,
    selectedDate: null,
    selectedVenue: null,
    selectedTier: null,
    quantity: 1,
  }),
}))

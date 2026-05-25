import { create } from 'zustand'
import { Order } from '../types'

interface CheckoutStoreState {
  paymentMethod: string | null
  isProcessing: boolean
  order: Order | null
  checkoutStartTime: number | null

  setPaymentMethod: (method: string) => void
  setIsProcessing: (processing: boolean) => void
  setOrder: (order: Order) => void
  setCheckoutStartTime: (time: number) => void
  reset: () => void
}

export const useCheckoutStore = create<CheckoutStoreState>((set) => ({
  paymentMethod: null,
  isProcessing: false,
  order: null,
  checkoutStartTime: null,

  setPaymentMethod: (method) => set({ paymentMethod: method }),
  setIsProcessing: (processing) => set({ isProcessing: processing }),
  setOrder: (order) => set({ order }),
  setCheckoutStartTime: (time) => set({ checkoutStartTime: time }),
  reset: () => set({
    paymentMethod: null,
    isProcessing: false,
    order: null,
    checkoutStartTime: null,
  }),
}))

import { create } from 'zustand'
import { QueuePosition } from '../types'

interface QueueStoreState {
  position: QueuePosition | null
  hasPassedPopupCheck: boolean
  isInQueue: boolean
  startTime: number | null

  setPosition: (position: QueuePosition) => void
  setPassedPopupCheck: (passed: boolean) => void
  setIsInQueue: (inQueue: boolean) => void
  setStartTime: (time: number) => void
  reset: () => void
}

export const useQueueStore = create<QueueStoreState>((set) => ({
  position: null,
  hasPassedPopupCheck: false,
  isInQueue: false,
  startTime: null,

  setPosition: (position) => set({ position }),
  setPassedPopupCheck: (passed) => set({ hasPassedPopupCheck: passed }),
  setIsInQueue: (inQueue) => set({ isInQueue: inQueue }),
  setStartTime: (time) => set({ startTime: time }),
  reset: () => set({
    position: null,
    hasPassedPopupCheck: false,
    isInQueue: false,
    startTime: null,
  }),
}))

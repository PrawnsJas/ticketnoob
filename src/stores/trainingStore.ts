import { create } from 'zustand'
import { DifficultyMode, TrainingStats } from '@/types'

interface TrainingStoreState {
  difficulty: DifficultyMode
  soundEnabled: boolean
  stats: TrainingStats | null

  setDifficulty: (mode: DifficultyMode) => void
  setSoundEnabled: (enabled: boolean) => void
  setStats: (stats: TrainingStats) => void
  reset: () => void
}

export const useTrainingStore = create<TrainingStoreState>((set) => ({
  difficulty: 'sale-day',
  soundEnabled: true,
  stats: null,

  setDifficulty: (mode) => set({ difficulty: mode }),
  setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
  setStats: (stats) => set({ stats }),
  reset: () => set({
    difficulty: 'sale-day',
    soundEnabled: true,
    stats: null,
  }),
}))

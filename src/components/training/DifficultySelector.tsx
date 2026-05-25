'use client'

import { motion } from 'framer-motion'
import { DifficultyMode } from '../../types'
import { getDifficultyColor } from '../../lib/utils'

interface DifficultySelectorProps {
  selected: DifficultyMode | null
  onSelect: (mode: DifficultyMode) => void
}

export function DifficultySelector({ selected, onSelect }: DifficultySelectorProps) {
  const modes = [
    {
      id: 'easy' as DifficultyMode,
      name: 'Easy Mode',
      desc: 'Perfect for beginners',
      features: ['Generous timers', 'No crashes', 'Slow seat disappearance'],
    },
    {
      id: 'sale-day' as DifficultyMode,
      name: 'Sale Day',
      desc: 'Standard difficulty',
      features: ['Normal timers', 'Occasional stress', 'Realistic pressure'],
    },
    {
      id: 'bts-chaos' as DifficultyMode,
      name: 'BTS-Level Chaos',
      desc: 'Extreme difficulty',
      features: ['Aggressive timeouts', 'Frequent crashes', 'Queue resets'],
    },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        {modes.map((mode) => (
          <motion.button
            key={mode.id}
            whileHover={{ scale: 1.02, y: -5 }}
            onClick={() => onSelect(mode.id)}
            className={`p-6 rounded-lg border-2 text-left transition-all ${
              selected === mode.id
                ? 'border-neon-pink bg-gradient-to-br from-[#1a1a2e] to-[#16213e] shadow-lg shadow-pink-500/50'
                : 'border-gray-600 bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e] hover:border-neon-cyan'
            }`}
          >
            <h3 className="text-2xl font-bold mb-2" style={{ color: getDifficultyColor(mode.id) }}>
              {mode.name}
            </h3>
            <p className="text-sm text-gray-300 mb-4">{mode.desc}</p>
            <ul className="text-xs space-y-1">
              {mode.features.map((feature, i) => (
                <li key={i} className="text-gray-400">
                  ✓ {feature}
                </li>
              ))}
            </ul>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

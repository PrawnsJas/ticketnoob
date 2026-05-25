'use client'

import { motion } from 'framer-motion'
import { QueuePosition } from '@/types'

interface QueueProgressBarProps {
  position: QueuePosition
}

export function QueueProgressBar({ position }: QueueProgressBarProps) {
  const progress = Math.max(0, 100 - (position.position / position.totalInQueue) * 100)

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-neon-cyan font-bold">Queue Position: #{position.position}</span>
        <span className="text-neon-yellow">{Math.round(progress)}%</span>
      </div>
      <div className="h-4 bg-gray-700 rounded-full overflow-hidden border-2 border-[#FF006E]">
        <motion.div
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
          className="h-full bg-gradient-to-r from-[#FF006E] to-[#B500D9] relative"
        >
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute inset-0 bg-white/20"
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="p-3 bg-[#1a1a2e] rounded border border-[#B500D9]">
          <p className="text-xs text-gray-400 mb-1">Position</p>
          <p className="text-2xl font-bold text-neon-purple">#{position.position}</p>
        </div>
        <div className="p-3 bg-[#1a1a2e] rounded border border-[#00D9FF]">
          <p className="text-xs text-gray-400 mb-1">Estimated Wait</p>
          <p className="text-2xl font-bold text-neon-cyan">{position.estimatedWaitSeconds}s</p>
        </div>
        <div className="p-3 bg-[#1a1a2e] rounded border border-[#FFD60A]">
          <p className="text-xs text-gray-400 mb-1">Tickets Left</p>
          <p className="text-2xl font-bold text-neon-yellow">{position.ticketsRemaining}</p>
        </div>
      </div>

      {position.status === 'paused' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-3 bg-yellow-900/30 border border-yellow-500 rounded text-yellow-300 text-center text-sm font-bold"
        >
          ⏸️ Queue Paused - Waiting for inventory update
        </motion.div>
      )}

      {position.status === 'ready' && (
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="mt-4 p-3 bg-green-900/30 border border-green-500 rounded text-green-300 text-center text-sm font-bold"
        >
          ✅ You're next! Get ready...
        </motion.div>
      )}
    </div>
  )
}

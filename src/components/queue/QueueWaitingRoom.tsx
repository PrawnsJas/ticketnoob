'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { QueuePosition } from '@/types'
import { generateQueuePosition } from '@/lib/queueAlgorithm'
import { useQueue } from '@/hooks/useQueue'
import { QueueProgressBar } from './QueueProgressBar'
import { StressEventNotification } from './StressEventNotification'

interface QueueWaitingRoomProps {
  difficulty: string
  onReady: () => void
}

export function QueueWaitingRoom({ difficulty, onReady }: QueueWaitingRoomProps) {
  const [position, setPosition] = useState<QueuePosition | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const initialPosition = generateQueuePosition(difficulty)
    setPosition(initialPosition)
  }, [difficulty])

  useEffect(() => {
    if (!position) return

    const interval = setInterval(() => {
      setPosition((prev) => {
        if (!prev) return prev
        const newPos = Math.max(1, prev.position - 2)
        if (newPos <= 1 && !isReady) {
          setIsReady(true)
          setTimeout(() => onReady(), 2000)
        }
        return { ...prev, position: newPos }
      })
    }, 500)

    return () => clearInterval(interval)
  }, [position, onReady, isReady])

  const { stressEvent } = useQueue(difficulty)

  if (!position) return <div>Loading queue...</div>

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <StressEventNotification event={stressEvent} />
      <QueueProgressBar position={position} />

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border-2 border-[#00D9FF] rounded-lg">
          <p className="text-sm text-gray-400 mb-2">Fans Ahead</p>
          <p className="text-4xl font-bold text-neon-cyan">{position.totalInQueue - position.position}</p>
        </div>
        <div className="p-6 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border-2 border-[#FF006E] rounded-lg">
          <p className="text-sm text-gray-400 mb-2">Tickets Remaining</p>
          <motion.p
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-4xl font-bold text-neon-pink"
          >
            {position.ticketsRemaining}
          </motion.p>
        </div>
      </div>

      {isReady && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 bg-gradient-to-r from-green-900 to-green-800 border-2 border-green-400 rounded-lg text-center"
        >
          <p className="text-2xl font-bold text-green-300 mb-2">✅ You're in! Moving to seat selection...</p>
        </motion.div>
      )}
    </motion.div>
  )
}

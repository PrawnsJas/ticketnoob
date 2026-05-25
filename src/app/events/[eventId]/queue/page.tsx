'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { NetworkChecker } from '@/components/queue/NetworkChecker'
import { PopupDetector } from '@/components/queue/PopupDetector'
import { QueueWaitingRoom } from '@/components/queue/QueueWaitingRoom'
import { useQueueStore } from '@/stores/queueStore'
import { useTrainingStore } from '@/stores/trainingStore'
import { useEventStore } from '@/stores/eventStore'
import { generateQueuePosition } from '@/lib/queueAlgorithm'

export default function QueuePage() {
  const params = useParams()
  const eventId = params.eventId as string
  const router = useRouter()
  const [stage, setStage] = useState<'network' | 'popup' | 'queue' | 'ready'>('network')
  const { setPosition, setPassedPopupCheck, setIsInQueue, setStartTime } = useQueueStore()
  const { difficulty } = useTrainingStore()
  const { selectedEvent } = useEventStore()

  const handleNetworkCheck = () => {
    setTimeout(() => setStage('popup'), 1000)
  }

  const handlePopupPassed = () => {
    setPassedPopupCheck(true)
    setStage('queue')
    const position = generateQueuePosition(difficulty)
    setPosition(position)
    setIsInQueue(true)
    setStartTime(Date.now())
  }

  const handleQueueReady = () => {
    router.push(`/events/${eventId}/seats`)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <h1 className="text-4xl font-bold mb-2 text-neon-pink">{selectedEvent?.artist || 'Loading...'}</h1>
        <p className="text-gray-300">
          {stage === 'network' && '🔌 Checking your browser...'}
          {stage === 'popup' && '📋 Verifying popup access...'}
          {stage === 'queue' && '📍 You are in the queue'}
          {stage === 'ready' && '✅ Ready for seat selection'}
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto">
        {stage === 'network' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <NetworkChecker />
            <button
              onClick={handleNetworkCheck}
              className="w-full btn-primary mt-6"
            >
              Continue →
            </button>
          </motion.div>
        )}

        {stage === 'popup' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <PopupDetector onPassed={handlePopupPassed} />
          </motion.div>
        )}

        {(stage === 'queue' || stage === 'ready') && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <QueueWaitingRoom difficulty={difficulty} onReady={handleQueueReady} />
          </motion.div>
        )}
      </div>
    </div>
  )
}

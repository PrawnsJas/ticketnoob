import { useEffect, useState } from 'react'
import { useQueueStore } from '@/stores/queueStore'
import { simulateQueueProgress, shouldTriggerStressEvent, getRandomStressEvent } from '@/lib/queueAlgorithm'

export function useQueue(difficulty: string) {
  const { position, setPosition } = useQueueStore()
  const [stressEvent, setStressEvent] = useState<any>(null)

  useEffect(() => {
    if (!position) return

    const interval = setInterval(() => {
      const updated = simulateQueueProgress(position, 1, difficulty)
      setPosition(updated)

      if (shouldTriggerStressEvent(difficulty)) {
        const event = getRandomStressEvent()
        setStressEvent(event)
        setTimeout(() => setStressEvent(null), event.duration)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [position, difficulty, setPosition])

  return { position, stressEvent }
}

import { useEffect, useState } from 'react'
import { shouldTriggerStressEvent, getRandomStressEvent } from '../lib/queueAlgorithm'

export function useStressEvents(difficulty: string, enabled: boolean = true) {
  const [currentEvent, setCurrentEvent] = useState<any>(null)

  useEffect(() => {
    if (!enabled) return

    const checkInterval = setInterval(() => {
      if (shouldTriggerStressEvent(difficulty)) {
        const event = getRandomStressEvent()
        setCurrentEvent(event)
        setTimeout(() => setCurrentEvent(null), event.duration)
      }
    }, 3000)

    return () => clearInterval(checkInterval)
  }, [difficulty, enabled])

  return { currentEvent }
}

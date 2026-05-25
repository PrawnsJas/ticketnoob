import { QueuePosition } from '@/types'
import trainingModesData from '@/data/trainingModes.json'

export function generateQueuePosition(difficulty: string): QueuePosition {
  const modeData = trainingModesData.modes.find((m) => m.id === difficulty)
  const multiplier = modeData?.queueTimeMultiplier || 1

  const position = Math.floor(Math.random() * 5000) + 1
  const totalInQueue = Math.floor(Math.random() * 8000) + position + 1000
  const baseWaitSeconds = Math.floor((position / 100) * 60) * multiplier
  const estimatedWait = Math.max(30, Math.floor(baseWaitSeconds + Math.random() * 120))

  return {
    position,
    totalInQueue,
    estimatedWaitSeconds: estimatedWait,
    status: 'waiting',
    ticketsRemaining: Math.floor(Math.random() * 2000) + 500,
  }
}

export function simulateQueueProgress(
  currentPosition: QueuePosition,
  elapsedSeconds: number,
  difficulty: string,
): QueuePosition {
  const modeData = trainingModesData.modes.find((m) => m.id === difficulty)
  const progressRate = 0.8 / (modeData?.queueTimeMultiplier || 1)

  const peopleServed = Math.floor(elapsedSeconds * progressRate)
  const newPosition = Math.max(1, currentPosition.position - peopleServed)
  const newEstimated = Math.max(0, currentPosition.estimatedWaitSeconds - elapsedSeconds)

  let status: 'waiting' | 'paused' | 'ready' = 'waiting'
  if (newPosition <= 10) {
    status = 'ready'
  } else if (Math.random() < 0.05) {
    status = 'paused'
  }

  return {
    ...currentPosition,
    position: newPosition,
    estimatedWaitSeconds: newEstimated,
    status,
    ticketsRemaining: Math.max(0, currentPosition.ticketsRemaining - Math.floor(Math.random() * 5)),
  }
}

export function shouldTriggerStressEvent(difficulty: string): boolean {
  const modeData = trainingModesData.modes.find((m) => m.id === difficulty)
  const frequency = modeData?.stressEventFrequency || 0
  return Math.random() < frequency
}

export function getRandomStressEvent() {
  const events = trainingModesData.stressEvents
  return events[Math.floor(Math.random() * events.length)]
}

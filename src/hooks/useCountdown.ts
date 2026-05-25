import { useEffect, useState } from 'react'

export function useCountdown(initialSeconds: number, onExpire?: () => void) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds)
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true)
      onExpire?.()
      return
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [timeLeft, onExpire])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return {
    timeLeft,
    minutes,
    seconds,
    isExpired,
    formattedTime: `${minutes}:${seconds.toString().padStart(2, '0')}`,
  }
}

'use client'

import { motion } from 'framer-motion'
import { useCountdown } from '../../hooks/useCountdown'

interface CountdownTimerProps {
  initialSeconds: number
  onExpire?: () => void
  size?: 'sm' | 'md' | 'lg'
}

export function CountdownTimer({ initialSeconds, onExpire, size = 'md' }: CountdownTimerProps) {
  const { formattedTime, isExpired } = useCountdown(initialSeconds, onExpire)

  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-3xl',
    lg: 'text-5xl',
  }

  const textColor = isExpired ? 'text-red-500' : 'text-neon-cyan'

  return (
    <motion.div
      animate={{ scale: isExpired ? 1.1 : 1 }}
      className={`${sizeClasses[size]} ${textColor} font-mono font-bold text-center`}
    >
      {formattedTime}
    </motion.div>
  )
}

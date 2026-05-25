'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface StressEventNotificationProps {
  event: any | null
}

export function StressEventNotification({ event }: StressEventNotificationProps) {
  return (
    <AnimatePresence>
      {event && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className="mb-4 p-4 bg-gradient-to-r from-red-900 to-orange-900 border-2 border-red-500 rounded-lg text-center"
        >
          <motion.p
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="text-lg font-bold text-red-300"
          >
            {event.message}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

'use client'

import { Event } from '../../types'
import { EventCard } from './EventCard'
import { motion } from 'framer-motion'

interface EventGridProps {
  events: Event[]
}

export function EventGrid({ events }: EventGridProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {events.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <EventCard event={event} />
        </motion.div>
      ))}
    </motion.div>
  )
}

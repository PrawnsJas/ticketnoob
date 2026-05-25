'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { formatPrice, formatDate } from '../../lib/utils'

interface TicketTier {
  available: number
  price: number
}

interface Event {
  id: string
  artist: string
  venue: string
  date: string
  currentSoldOut: boolean
  totalCapacity: number
  tiers: TicketTier[]
}

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  const availableTiers = event.tiers.filter((t) => t.available > 0)
  const lowestPrice = availableTiers.length > 0 ? Math.min(...availableTiers.map((t) => t.price)) : null

  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border-2 border-[#FF006E]/30 rounded-lg overflow-hidden hover:border-[#FF006E] transition-colors"
    >
      <div className="h-32 bg-gradient-to-r from-[#FF006E] to-[#B500D9] relative flex items-center justify-center text-4xl">
        🎪
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-neon-pink mb-2">{event.artist}</h3>
        <p className="text-sm text-neon-cyan mb-2">{event.venue}</p>
        <p className="text-sm text-gray-400 mb-4">{formatDate(event.date)}</p>

        {event.currentSoldOut ? (
          <div className="mb-4 py-2 px-3 bg-red-900/50 border border-red-500 rounded text-red-300 text-sm font-bold text-center">
            SOLD OUT
          </div>
        ) : (
          <>
            <div className="mb-4">
              <div className="text-xs text-gray-400 mb-1">Tickets Available: {event.tiers.reduce((sum, t) => sum + t.available, 0)}</div>
              <motion.div
                className="h-2 bg-gray-700 rounded-full overflow-hidden"
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(event.tiers.reduce((sum, t) => sum + t.available, 0) / event.totalCapacity) * 100}%`,
                  }}
                  className="h-full bg-gradient-to-r from-[#FF006E] to-[#B500D9]"
                />
              </motion.div>
            </div>

            {lowestPrice && (
              <p className="text-sm text-neon-yellow font-bold mb-4">
                Starting from {formatPrice(lowestPrice)}
              </p>
            )}

            <Link
              href={`/events/${event.id}`}
              className="w-full block text-center py-2 bg-gradient-to-r from-[#FF006E] to-[#B500D9] hover:from-[#B500D9] hover:to-[#FF006E] text-white font-bold rounded transition-all"
            >
              Select Tickets →
            </Link>
          </>
        )}
      </div>
    </motion.div>
  )
}

'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Event, TicketTier } from '@/types'
import { formatPrice, formatDate } from '@/lib/utils'
import { useEventStore } from '@/stores/eventStore'
import eventsData from '@/data/events.json'

export default function EventDetailPage() {
  const params = useParams()
  const eventId = params.eventId as string
  const router = useRouter()
  const [event, setEvent] = useState<Event | null>(null)
  const [selectedTier, setSelectedTier] = useState<TicketTier | null>(null)
  const { setSelectedEvent, setSelectedTier: setStoreTier } = useEventStore()

  useEffect(() => {
    const found = eventsData.find((e) => e.id === eventId)
    if (found) {
      setEvent(found)
      setSelectedEvent(found)
    }
  }, [eventId, setSelectedEvent])

  const handleSelectTier = (tier: TicketTier) => {
    if (event && event.currentSoldOut) return

    setSelectedTier(tier)
    setStoreTier(tier)
    setTimeout(() => {
      router.push(`/events/${eventId}/queue`)
    }, 500)
  }

  if (!event) return <div className="text-center py-12">Loading event...</div>

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <div className="mb-6">
          <h1 className="text-5xl font-bold mb-2 text-neon-pink">{event.artist}</h1>
          <p className="text-xl text-neon-cyan">{event.venue}</p>
          <p className="text-lg text-gray-300">{formatDate(event.date)}</p>
        </div>

        {event.currentSoldOut && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 bg-red-900/50 border-2 border-red-500 rounded-lg text-center text-red-300 font-bold text-lg"
          >
            ❌ This event is currently sold out. Try another event!
          </motion.div>
        )}
      </motion.div>

      {!event.currentSoldOut && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <h2 className="text-3xl font-bold text-neon-cyan mb-8">Select Ticket Tier</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {event.tiers.map((tier, i) => (
              <motion.button
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                onClick={() => handleSelectTier(tier.id as TicketTier)}
                className={`p-6 rounded-lg border-2 text-left transition-all ${
                  tier.available === 0
                    ? 'border-gray-600 bg-gray-900/50 opacity-50 cursor-not-allowed'
                    : 'border-[#FF006E] bg-gradient-to-br from-[#1a1a2e] to-[#16213e] hover:border-[#00D9FF] hover:shadow-lg hover:shadow-pink-500/50'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-neon-pink">{tier.name}</h3>
                  {tier.available === 0 && <span className="text-red-400 font-bold">SOLD OUT</span>}
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-gray-400 text-sm">Price per ticket</p>
                    <p className="text-3xl font-bold text-neon-yellow">{formatPrice(tier.price)}</p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">Available</p>
                    <p className="text-xl text-neon-cyan">{tier.available.toLocaleString()} tickets</p>
                  </div>

                  {tier.available > 0 && (
                    <div className="mt-4 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(tier.available / tier.total) * 100}%` }}
                        className="h-full bg-gradient-to-r from-[#FF006E] to-[#B500D9]"
                      />
                    </div>
                  )}
                </div>

                {tier.available > 0 && (
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mt-4 text-center py-2 bg-[#FF006E]/20 rounded text-neon-pink font-bold"
                  >
                    Click to Continue →
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

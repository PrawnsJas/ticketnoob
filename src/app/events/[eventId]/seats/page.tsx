'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Seat } from '../../../../types'
import { SeatMap } from '../../../../components/seats/SeatMap'
import { SelectedSeatsPanel } from '../../../../components/seats/SelectedSeatsPanel'
import { CountdownTimer } from '../../../../components/common/CountdownTimer'
import { useEventStore } from '../../../../stores/eventStore'
import { useCartStore } from '../../../../stores/cartStore'
import eventsData from '../../../../data/events.json'

export default function SeatsPage() {
  const params = useParams()
  const eventId = params.eventId as string
  const router = useRouter()
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([])
  const { selectedTier } = useEventStore()
  const { setEventContext, setCartExpiry, addItem, setSeatSelectionStartTime, reset } = useCartStore()

  const event = eventsData.find((e) => e.id === eventId)
  const tierInfo = event?.tiers.find((t) => t.id === selectedTier)

  useEffect(() => {
    if (event && selectedTier) {
      reset()
      setEventContext(eventId, selectedTier)
      setSeatSelectionStartTime(Date.now())
      setCartExpiry(Date.now() + 300000)
    }
  }, [event, selectedTier, eventId, reset, setEventContext, setSeatSelectionStartTime, setCartExpiry])

  const handleProceedToCheckout = () => {
    if (selectedSeats.length === 0) return

    selectedSeats.forEach((seat) => {
      addItem({
        id: seat.id,
        section: seat.section,
        row: seat.row,
        seatNumber: seat.seatNumber,
        tier: selectedTier!,
        price: tierInfo?.price || 0,
      })
    })

    router.push(`/events/${eventId}/checkout`)
  }

  const handleCartExpired = () => {
    router.push(`/events/${eventId}`)
  }

  if (!event || !selectedTier || !tierInfo) return <div className="text-center py-12">Loading...</div>

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-neon-pink">Select Your Seats</h1>
        <p className="text-gray-300">
          You have <span className="font-bold text-neon-yellow">5 minutes</span> to select your seats
        </p>
      </motion.div>

      <div className="mb-6 p-4 bg-gradient-to-r from-red-900 to-orange-900 border-2 border-red-500 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-red-300 font-bold">⏰ Cart expires in:</span>
          <CountdownTimer
            initialSeconds={300}
            onExpire={handleCartExpired}
            size="sm"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SeatMap
            venueId={event.venueId}
            tier={selectedTier}
            difficulty="sale-day"
            maxSeats={6}
            onSeatsSelected={setSelectedSeats}
          />
        </div>

        <div>
          <SelectedSeatsPanel seats={selectedSeats} tier={selectedTier} tierPrice={tierInfo.price} />

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={handleProceedToCheckout}
            disabled={selectedSeats.length === 0}
            className="w-full btn-primary mt-6 disabled:opacity-50 py-3"
          >
            Proceed to Checkout →
          </motion.button>
        </div>
      </div>
    </div>
  )
}

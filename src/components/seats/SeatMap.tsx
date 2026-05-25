'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Seat, TicketTier } from '@/types'
import { useSeatMap } from '@/hooks/useSeatMap'
import venuesData from '@/data/venues.json'

interface SeatMapProps {
  venueId: string
  tier: TicketTier
  difficulty: string
  maxSeats: number
  onSeatsSelected: (seats: Seat[]) => void
}

export function SeatMap({ venueId, tier, difficulty, maxSeats, onSeatsSelected }: SeatMapProps) {
  const { seats, loading } = useSeatMap(venueId, tier, difficulty)
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([])

  const venue = venuesData[venueId as keyof typeof venuesData]
  const section = venue?.sections.find((s) => s.tier === tier)

  const toggleSeat = (seat: Seat) => {
    if (seat.status === 'sold') return
    if (seat.status === 'selected') {
      setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id))
    } else if (selectedSeats.length < maxSeats) {
      setSelectedSeats([...selectedSeats, seat])
    }
  }

  useEffect(() => {
    onSeatsSelected(selectedSeats)
  }, [selectedSeats, onSeatsSelected])

  if (loading) return <div className="text-center py-8">Loading seats...</div>

  const groupedByRow = seats.reduce(
    (acc, seat) => {
      if (!acc[seat.row]) acc[seat.row] = []
      acc[seat.row].push(seat)
      return acc
    },
    {} as Record<string, Seat[]>,
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-neon-cyan">{section?.name || 'Seats'}</h3>
        <span className="text-sm text-gray-400">
          Selected: {selectedSeats.length}/{maxSeats}
        </span>
      </div>

      <div className="p-4 bg-[#0a0a0f] rounded-lg overflow-x-auto">
        <div className="inline-block">
          <div className="text-center text-sm text-gray-400 mb-4 font-bold">🎭 STAGE 🎭</div>
          {Object.entries(groupedByRow)
            .sort()
            .map(([row, rowSeats]) => (
              <div key={row} className="flex items-center gap-2 mb-2">
                <span className="w-6 text-right text-xs text-gray-500">{row}</span>
                <div className="flex gap-1">
                  {rowSeats.map((seat) => (
                    <motion.button
                      key={seat.id}
                      whileHover={seat.status !== 'sold' ? { scale: 1.2 } : {}}
                      whileTap={seat.status !== 'sold' ? { scale: 0.95 } : {}}
                      onClick={() => toggleSeat(seat)}
                      disabled={seat.status === 'sold'}
                      className={`w-6 h-6 rounded text-xs font-bold transition-all ${
                        seat.status === 'sold'
                          ? 'bg-gray-600 text-gray-800 cursor-not-allowed'
                          : seat.status === 'selected'
                            ? 'bg-neon-pink text-white scale-110'
                            : 'bg-neon-cyan hover:bg-neon-yellow text-black'
                      }`}
                    >
                      {seat.seatNumber}
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="flex gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-neon-cyan rounded" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-neon-pink rounded" />
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-600 rounded" />
          <span>Sold</span>
        </div>
      </div>
    </div>
  )
}

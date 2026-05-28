'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Seat, TicketTier } from '../../types'
import { useSeatMap } from '../../hooks/useSeatMap'
import { LoadingSkeleton } from '../common/LoadingSkeleton'
import { Toast } from '../common/Toast'
import venuesData from '../../data/venues.json'

interface SeatMapProps {
  venueId: string
  tier: TicketTier
  difficulty: string
  maxSeats: number
  onSeatsSelected: (seats: Seat[]) => void
}

export function SeatMap({ venueId, tier, difficulty, maxSeats, onSeatsSelected }: SeatMapProps) {
  const { seats, loading } = useSeatMap(venueId, tier, difficulty)
  const [selectedSeatIds, setSelectedSeatIds] = useState<Set<string>>(new Set())
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const venue = venuesData[venueId as keyof typeof venuesData]
  const section = venue?.sections.find((s) => s.tier === tier)

  const selectedCount = selectedSeatIds.size

  const toggleSeat = (seat: Seat) => {
    if (seat.status === 'sold') return

    setSelectedSeatIds((previous) => {
      const next = new Set(previous)

      if (next.has(seat.id)) {
        next.delete(seat.id)
        return next
      }

      if (previous.size >= maxSeats) {
        setToastMessage(`You can only select up to ${maxSeats} tickets.`)
        return previous
      }

      next.add(seat.id)
      return next
    })
  }

  useEffect(() => {
    const selectedSeats = seats.filter((seat) => selectedSeatIds.has(seat.id))
    onSeatsSelected(selectedSeats)
  }, [selectedSeatIds, seats, onSeatsSelected])

  useEffect(() => {
    if (!seats.length) return

    setSelectedSeatIds((previous) => {
      const next = new Set(
        [...previous].filter((id) => seats.some((seat) => seat.id === id && seat.status !== 'sold')),
      )

      if (next.size === previous.size && [...next].every((id) => previous.has(id))) {
        return previous
      }

      return next
    })
  }, [seats])

  if (loading) {
    return (
      <div className="space-y-4">
        <LoadingSkeleton count={5} />
      </div>
    )
  }

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
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h3 className="text-xl font-bold text-neon-cyan">{section?.name || 'Seats'}</h3>
        <span className="text-sm text-gray-400">
          Selected: {selectedCount}/{maxSeats}
        </span>
      </div>

      <div className="p-4 bg-[#0a0a0f] rounded-lg overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="text-center text-sm text-gray-400 mb-4 font-bold">🎭 STAGE 🎭</div>
          {(Object.entries(groupedByRow) as [string, Seat[]][]) .sort().map(([row, rowSeats]) => (
            <div key={row} className="flex items-center gap-2 mb-2">
              <span className="w-6 text-right text-xs text-gray-500">{row}</span>
              <div className="flex gap-1 flex-wrap">
                {rowSeats.map((seat: Seat) => {
                  const isSelected = selectedSeatIds.has(seat.id)
                  const isSold = seat.status === 'sold'
                  return (
                    <motion.button
                      key={seat.id}
                      whileHover={!isSold ? { scale: 1.12 } : {}}
                      whileTap={!isSold ? { scale: 0.95 } : {}}
                      onClick={() => toggleSeat(seat)}
                      disabled={isSold}
                      className={`w-7 h-7 rounded text-[11px] font-semibold transition-all ${
                        isSold
                          ? 'bg-gray-600 text-gray-800 cursor-not-allowed'
                          : isSelected
                            ? 'bg-neon-pink text-white shadow-[0_0_15px_rgba(255,0,150,0.35)]'
                            : 'bg-neon-cyan hover:bg-neon-yellow text-black'
                      }`}
                    >
                      {seat.seatNumber}
                    </motion.button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 text-sm">
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
          <span>Unavailable / Taken</span>
        </div>
      </div>

      {toastMessage && (
        <Toast message={toastMessage} type="warning" onClose={() => setToastMessage(null)} duration={2500} />
      )}
    </div>
  )
}

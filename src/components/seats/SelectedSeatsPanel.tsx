'use client'

import { motion } from 'framer-motion'
import { Seat, TicketTier } from '@/types'
import { formatPrice } from '@/lib/utils'

interface SelectedSeatsPanelProps {
  seats: Seat[]
  tier: TicketTier
  tierPrice: number
}

export function SelectedSeatsPanel({ seats, tier, tierPrice }: SelectedSeatsPanelProps) {
  const totalPrice = seats.length * tierPrice

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-6 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border-2 border-[#FF006E] rounded-lg sticky top-6"
    >
      <h3 className="text-xl font-bold text-neon-pink mb-4">Selected Seats</h3>

      {seats.length === 0 ? (
        <p className="text-gray-400 text-sm">No seats selected</p>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {seats.map((seat) => (
              <motion.div
                key={seat.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-2 bg-[#0a0a0f]/50 rounded flex justify-between items-center text-sm"
              >
                <span className="text-neon-cyan">
                  {seat.section.toUpperCase()} - Row {seat.row} Seat {seat.seatNumber}
                </span>
                <span className="text-neon-yellow">{formatPrice(tierPrice)}</span>
              </motion.div>
            ))}
          </div>

          <div className="border-t border-[#FF006E]/50 pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-300">Subtotal:</span>
              <span className="text-neon-cyan">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-300">Processing Fee:</span>
              <span className="text-neon-cyan">{formatPrice(Math.round(totalPrice * 0.05))}</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span className="text-neon-pink">Total:</span>
              <span className="text-neon-yellow">
                {formatPrice(totalPrice + Math.round(totalPrice * 0.05))}
              </span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}

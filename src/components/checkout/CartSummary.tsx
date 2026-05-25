'use client'

import { motion } from 'framer-motion'
import { Seat, TicketTier } from '../../types'
import { formatPrice } from '../../lib/utils'

interface CartSummaryProps {
  seats: Seat[]
  tier: TicketTier
  tierPrice: number
}

export function CartSummary({ seats, tier, tierPrice }: CartSummaryProps) {
  const subtotal = seats.length * tierPrice
  const fee = Math.round(subtotal * 0.05)
  const total = subtotal + fee

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border-2 border-[#00D9FF] rounded-lg"
    >
      <h2 className="text-2xl font-bold text-neon-cyan mb-6">Order Summary</h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-300">Ticket Type:</span>
          <span className="text-neon-pink font-bold">{tier.toUpperCase()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">Quantity:</span>
          <span className="text-neon-cyan">{seats.length} tickets</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">Price per ticket:</span>
          <span className="text-neon-yellow">{formatPrice(tierPrice)}</span>
        </div>
      </div>

      <div className="border-t border-[#FF006E]/50 pt-4 space-y-3">
        <div className="flex justify-between text-lg">
          <span>Subtotal:</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-lg">
          <span>Processing Fee (5%):</span>
          <span className="text-neon-yellow">{formatPrice(fee)}</span>
        </div>
        <div className="flex justify-between text-2xl font-bold text-neon-pink">
          <span>Total:</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      <div className="mt-6 p-3 bg-yellow-900/20 border border-yellow-600 rounded text-yellow-300 text-sm">
        ⚠️ This is a simulated transaction. No real charges will be made.
      </div>
    </motion.div>
  )
}

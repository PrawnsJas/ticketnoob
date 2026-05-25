'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { PaymentMethods } from '../../../../components/checkout/PaymentMethods'
import { OTPModal } from '../../../../components/checkout/OTPModal'
import { useEventStore } from '../../../../stores/eventStore'

type CartSummaryProps = {
  seats: { section: string; row: string; seatNumber: number }[]
  tier: string
  tierPrice: number
}

function CartSummary({ seats, tier, tierPrice }: CartSummaryProps) {
  return (
    <section className="bg-slate-900 rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
      <p className="text-gray-300 mb-4">
        {tier} tier • {seats.length} seat{seats.length === 1 ? '' : 's'}
      </p>
      <div className="space-y-3">
        {seats.map((seat) => (
          <div key={`${seat.section}-${seat.row}-${seat.seatNumber}`} className="flex justify-between">
            <span className="text-sm text-gray-200">
              {seat.section.toUpperCase()}-{seat.row}{seat.seatNumber}
            </span>
            <span className="text-sm text-gray-200">${tierPrice.toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 border-t border-slate-700 pt-4 flex justify-between text-lg font-semibold">
        <span>Total</span>
        <span>${(seats.length * tierPrice).toFixed(2)}</span>
      </div>
    </section>
  )
}
import { useCartStore } from '../../../../stores/cartStore'
import { useCheckoutStore } from '../../../../stores/checkoutStore'
import { useQueueStore } from '../../../../stores/queueStore'
import { generateOrderNumber } from '../../../../lib/utils'
import eventsData from '../../../../data/events.json'

export default function CheckoutPage() {
  const params = useParams()
  const eventId = params.eventId as string
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null)
  const [showOTP, setShowOTP] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const { selectedTier } = useEventStore()
  const { items, getTotalPrice } = useCartStore()
  const { setOrder, setCheckoutStartTime } = useCheckoutStore()
  const { position, startTime } = useQueueStore()

  const event = eventsData.find((e) => e.id === eventId)
  const tierInfo = event?.tiers.find((t) => t.id === selectedTier)

  useState(() => {
    setCheckoutStartTime(Date.now())
  })

  const handleOTPConfirm = async (otp: string) => {
    setShowOTP(false)
    setIsProcessing(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const orderNumber = generateOrderNumber()
    const totalPrice = getTotalPrice()
    const queueWaitTime = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0

    setOrder({
      orderNumber,
      eventId,
      tier: selectedTier!,
      seats: items.map((i) => `${i.section.toUpperCase()}-${i.row}${i.seatNumber}`),
      totalPrice,
      paymentMethod: paymentMethod || 'unknown',
      timestamp: Date.now(),
      queueWaitTime,
      seatSelectionTime: 0,
      checkoutTime: 0,
    })

    router.push('/success')
  }

  if (!event || !selectedTier || !tierInfo) return <div className="text-center py-12">Loading...</div>

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <h1 className="text-4xl font-bold mb-2 text-neon-pink">Checkout</h1>
        <p className="text-gray-300">Complete your ticket purchase</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <PaymentMethods selected={paymentMethod} onSelect={setPaymentMethod} />

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setShowOTP(true)}
            disabled={!paymentMethod || isProcessing}
            className="w-full btn-primary py-3 text-lg disabled:opacity-50"
          >
            {isProcessing ? '⏳ Processing...' : 'Proceed to Payment →'}
          </motion.button>
        </div>

        <div>
          <CartSummary seats={items} tier={selectedTier} tierPrice={tierInfo.price} />
        </div>
      </div>

      <OTPModal isOpen={showOTP} onConfirm={handleOTPConfirm} onClose={() => setShowOTP(false)} />
    </div>
  )
}

'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { PaymentMethods } from '../../../../components/checkout/PaymentMethods'
import { OTPModal } from '../../../../components/checkout/OTPModal'
import { useEventStore } from '../../../../stores/eventStore'
import { useCartStore } from '../../../../stores/cartStore'
import { useCheckoutStore } from '../../../../stores/checkoutStore'
import { useQueueStore } from '../../../../stores/queueStore'
import { generateOrderNumber } from '../../../../lib/utils'
import eventsData from '../../../../data/events.json'

type CartSummaryProps = {
  seats: { section: string; row: string; seatNumber: number; price: number }[]
  tier: string
}

function CartSummary({ seats, tier }: CartSummaryProps) {
  const subtotal = seats.reduce((sum, seat) => sum + seat.price, 0)
  const fee = Math.round(subtotal * 0.05)
  const total = subtotal + fee

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
            <span className="text-sm text-gray-200">${seat.price.toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 border-t border-slate-700 pt-4 space-y-3 text-sm text-gray-300">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Processing Fee</span>
          <span>${fee.toFixed(2)}</span>
        </div>
      </div>
      <div className="mt-4 border-t border-slate-700 pt-4 flex justify-between text-lg font-semibold text-white">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </section>
  )
}

export default function CheckoutPage() {
  const params = useParams()
  const eventId = params.eventId as string
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null)
  const [showOTP, setShowOTP] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isPaymentLocked, setIsPaymentLocked] = useState(false)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { selectedTier } = useEventStore()
  const { items, reset, getTotalPrice } = useCartStore()
  const { setOrder, setCheckoutStartTime } = useCheckoutStore()
  const { startTime } = useQueueStore()

  const event = eventsData.find((e) => e.id === eventId)
  const tierInfo = event?.tiers.find((t) => t.id === selectedTier)

  useEffect(() => {
    setCheckoutStartTime(Date.now())
  }, [setCheckoutStartTime])

  useEffect(() => {
    if (!items.length) return
    setErrors((current) => ({ ...current }))
  }, [items])

  const validation = useMemo(() => {
    const cleanPhone = phone.replace(/\D/g, '')
    const cleanCard = cardNumber.replace(/\D/g, '')

    return {
      fullName: fullName.trim().length >= 2 ? '' : 'Enter your full name',
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Enter a valid email address',
      phone: /^\d{7,15}$/.test(cleanPhone) ? '' : 'Enter a valid phone number',
      paymentMethod: paymentMethod ? '' : 'Select a payment method',
      cardNumber: /^\d{16}$/.test(cleanCard) ? '' : 'Enter a 16-digit card number',
      expiry: /^(0[1-9]|1[0-2])\/(\d{2})$/.test(expiry) ? '' : 'Enter expiry as MM/YY',
      cvv: /^\d{3,4}$/.test(cvv) ? '' : 'Enter a valid CVV',
    }
  }, [fullName, email, phone, paymentMethod, cardNumber, expiry, cvv])

  const formIsValid = useMemo(
    () => Object.values(validation).every((message) => message === '') && items.length > 0,
    [validation, items.length],
  )

  const validateFields = () => {
    const nextErrors: Record<string, string> = {}

    Object.entries(validation).forEach(([key, message]) => {
      if (message) nextErrors[key] = message
    })

    if (!items.length) {
      nextErrors.cart = 'Your selection is empty. Return to the seat page to choose tickets.'
    }

    setErrors(nextErrors)
    return nextErrors
  }

  const handleProceedToPayment = () => {
    if (isProcessing || isPaymentLocked) return

    setIsPaymentLocked(true)
    window.setTimeout(() => setIsPaymentLocked(false), 800)

    if (!formIsValid) {
      validateFields()
      return
    }

    setShowOTP(true)
  }

  const handleOTPConfirm = async () => {
    setShowOTP(false)
    setIsProcessing(true)

    await new Promise((resolve) => setTimeout(resolve, 1800))

    const orderNumber = generateOrderNumber()
    const totalPrice = getTotalPrice()
    const queueWaitTime = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0
    const seatSelectionTime = 0
    const checkoutTime = 0

    setOrder({
      orderNumber,
      eventId,
      tier: selectedTier!,
      seats: items.map((i) => `${i.section.toUpperCase()}-${i.row}${i.seatNumber}`),
      totalPrice,
      paymentMethod: paymentMethod || 'unknown',
      timestamp: Date.now(),
      queueWaitTime,
      seatSelectionTime,
      checkoutTime,
    })

    reset()
    router.push('/success')
  }

  if (!event || !selectedTier || !tierInfo) {
    return <div className="text-center py-12">Loading...</div>
  }

  if (!items.length) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4 text-neon-pink">No tickets in your cart</h1>
        <p className="text-gray-300 mb-8">Return to seat selection to choose your tickets before checking out.</p>
        <button
          type="button"
          onClick={() => router.push(`/events/${eventId}/seats`)}
          className="btn-primary px-6 py-3"
        >
          Back to Seats
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <h1 className="text-4xl font-bold mb-2 text-neon-pink">Checkout</h1>
        <p className="text-gray-300">Complete your ticket purchase securely.</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="grid gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border-2 border-[#B500D9] rounded-lg"
            >
              <h2 className="text-2xl font-bold text-neon-purple mb-6">Billing Information</h2>

              <div className="grid gap-4">
                <motion.div
                  animate={errors.fullName ? { x: [0, -3, 3, -3, 0] } : {}}
                  transition={{ duration: 0.25 }}
                >
                  <label className="block text-sm text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg bg-[#0a0a0f] border ${
                      errors.fullName ? 'border-red-500' : 'border-[#00D9FF]'
                    } text-white`}
                    placeholder="Jane Doe"
                  />
                  {errors.fullName && <p className="text-xs text-red-400 mt-1">{errors.fullName}</p>}
                </motion.div>

                <motion.div
                  animate={errors.email ? { x: [0, -3, 3, -3, 0] } : {}}
                  transition={{ duration: 0.25 }}
                >
                  <label className="block text-sm text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg bg-[#0a0a0f] border ${
                      errors.email ? 'border-red-500' : 'border-[#00D9FF]'
                    } text-white`}
                    placeholder="jane.doe@example.com"
                  />
                  {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                </motion.div>

                <motion.div
                  animate={errors.phone ? { x: [0, -3, 3, -3, 0] } : {}}
                  transition={{ duration: 0.25 }}
                >
                  <label className="block text-sm text-gray-300 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg bg-[#0a0a0f] border ${
                      errors.phone ? 'border-red-500' : 'border-[#00D9FF]'
                    } text-white`}
                    placeholder="09171234567"
                  />
                  {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                </motion.div>
              </div>
            </motion.div>

            <PaymentMethods selected={paymentMethod} onSelect={setPaymentMethod} />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border-2 border-[#B500D9] rounded-lg"
            >
              <h2 className="text-2xl font-bold text-neon-purple mb-6">Payment Details</h2>
              <div className="grid gap-4">
                <motion.div
                  animate={errors.cardNumber ? { x: [0, -3, 3, -3, 0] } : {}}
                  transition={{ duration: 0.25 }}
                >
                  <label className="block text-sm text-gray-300 mb-2">Card Number</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value.replace(/[^\d]/g, '').slice(0, 16))}
                    className={`w-full px-4 py-3 rounded-lg bg-[#0a0a0f] border ${
                      errors.cardNumber ? 'border-red-500' : 'border-[#00D9FF]'
                    } text-white`}
                    placeholder="1234 5678 9012 3456"
                  />
                  {errors.cardNumber && <p className="text-xs text-red-400 mt-1">{errors.cardNumber}</p>}
                </motion.div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <motion.div
                    animate={errors.expiry ? { x: [0, -3, 3, -3, 0] } : {}}
                    transition={{ duration: 0.25 }}
                  >
                    <label className="block text-sm text-gray-300 mb-2">Expiration</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={5}
                      value={expiry}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/[^\d]/g, '').slice(0, 4)
                        if (raw.length >= 3) {
                          setExpiry(`${raw.slice(0, 2)}/${raw.slice(2)}`)
                        } else {
                          setExpiry(raw)
                        }
                      }}
                      className={`w-full px-4 py-3 rounded-lg bg-[#0a0a0f] border ${
                        errors.expiry ? 'border-red-500' : 'border-[#00D9FF]'
                      } text-white`}
                      placeholder="MM/YY"
                    />
                    {errors.expiry && <p className="text-xs text-red-400 mt-1">{errors.expiry}</p>}
                  </motion.div>

                  <motion.div
                    animate={errors.cvv ? { x: [0, -3, 3, -3, 0] } : {}}
                    transition={{ duration: 0.25 }}
                  >
                    <label className="block text-sm text-gray-300 mb-2">CVV</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={4}
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/[^\d]/g, '').slice(0, 4))}
                      className={`w-full px-4 py-3 rounded-lg bg-[#0a0a0f] border ${
                        errors.cvv ? 'border-red-500' : 'border-[#00D9FF]'
                      } text-white`}
                      placeholder="123"
                    />
                    {errors.cvv && <p className="text-xs text-red-400 mt-1">{errors.cvv}</p>}
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {errors.cart && (
              <div className="rounded-lg border border-red-500 bg-[#330000] p-4 text-sm text-red-200">
                {errors.cart}
              </div>
            )}

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleProceedToPayment}
              disabled={!formIsValid || isProcessing}
              className="w-full btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? '⏳ Processing...' : 'Proceed to Payment →'}
            </motion.button>
          </div>
        </div>

        <div>
          <CartSummary seats={items} tier={selectedTier} />
        </div>
      </div>

      <OTPModal isOpen={showOTP} onConfirm={handleOTPConfirm} onClose={() => setShowOTP(false)} />
    </div>
  )
}

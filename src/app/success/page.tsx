'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { StatisticsPanel } from '@/components/training/StatisticsPanel'
import { useCheckoutStore } from '@/stores/checkoutStore'
import { useEventStore } from '@/stores/eventStore'
import { useQueueStore } from '@/stores/queueStore'
import { useCartStore } from '@/stores/cartStore'
import { useTrainingStore } from '@/stores/trainingStore'
import { generateTicketHTML } from '@/lib/pdfGenerator'
import eventsData from '@/data/events.json'

export default function SuccessPage() {
  const router = useRouter()
  const { order } = useCheckoutStore()
  const { selectedEvent } = useEventStore()
  const { position, startTime } = useQueueStore()
  const { cartStore: cart } = useCartStore()
  const { reset: resetAll } = useTrainingStore()
  const [confetti, setConfetti] = useState<any[]>([])

  useEffect(() => {
    if (!order) {
      router.push('/')
      return
    }

    const particles: any[] = []
    for (let i = 0; i < 50; i++) {
      particles.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 1,
        color: ['#FF006E', '#B500D9', '#00D9FF', '#FFD60A'][Math.floor(Math.random() * 4)],
      })
    }
    setConfetti(particles)
  }, [order, router])

  const handleDownloadTicket = () => {
    if (!order || !selectedEvent) return
    const html = generateTicketHTML({
      orderNumber: order.orderNumber,
      artist: selectedEvent.artist,
      date: selectedEvent.date,
      venue: selectedEvent.venue,
      seats: order.seats,
      totalPrice: order.totalPrice,
    })
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ticket-${order.orderNumber}.html`
    a.click()
  }

  const handlePlayAgain = () => {
    resetAll()
    router.push('/training-modes')
  }

  if (!order || !selectedEvent) return <div className="text-center py-12">Loading...</div>

  return (
    <div className="relative min-h-screen overflow-hidden">
      {confetti.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 1, y: 0, x: 0 }}
          animate={{ opacity: 0, y: '100vh', x: Math.sin(particle.id) * 100 }}
          transition={{ duration: particle.duration, delay: particle.delay }}
          className="absolute w-2 h-2 rounded-full pointer-events-none"
          style={{ left: `${particle.left}%`, backgroundColor: particle.color, top: 0 }}
        />
      ))}

      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5, repeat: 3 }}
            className="text-8xl mb-6"
          >
            🎉
          </motion.div>
          <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-[#FF006E] to-[#00D9FF] bg-clip-text text-transparent">
            Success!
          </h1>
          <p className="text-2xl text-neon-cyan mb-2">Your tickets have been secured</p>
          <p className="text-gray-300 text-lg">Order #{order.orderNumber}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="p-8 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border-2 border-[#00D9FF] rounded-lg"
          >
            <h2 className="text-2xl font-bold text-neon-cyan mb-6">Your Tickets</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm">Event</p>
                <p className="text-xl text-neon-pink font-bold">{selectedEvent.artist}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Venue</p>
                <p className="text-lg text-neon-cyan">{selectedEvent.venue}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Date</p>
                <p className="text-lg text-neon-yellow">{selectedEvent.date}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Seats</p>
                <p className="text-lg text-neon-purple font-mono">{order.seats.join(', ')}</p>
              </div>
              <div className="pt-4 border-t border-[#FF006E]/50">
                <p className="text-gray-400 text-sm">Total</p>
                <p className="text-3xl text-neon-yellow font-bold">₱{order.totalPrice.toLocaleString()}</p>
              </div>
            </div>

            <button
              onClick={handleDownloadTicket}
              className="w-full btn-primary mt-8"
            >
              📥 Download Ticket
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <StatisticsPanel
              stats={{
                queueWaitTime: order.queueWaitTime,
                seatSelectionTime: Math.random() * 180 + 30,
                checkoutTime: Math.random() * 60 + 15,
                totalTime: order.queueWaitTime + Math.random() * 180 + 30 + Math.random() * 60 + 15,
                ticketsPurchased: order.seats.length,
                ordersCompleted: 1,
                highestQueuePosition: position?.position || 0,
              }}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <button onClick={handlePlayAgain} className="btn-primary text-lg px-8 py-3">
            🔄 Train Again
          </button>
          <Link href="/" className="btn-secondary text-lg px-8 py-3">
            Back to Home
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 p-6 bg-gradient-to-br from-purple-900 to-blue-900 border-2 border-purple-500 rounded-lg text-center"
        >
          <p className="text-purple-300 mb-2">⚠️ Training Simulation Complete</p>
          <p className="text-sm text-purple-200">
            You've successfully completed this training simulator. Good luck with your real ticket purchases!
          </p>
        </motion.div>
      </div>
    </div>
  )
}

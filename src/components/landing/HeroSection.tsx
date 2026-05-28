'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <h1 className="text-6xl md:text-7xl font-black mb-4 bg-gradient-to-r from-[#FF006E] via-[#B500D9] to-[#00D9FF] bg-clip-text text-transparent">
            TicketNoob
          </h1>
          <p className="text-2xl text-neon-cyan">
            Master the art of high-pressure ticket buying
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg text-gray-300 mb-8 leading-relaxed"
        >
          Experience the rush of concert ticket sales. Practice queue management, battle the clock,
          and perfect your checkout speed before the real ticket sales begin.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <Link href="/training-modes" className="btn-primary">
            Start Training 🚀
          </Link>
          <Link href="/events" className="btn-secondary">
            Browse Events 🎫
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          {[
            { icon: '⏱️', title: 'Queue Simulator', desc: 'Experience realistic queue dynamics' },
            { icon: '🎯', title: 'Seat Selection', desc: 'Beat the clock and secure your seats' },
            { icon: '💪', title: 'Difficulty Modes', desc: 'From casual to BTS-level chaos' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="p-6 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-[#FF006E]/50 rounded-lg"
            >
              <div className="text-4xl mb-2">{feature.icon}</div>
              <h3 className="font-bold text-neon-cyan">{feature.title}</h3>
              <p className="text-sm text-gray-400 mt-2">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

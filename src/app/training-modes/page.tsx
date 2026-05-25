'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { DifficultySelector } from '@/components/training/DifficultySelector'
import { DifficultyMode } from '@/types'
import { useTrainingStore } from '@/stores/trainingStore'

export default function TrainingModesPage() {
  const [selected, setSelected] = useState<DifficultyMode | null>(null)
  const router = useRouter()
  const { setDifficulty } = useTrainingStore()

  const handleStart = () => {
    if (selected) {
      setDifficulty(selected)
      router.push('/events')
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#FF006E] to-[#B500D9] bg-clip-text text-transparent">
          Training Modes
        </h1>
        <p className="text-gray-300 text-lg">
          Choose your difficulty level. Prepare your skills before the real ticket rush!
        </p>
      </motion.div>

      <DifficultySelector selected={selected} onSelect={setSelected} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-12 text-center"
      >
        <button onClick={handleStart} disabled={!selected} className="btn-primary text-lg px-8 py-3 disabled:opacity-50">
          Start Training 🚀
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 grid md:grid-cols-3 gap-6"
      >
        {[
          {
            icon: '💡',
            title: 'Learn the Flow',
            desc: 'Understand each step of the ticket buying process',
          },
          {
            icon: '⚡',
            title: 'Build Speed',
            desc: 'Practice quick decision-making under pressure',
          },
          {
            icon: '🎯',
            title: 'Master Timing',
            desc: 'Perfect your checkout speed and seat selection',
          },
        ].map((tip, i) => (
          <div key={i} className="p-6 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-[#FF006E]/50 rounded-lg">
            <div className="text-4xl mb-3">{tip.icon}</div>
            <h3 className="font-bold text-neon-cyan mb-2">{tip.title}</h3>
            <p className="text-sm text-gray-400">{tip.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

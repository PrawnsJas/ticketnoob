'use client'

import { motion } from 'framer-motion'
import { TrainingStats } from '../../types'
import { formatTime } from '../../lib/utils'

interface StatisticsPanelProps {
  stats: TrainingStats
}

export function StatisticsPanel({ stats }: StatisticsPanelProps) {
  const stats_data = [
    { label: 'Queue Wait Time', value: formatTime(stats.queueWaitTime), color: 'text-neon-cyan' },
    { label: 'Seat Selection Time', value: formatTime(stats.seatSelectionTime), color: 'text-neon-purple' },
    { label: 'Checkout Time', value: formatTime(stats.checkoutTime), color: 'text-neon-yellow' },
    { label: 'Total Time', value: formatTime(stats.totalTime), color: 'text-neon-pink' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border-2 border-[#00D9FF] rounded-lg"
    >
      <h2 className="text-2xl font-bold text-neon-cyan mb-6">Training Statistics</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {stats_data.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 bg-[#0a0a0f]/50 rounded border border-[#FF006E]/30"
          >
            <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div className="p-4 bg-[#0a0a0f]/50 rounded border border-[#FFD60A]/30">
          <p className="text-xs text-gray-400 mb-1">Tickets Purchased</p>
          <p className="text-2xl font-bold text-neon-yellow">{stats.ticketsPurchased}</p>
        </div>
        <div className="p-4 bg-[#0a0a0f]/50 rounded border border-[#00FF00]/30">
          <p className="text-xs text-gray-400 mb-1">Orders Completed</p>
          <p className="text-2xl font-bold text-neon-lime">{stats.ordersCompleted}</p>
        </div>
      </div>
    </motion.div>
  )
}

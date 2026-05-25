'use client'

import { motion } from 'framer-motion'

export function NetworkChecker() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border-2 border-[#00D9FF] rounded-lg p-6 mb-6"
    >
      <div className="text-center mb-6">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-5xl mb-4"
        >
          🔌
        </motion.div>
        <p className="text-lg font-bold text-neon-cyan">Checking Browser & Network...</p>
      </div>

      <div className="space-y-3">
        {[
          { label: 'Browser Compatibility', status: 'ok' },
          { label: 'Network Speed', status: 'checking' },
          { label: 'Security Verification', status: 'ok' },
        ].map((check, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center justify-between p-3 bg-[#0a0a0f]/50 rounded"
          >
            <span className="text-gray-300">{check.label}</span>
            {check.status === 'ok' ? (
              <span className="text-neon-lime">✓</span>
            ) : (
              <motion.span animate={{ opacity: [0.5, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                ⋯
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

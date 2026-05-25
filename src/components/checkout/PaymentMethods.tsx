'use client'

import { motion } from 'framer-motion'

const PAYMENT_METHODS = [
  { id: 'visa', name: 'Visa Card', icon: '💳', color: 'from-blue-600 to-blue-800' },
  { id: 'mastercard', name: 'Mastercard', icon: '💳', color: 'from-red-600 to-orange-700' },
  { id: 'gcash', name: 'GCash', icon: '📱', color: 'from-blue-400 to-cyan-500' },
  { id: 'maya', name: 'Maya', icon: '📱', color: 'from-purple-600 to-pink-600' },
]

interface PaymentMethodsProps {
  selected: string | null
  onSelect: (method: string) => void
}

export function PaymentMethods({ selected, onSelect }: PaymentMethodsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border-2 border-[#B500D9] rounded-lg"
    >
      <h2 className="text-2xl font-bold text-neon-purple mb-6">Payment Method</h2>

      <div className="grid grid-cols-2 gap-4">
        {PAYMENT_METHODS.map((method) => (
          <motion.button
            key={method.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(method.id)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selected === method.id
                ? `border-neon-pink bg-gradient-to-r ${method.color} shadow-lg`
                : 'border-gray-600 bg-[#0a0a0f] hover:border-neon-cyan'
            }`}
          >
            <div className="text-2xl mb-2">{method.icon}</div>
            <div className="text-sm font-bold">{method.name}</div>
          </motion.button>
        ))}
      </div>

      {selected && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Cardholder Name"
            className="w-full px-4 py-2 bg-[#0a0a0f] border border-[#00D9FF] rounded text-white"
          />
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="MM/YY" className="px-4 py-2 bg-[#0a0a0f] border border-[#00D9FF] rounded text-white" />
            <input type="text" placeholder="CVV" className="px-4 py-2 bg-[#0a0a0f] border border-[#00D9FF] rounded text-white" />
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

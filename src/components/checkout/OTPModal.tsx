'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Modal } from '@/components/common/Modal'

interface OTPModalProps {
  isOpen: boolean
  onConfirm: (otp: string) => void
}

export function OTPModal({ isOpen, onConfirm }: OTPModalProps) {
  const [otp, setOtp] = useState('')
  const [fakeOtp] = useState(Math.random().toString().slice(2, 8))

  const handleConfirm = () => {
    if (otp.length === 6) {
      onConfirm(otp)
      setOtp('')
    }
  }

  return (
    <Modal isOpen={isOpen} title="OTP Verification" size="md">
      <div className="space-y-4">
        <p className="text-gray-300 text-center">Enter the OTP sent to your registered mobile number</p>

        <div className="text-center mb-4">
          <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity }} className="text-3xl font-mono font-bold text-neon-yellow">
            {fakeOtp}
          </motion.div>
          <p className="text-xs text-gray-400 mt-2">(Simulated OTP)</p>
        </div>

        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
          placeholder="000000"
          className="w-full px-4 py-3 bg-[#0a0a0f] border-2 border-[#00D9FF] rounded text-center text-3xl font-mono text-white tracking-widest"
        />

        <button
          onClick={handleConfirm}
          disabled={otp.length !== 6}
          className="w-full btn-primary disabled:opacity-50"
        >
          Confirm
        </button>

        <p className="text-xs text-gray-400 text-center">
          (Simulated OTP for training - enter the 6-digit code shown above)
        </p>
      </div>
    </Modal>
  )
}

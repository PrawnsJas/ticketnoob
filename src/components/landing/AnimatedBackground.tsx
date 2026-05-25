'use client'

import { motion } from 'framer-motion'

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
        }}
        className="absolute inset-0 bg-gradient-to-br from-[#FF006E] via-[#B500D9] to-[#00D9FF] opacity-10"
        style={{
          backgroundSize: '400% 400%',
        }}
      />
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#FF006E] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00D9FF] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-[#B500D9] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
    </div>
  )
}

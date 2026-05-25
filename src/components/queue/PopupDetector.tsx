'use client'

import { motion } from 'framer-motion'
import { usePopupDetector } from '@/hooks/usePopupDetector'
import { useState } from 'react'
import { Modal } from '@/components/common/Modal'

interface PopupDetectorProps {
  onPassed: () => void
}

export function PopupDetector({ onPassed }: PopupDetectorProps) {
  const { isBlocked, isChecking, checkPopup } = usePopupDetector()
  const [showBlockedWarning, setShowBlockedWarning] = useState(false)

  const handleCheck = () => {
    checkPopup()
    setTimeout(() => {
      if (isBlocked !== true) {
        onPassed()
      } else {
        setShowBlockedWarning(true)
      }
    }, 500)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="mb-6 p-6 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border-2 border-[#00D9FF] rounded-lg">
          <p className="text-lg mb-4">🔍 Popup Blocker Check</p>
          <p className="text-sm text-gray-300 mb-6">
            We need to verify that popups are allowed to proceed. This is a requirement for transaction security.
          </p>

          <button
            onClick={handleCheck}
            disabled={isChecking}
            className="btn-primary disabled:opacity-50"
          >
            {isChecking ? 'Checking...' : 'Allow Popups & Continue'}
          </button>
        </div>
      </motion.div>

      <Modal isOpen={showBlockedWarning} onClose={() => setShowBlockedWarning(false)} title="Popups Blocked">
        <div className="space-y-4">
          <p className="text-yellow-400">⚠️ Popup blocker is active. Please disable it to continue.</p>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
            <li>Click the popup blocker icon in your address bar</li>
            <li>Select "Always allow popups from this site"</li>
            <li>Refresh and try again</li>
          </ol>
          <button onClick={() => handleCheck()} className="btn-primary w-full mt-4">
            Try Again
          </button>
        </div>
      </Modal>
    </>
  )
}

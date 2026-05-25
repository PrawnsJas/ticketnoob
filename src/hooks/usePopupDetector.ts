import { useEffect, useState } from 'react'

export function usePopupDetector() {
  const [isBlocked, setIsBlocked] = useState<boolean | null>(null)
  const [isChecking, setIsChecking] = useState(false)

  const checkPopup = () => {
    setIsChecking(true)
    try {
      const popupWindow = window.open('', '', 'width=400,height=300')
      if (!popupWindow || popupWindow.closed || typeof popupWindow.closed === 'undefined') {
        setIsBlocked(true)
      } else {
        setIsBlocked(false)
        popupWindow.close()
      }
    } catch (e) {
      setIsBlocked(true)
    }
    setIsChecking(false)
  }

  return {
    isBlocked,
    isChecking,
    checkPopup,
  }
}

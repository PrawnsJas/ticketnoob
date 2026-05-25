import { useEffect, useState } from 'react'
import { Seat, TicketTier } from '../types'
import { generateSeatsForVenue, simulateSeatDisappearance } from '../lib/seatGenerator'

export function useSeatMap(venueId: string, tier: TicketTier, difficulty: string) {
  const [seats, setSeats] = useState<Seat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const generated = generateSeatsForVenue(venueId, tier)
    setSeats(generated)
    setLoading(false)
  }, [venueId, tier])

  useEffect(() => {
    if (seats.length === 0) return

    const disappearRates: Record<string, number> = {
      easy: 0.001,
      'sale-day': 0.01,
      'bts-chaos': 0.05,
    }
    const rate = disappearRates[difficulty] || 0.01

    const interval = setInterval(() => {
      setSeats((current) => simulateSeatDisappearance(current, rate))
    }, 2000)

    return () => clearInterval(interval)
  }, [seats.length, difficulty])

  return { seats, loading }
}

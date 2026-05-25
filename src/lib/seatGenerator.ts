import { Seat, TicketTier } from '../types'
import venuesData from '../data/venues.json'

export function generateSeatsForVenue(venueId: string, tier: TicketTier): Seat[] {
  const venue = venuesData[venueId as keyof typeof venuesData]
  if (!venue) return []

  const section = venue.sections.find((s) => s.tier === tier)
  if (!section) return []

  const seats: Seat[] = []
  const rowCount = Math.ceil(Math.sqrt(section.seats))

  for (let i = 0; i < section.seats; i++) {
    const row = String.fromCharCode(65 + Math.floor(i / rowCount))
    const seatNum = (i % rowCount) + 1
    const isAvailable = Math.random() > 0.3

    seats.push({
      id: `${section.id}-${row}-${seatNum}`,
      section: section.id,
      row,
      seatNumber: seatNum,
      status: isAvailable ? 'available' : 'sold',
      tier,
    })
  }

  return seats
}

export function simulateSeatDisappearance(
  seats: Seat[],
  disappearRate: number,
): Seat[] {
  return seats.map((seat) => {
    if (seat.status === 'available' && Math.random() < disappearRate) {
      return { ...seat, status: 'sold' }
    }
    return seat
  })
}

export function getRandomSeatForRemoval(seats: Seat[]): string | null {
  const availableSeats = seats.filter((s) => s.status === 'available')
  if (availableSeats.length === 0) return null
  return availableSeats[Math.floor(Math.random() * availableSeats.length)].id
}

export function getTierPrice(
  venueId: string,
  tier: TicketTier,
  eventPrices: Record<TicketTier, number>,
): number {
  return eventPrices[tier] || 0
}

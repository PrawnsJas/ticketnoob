'use client'

import { HeroSection } from '../components/landing/HeroSection'
import { AnimatedBackground } from '../components/landing/AnimatedBackground'
import { EventGrid } from '../components/landing/EventGrid'
import { useEffect, useState } from 'react'
import { Event } from '../types'
import eventsData from '../data/events.json'

export default function Home() {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    setEvents(eventsData as Event[])
  }, [])

  return (
    <div className="relative">
      <section className="relative min-h-screen overflow-hidden">
        <AnimatedBackground />
        <HeroSection />
      </section>

      <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-[#FF006E] to-[#00D9FF] bg-clip-text text-transparent">
            Upcoming Events
          </h2>
          <p className="text-gray-300 text-center mb-12">Choose your concert and begin your training</p>
          <EventGrid events={events} />
        </div>
      </section>
    </div>
  )
}

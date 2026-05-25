'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Event } from '../../types'
import { EventGrid } from '../../components/landing/EventGrid'
import eventsData from '../../data/events.json'

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [filterSoldOut, setFilterSoldOut] = useState(false)

  useEffect(() => {
    const filtered = (filterSoldOut ? eventsData.filter((e) => !e.currentSoldOut) : eventsData) as Event[]
    setEvents(filtered)
  }, [filterSoldOut])

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#FF006E] to-[#00D9FF] bg-clip-text text-transparent">
          Select Your Event
        </h1>
        <p className="text-gray-300 text-lg">Choose a concert and begin your ticket buying training</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8 flex items-center gap-4"
      >
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filterSoldOut}
            onChange={(e) => setFilterSoldOut(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-gray-300">Hide sold out events</span>
        </label>
      </motion.div>

      {events.length > 0 ? (
        <EventGrid events={events} />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border-2 border-[#FF006E] rounded-lg p-8"
        >
          <p className="text-2xl text-gray-300">No events available with current filters</p>
        </motion.div>
      )}
    </div>
  )
}

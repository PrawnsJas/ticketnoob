'use client'

import Link from 'next/link'

export function Header() {
  return (
    <header className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] border-b-2 border-[#FF006E] py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-neon-pink hover:text-neon-cyan transition-colors">
          🎫 TicketRush Trainer
        </Link>
        <nav className="flex gap-6">
          <Link href="/events" className="text-gray-300 hover:text-neon-cyan transition-colors">
            Events
          </Link>
          <Link href="/training-modes" className="text-gray-300 hover:text-neon-cyan transition-colors">
            Training
          </Link>
        </nav>
      </div>
    </header>
  )
}

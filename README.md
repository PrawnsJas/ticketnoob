# TicketRush Trainer 🎫

A realistic concert ticket buying simulator for training high-pressure purchasing flows. Practice queue management, seat selection, and checkout speed before real ticket sales.

## Features

### 🎪 Realistic Event Experience
- Multiple fictional K-pop inspired concert events
- Dynamic ticket availability counters
- Real-time seat depletion simulation
- Countdown timers to sale opening

### 📍 Queue System
- Randomized queue positions (1-5000+)
- Animated progress bar with estimated wait times
- Live statistics (fans ahead, tickets remaining)
- Random stress events for psychological pressure
- Queue pause/resume simulation

### 🎯 Seat Selection
- Interactive seat map with color-coded sections
- Real-time seat disappearing simulation
- Multiple ticket tiers (VIP, Lower Box, Upper Box, Gen Ad)
- 5-minute cart expiration timer

### 💳 Checkout Flow
- Mock payment methods (Visa, Mastercard, GCash, Maya)
- Realistic form validation
- OTP verification (simulated)
- Fake transaction processing

### 🏆 Training Modes
- **Easy**: Generous timers, no crashes
- **Sale Day**: Standard difficulty, occasional stress
- **BTS-Level Chaos**: Extreme difficulty, aggressive timeouts

### 📊 Statistics Tracking
- Queue wait time, seat selection speed, checkout time
- Total session time and performance metrics

## Tech Stack

- Next.js 15 (App Router) | TypeScript | TailwindCSS | Framer Motion
- Zustand | jsPDF | Vercel-ready

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` → Click "Start Training" → Select difficulty → Train!

## Project Structure

- `src/app/` - Next.js pages
- `src/components/` - React components
- `src/stores/` - Zustand state stores
- `src/hooks/` - Custom hooks
- `src/lib/` - Utilities and algorithms
- `src/data/` - Mock JSON data

## Usage Flow

1. Select difficulty mode
2. Choose event and ticket tier
3. Pass popup blocker check
4. Wait in simulated queue
5. Select seats (beat 5-min timer)
6. Checkout with fake payment
7. View stats and download ticket

## Important

⚠️ **This is a training simulator ONLY**
- All events and tickets are fictional
- No real transactions or data collection
- No connection to actual ticketing systems
- Educational purposes only

## Deployment (Vercel)

See `DEPLOYMENT.md` for detailed instructions.

---

Perfect for practicing ticket purchase flows before real sales!

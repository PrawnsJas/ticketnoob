export class SoundManager {
  private soundEnabled: boolean = true

  setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled
  }

  playPing() {
    if (!this.soundEnabled) return
    this.playBeep(800, 100)
  }

  playSuccess() {
    if (!this.soundEnabled) return
    this.playBeep(800, 150)
    setTimeout(() => this.playBeep(1000, 150), 200)
  }

  playAlert() {
    if (!this.soundEnabled) return
    this.playBeep(400, 200)
    setTimeout(() => this.playBeep(300, 200), 250)
  }

  playAmbient() {
    if (!this.soundEnabled) return
  }

  private playBeep(frequency: number, duration: number) {
    try {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = frequency
      oscillator.type = 'sine'

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + duration / 1000,
      )

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + duration / 1000)
    } catch (e) {
    }
  }
}

export const soundManager = new SoundManager()

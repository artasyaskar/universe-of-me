import { Howl } from 'howler';

// Define the available sound effects
export type SoundEffect = 'hover' | 'click' | 'send' | 'receive';

// Create a record to hold the Howl instances
const sounds: Record<SoundEffect, Howl> = {
  hover: new Howl({
    src: ['/audio/hover.mp3'],
    volume: 0.3,
  }),
  click: new Howl({
    src: ['/audio/click.mp3'],
    volume: 0.5,
  }),
  send: new Howl({
    src: ['/audio/send.mp3'],
    volume: 0.7,
  }),
  receive: new Howl({
    src: ['/audio/receive.mp3'],
    volume: 0.7,
  }),
};

// --- Sound Manager ---
class SoundManager {
  private isMuted: boolean = false;

  constructor() {
    // Optional: Load sounds initially
    this.loadAll();
  }

  // Play a sound effect
  play = (sound: SoundEffect) => {
    if (this.isMuted) return;

    const targetSound = sounds[sound];
    if (targetSound) {
      targetSound.play();
    }
  };

  // Toggle master mute
  toggleMute = () => {
    this.isMuted = !this.isMuted;
    Howler.mute(this.isMuted);
    return this.isMuted;
  };

  // Get mute state
  getMuteState = () => {
    return this.isMuted;
  };

  // Preload all sounds
  loadAll = () => {
    Object.values(sounds).forEach((sound) => sound.load());
  };
}

// Export a singleton instance of the SoundManager
const soundManager = new SoundManager();
export default soundManager;

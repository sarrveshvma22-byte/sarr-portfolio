// Web Audio API spatial synthesizer inspired by jehaduddin.vercel.app
class CosmicAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true;
    this.ambientDrone = null;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.initialized = true;
      }
    } catch (e) {
      console.warn("AudioContext unsupported", e);
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  toggleSound() {
    this.init();
    this.resume();
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopAmbient();
    } else {
      this.startAmbient();
      this.playChime();
    }
    return !this.isMuted;
  }

  playTick() {
    if (this.isMuted || !this.ctx) return;
    try {
      this.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = "sine";
      osc.frequency.setValueAtTime(640, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.05);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {}
  }

  playHover() {
    if (this.isMuted || !this.ctx) return;
    try {
      this.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = "sine";
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(740, now + 0.04);

      gain.gain.setValueAtTime(0.012, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch (e) {}
  }

  playChime() {
    if (this.isMuted || !this.ctx) return;
    try {
      this.resume();
      const freqs = [392.0, 493.88, 587.33, 783.99]; // G major 7th chord
      const now = this.ctx.currentTime;

      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const delay = idx * 0.04;

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + delay);

        gain.gain.setValueAtTime(0.02, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + delay);
        osc.stop(now + delay + 0.4);
      });
    } catch (e) {}
  }

  startAmbient() {
    if (this.isMuted || !this.ctx || this.ambientDrone) return;
    try {
      this.resume();
      const now = this.ctx.currentTime;

      // Sub-bass root (55Hz A1) + Fifth (82.4Hz E2) + slow LFO filter
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(55.0, now);

      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(82.4, now);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(140, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.018, now + 2.5);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);

      this.ambientDrone = { osc1, osc2, gain };
    } catch (e) {}
  }

  stopAmbient() {
    if (!this.ambientDrone || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      this.ambientDrone.gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
      setTimeout(() => {
        if (this.ambientDrone) {
          try {
            this.ambientDrone.osc1.stop();
            this.ambientDrone.osc2.stop();
          } catch (e) {}
          this.ambientDrone = null;
        }
      }, 550);
    } catch (e) {
      this.ambientDrone = null;
    }
  }
}

export const cosmicAudio = new CosmicAudioEngine();


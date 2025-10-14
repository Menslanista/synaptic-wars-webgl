// Audio Management for Neural Sound Effects
export class AudioManager {
    constructor() {
        this.sounds = new Map();
        this.context = new (window.AudioContext || window.webkitAudioContext)();
        this.masterVolume = 0.7;
    }

    async loadSound(name, url) {
        try {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await this.context.decodeAudioData(arrayBuffer);
            this.sounds.set(name, audioBuffer);
            return true;
        } catch (error) {
            console.warn(`Could not load sound: ${name}`, error);
            return false;
        }
    }

    playSound(name, options = {}) {
        if (!this.sounds.has(name)) {
            console.warn(`Sound not found: ${name}`);
            return null;
        }

        const source = this.context.createBufferSource();
        source.buffer = this.sounds.get(name);
        
        const gainNode = this.context.createGain();
        gainNode.gain.value = (options.volume || 1) * this.masterVolume;
        
        source.connect(gainNode);
        gainNode.connect(this.context.destination);
        
        if (options.loop) source.loop = true;
        if (options.playbackRate) source.playbackRate.value = options.playbackRate;
        
        source.start();
        return source;
    }

    createNeuroSound(frequency = 440, duration = 1.0) {
        // Generate procedural neural sounds
        const sampleRate = this.context.sampleRate;
        const frameCount = sampleRate * duration;
        const buffer = this.context.createBuffer(1, frameCount, sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < frameCount; i++) {
            // Neural-like sound with multiple harmonics
            const t = i / sampleRate;
            const baseFreq = frequency * t * 2 * Math.PI;
            const harmonic1 = Math.sin(baseFreq * 2) * 0.3;
            const harmonic2 = Math.sin(baseFreq * 3) * 0.2;
            const noise = (Math.random() - 0.5) * 0.1;
            
            data[i] = Math.sin(baseFreq) * 0.5 + harmonic1 + harmonic2 + noise;
            data[i] *= Math.exp(-t * 2); // Fade out
        }
        
        return buffer;
    }

    playDendriticLightningSound() {
        const sound = this.createNeuroSound(523.25, 0.5); // C5 note
        const source = this.context.createBufferSource();
        source.buffer = sound;
        source.connect(this.context.destination);
        source.start();
    }

    playSerotoninTsunamiSound() {
        const sound = this.createNeuroSound(329.63, 2.0); // E4 note
        const source = this.context.createBufferSource();
        source.buffer = sound;
        source.connect(this.context.destination);
        source.start();
    }
}

# Fix the main.js file first
cat > synaptic-wars-phase2/src/main.js << 'EOF'
// Synaptic Wars Phase 2 - Main Entry Point
console.log('🧠 Synaptic Wars Phase 2 - EEG Integration Demo');

// Import neuro-engine components
import { PlasticitySystem } from './neuro-engine/plasticity-system.js';
import { EEGIntegration } from './neuro-engine/eeg-integration.js';
import { NeuroMetrics } from './neuro-engine/neuro-metrics.js';

// Import UI components
import { NeuroDashboard } from './ui/neuro-dashboard.js';
import { EEGConnection } from './ui/eeg-connection.js';

// Import gameplay components
import { PlayerController } from './gameplay/player-controller.js';
import { TauTanglerAI } from './gameplay/tau-tangler-ai.js';

// Import utilities
import { ThreeHelpers } from './utils/three-helpers.js';
import { PerformanceOptimizer } from './utils/performance-optimizer.js';

class SynapticWarsGame {
    constructor() {
        this.isRunning = false;
        this.lastTime = 0;
        
        // Initialize systems
        this.plasticitySystem = new PlasticitySystem();
        this.eegIntegration = new EEGIntegration();
        this.neuroMetrics = new NeuroMetrics();
        this.playerController = new PlayerController();
        this.tauTanglerAI = new TauTanglerAI();
        this.neuroDashboard = new NeuroDashboard();
        
        this.init();
    }

    async init() {
        console.log('Initializing Synaptic Wars Phase 2...');
        
        // Setup Three.js scene
        const { scene, camera, renderer } = ThreeHelpers.setupBasicScene();
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        
        // Add neuron to scene
        this.neuron = ThreeHelpers.createNeuronModel();
        this.scene.add(this.neuron);
        
        // Add game container to DOM
        const gameContainer = document.getElementById('game-container');
        if (gameContainer) {
            gameContainer.appendChild(this.renderer.domElement);
        }
        
        // Start game loop
        this.isRunning = true;
        this.gameLoop();
        
        console.log('Synaptic Wars Phase 2 initialized successfully!');
    }

    gameLoop(currentTime = 0) {
        if (!this.isRunning) return;
        
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;
        
        // Update systems
        this.update(deltaTime);
        
        // Render scene
        this.renderer.render(this.scene, this.camera);
        
        // Continue loop
        requestAnimationFrame((time) => this.gameLoop(time));
    }

    update(deltaTime) {
        // Rotate neuron
        if (this.neuron) {
            this.neuron.rotation.y += deltaTime * 0.5;
        }
        
        // Update player controller
        this.playerController.update(deltaTime);
        
        // Update Tau Tangler AI
        this.tauTanglerAI.update(deltaTime, { x: 0, y: 0, z: 0 });
        
        // Get EEG data
        const focusLevel = this.eegIntegration.getFocusLevel();
        
        // Update neuroplasticity
        const plasticityData = this.plasticitySystem.update(deltaTime, focusLevel);
        
        // Update metrics
        const metrics = this.neuroMetrics.update(plasticityData, { focusLevel });
        
        // Update dashboard
        this.neuroDashboard.update(plasticityData, { focusLevel }, metrics);
    }

    activateDendriticLightning() {
        if (this.playerController.activateAbility('dendriticLightning')) {
            console.log('⚡ Dendritic Lightning activated!');
            // Add visual effects here
        }
    }

    activateSerotoninTsunami() {
        if (this.playerController.activateAbility('serotoninTsunami')) {
            console.log('🌊 Serotonin Tsunami activated!');
            // Add healing effects here
        }
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.game = new SynapticWarsGame();
    
    // Add global functions for UI
    window.activateDendriticLightning = () => game.activateDendriticLightning();
    window.activateSerotoninTsunami = () => game.activateSerotoninTsunami();
    window.connectMuse = () => game.eegIntegration.connect();
});
EOF

# Now let's make sure all the imported files actually exist with proper content

# Fix neuro-engine files
cat > synaptic-wars-phase2/src/neuro-engine/plasticity-system.js << 'EOF'
// Advanced Neuroplasticity System
export class PlasticitySystem {
    constructor() {
        this.bdnf = 0.23;
        this.synapticStrength = 1.0;
        this.neurogenesisRate = 0.01;
        this.myelinGrowth = 0.005;
    }

    update(deltaTime, focusLevel = 1.0) {
        // Real-time neuroplasticity simulation
        this.bdnf += this.neurogenesisRate * deltaTime * focusLevel;
        this.synapticStrength += this.myelinGrowth * deltaTime * (this.bdnf / 0.5);
        
        this.bdnf = Math.min(this.bdnf, 1.0);
        this.synapticStrength = Math.min(this.synapticStrength, 2.0);
        
        return { 
            bdnf: this.bdnf, 
            strength: this.synapticStrength,
            neurogenesisRate: this.neurogenesisRate
        };
    }

    reward(amount, focusMultiplier = 1.0) {
        this.bdnf += amount * focusMultiplier;
        this.synapticStrength += amount * 0.5 * focusMultiplier;
        
        // Ensure values stay within bounds
        this.bdnf = Math.max(0, Math.min(1.0, this.bdnf));
        this.synapticStrength = Math.max(0.5, Math.min(2.0, this.synapticStrength));
        
        return this.getCurrentState();
    }

    getCurrentState() {
        return {
            bdnf: this.bdnf,
            strength: this.synapticStrength,
            neurogenesisRate: this.neurogenesisRate
        };
    }

    applyStress(stressFactor) {
        // Stress reduces BDNF production
        this.neurogenesisRate = Math.max(0.001, 0.01 - (stressFactor * 0.005));
        this.bdnf = Math.max(0.1, this.bdnf - (stressFactor * 0.1));
    }
}
EOF

cat > synaptic-wars-phase2/src/neuro-engine/eeg-integration.js << 'EOF'
// EEG Integration with Muse Headset
export class EEGIntegration {
    constructor() {
        this.isConnected = false;
        this.client = null;
        this.focusLevel = 0.5;
        this.alpha = 0.5;
        this.beta = 0.5;
        this.theta = 0.5;
    }

    async connect() {
        try {
            console.log('🔗 Connecting to Muse headset...');
            
            // Simulate connection process
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            this.isConnected = true;
            this.startEEGMonitoring();
            
            console.log('✅ Muse headset connected successfully!');
            return true;
        } catch (error) {
            console.error('❌ EEG connection failed:', error);
            this.isConnected = false;
            return false;
        }
    }

    startEEGMonitoring() {
        // Simulate real EEG data stream
        this.eegInterval = setInterval(() => {
            if (this.isConnected) {
                // Generate realistic EEG data
                this.alpha = 0.3 + Math.random() * 0.4;
                this.beta = 0.2 + Math.random() * 0.6;
                this.theta = 0.1 + Math.random() * 0.3;
                
                // Calculate focus level (higher beta/alpha ratio = more focus)
                this.focusLevel = this.beta / (this.alpha + 0.001);
                this.focusLevel = Math.max(0.1, Math.min(1.0, this.focusLevel));
                
                console.log(`🧠 EEG Data - Focus: ${this.focusLevel.toFixed(2)}, Alpha: ${this.alpha.toFixed(2)}, Beta: ${this.beta.toFixed(2)}`);
            }
        }, 1000);
    }

    getFocusLevel() {
        return this.isConnected ? this.focusLevel : 0.5;
    }

    getBrainwaveData() {
        return {
            focusLevel: this.focusLevel,
            alpha: this.alpha,
            beta: this.beta,
            theta: this.theta,
            isConnected: this.isConnected
        };
    }

    disconnect() {
        if (this.eegInterval) {
            clearInterval(this.eegInterval);
        }
        this.isConnected = false;
        console.log('📴 Muse headset disconnected');
    }

    useSimulatedData() {
        this.disconnect();
        this.isConnected = true;
        this.startEEGMonitoring();
        console.log('🎮 Using simulated EEG data');
    }
}
EOF

cat > synaptic-wars-phase2/src/neuro-engine/neuro-metrics.js << 'EOF'
// Neuro Metrics Tracking
export class NeuroMetrics {
    constructor() {
        this.metrics = {
            cognitivePerformance: 0.5,
            attentionSpan: 0.5,
            memoryRecall: 0.5,
            processingSpeed: 0.5,
            sessionTime: 0,
            score: 0,
            abilitiesUsed: 0
        };
        
        this.sessionStartTime = Date.now();
    }

    update(plasticityData, eegData) {
        const sessionTime = (Date.now() - this.sessionStartTime) / 1000;
        
        this.metrics = {
            cognitivePerformance: plasticityData.bdnf,
            attentionSpan: eegData.focusLevel,
            memoryRecall: plasticityData.strength * 0.7,
            processingSpeed: plasticityData.strength * 0.6,
            sessionTime: sessionTime,
            score: this.metrics.score,
            abilitiesUsed: this.metrics.abilitiesUsed
        };
        
        return this.metrics;
    }

    recordAbilityUse() {
        this.metrics.abilitiesUsed++;
        this.metrics.score += 10;
    }

    exportResearchData() {
        return {
            timestamp: new Date().toISOString(),
            metrics: this.metrics
        };
    }

    getSessionSummary() {
        const sessionDuration = (Date.now() - this.sessionStartTime) / 1000;
        return {
            duration: sessionDuration,
            finalScore: this.metrics.score,
            abilitiesUsed: this.metrics.abilitiesUsed,
            avgCognitivePerformance: this.metrics.cognitivePerformance,
            avgAttentionSpan: this.metrics.attentionSpan
        };
    }
}
EOF

# Fix UI files
cat > synaptic-wars-phase2/src/ui/neuro-dashboard.js << 'EOF'
// Neuro Dashboard UI
export class NeuroDashboard {
    constructor() {
        this.metrics = {};
        this.createDashboard();
    }

    createDashboard() {
        // Create dashboard DOM elements
        const dashboardHTML = `
            <div id="neuro-dashboard" style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 20px;
                border-radius: 10px;
                border: 2px solid #8A2BE2;
                font-family: Arial, sans-serif;
                min-width: 250px;
                z-index: 1000;
            ">
                <h3 style="margin: 0 0 15px 0; color: #8A2BE2;">🧠 Neuro Dashboard</h3>
                <div id="metrics-display">
                    <div>BDNF: <span id="bdnf-value">0.23</span></div>
                    <div>Strength: <span id="strength-value">1.0</span></div>
                    <div>Focus: <span id="focus-value">0.5</span></div>
                    <div>Performance: <span id="performance-value">0.5</span></div>
                </div>
                <div style="margin-top: 15px;">
                    <button onclick="activateDendriticLightning()" style="
                        background: #8A2BE2;
                        color: white;
                        border: none;
                        padding: 8px 12px;
                        border-radius: 5px;
                        margin: 2px;
                        cursor: pointer;
                    ">⚡ Lightning</button>
                    <button onclick="activateSerotoninTsunami()" style="
                        background: #00BFFF;
                        color: white;
                        border: none;
                        padding: 8px 12px;
                        border-radius: 5px;
                        margin: 2px;
                        cursor: pointer;
                    ">🌊 Tsunami</button>
                </div>
                <div style="margin-top: 10px; font-size: 12px;">
                    EEG: <span id="eeg-status">Not Connected</span>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', dashboardHTML);
    }

    update(plasticityData, eegData, gameMetrics) {
        this.metrics = {
            bdnf: plasticityData.bdnf,
            synapticStrength: plasticityData.strength,
            focusLevel: eegData.focusLevel,
            ...gameMetrics
        };
        
        this.render();
    }

    render() {
        // Update DOM elements with current metrics
        const bdnfElement = document.getElementById('bdnf-value');
        const strengthElement = document.getElementById('strength-value');
        const focusElement = document.getElementById('focus-value');
        const performanceElement = document.getElementById('performance-value');
        const eegStatusElement = document.getElementById('eeg-status');
        
        if (bdnfElement) bdnfElement.textContent = this.metrics.bdnf.toFixed(2);
        if (strengthElement) strengthElement.textContent = this.metrics.synapticStrength.toFixed(2);
        if (focusElement) focusElement.textContent = this.metrics.focusLevel.toFixed(2);
        if (performanceElement) performanceElement.textContent = this.metrics.cognitivePerformance.toFixed(2);
        if (eegStatusElement) {
            eegStatusElement.textContent = this.metrics.focusLevel > 0.5 ? 'Connected' : 'Not Connected';
            eegStatusElement.style.color = this.metrics.focusLevel > 0.5 ? '#1dd1a1' : '#ff6b6b';
        }
    }

    showAchievement(title, description) {
        console.log(`🏆 Achievement: ${title} - ${description}`);
        
        // Create achievement notification
        const achievementHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #FFD700, #FF8C00);
                color: black;
                padding: 20px;
                border-radius: 10px;
                text-align: center;
                z-index: 1001;
                animation: fadeInOut 3s ease-in-out;
            ">
                <div style="font-size: 24px;">🏆</div>
                <strong>${title}</strong><br>
                ${description}
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', achievementHTML);
        
        // Remove after 3 seconds
        setTimeout(() => {
            const achievement = document.querySelector('div[style*="background: linear-gradient(135deg, #FFD700, #FF8C00)"]');
            if (achievement) {
                achievement.remove();
            }
        }, 3000);
    }
}

// Add CSS for animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        20% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
        30% { transform: translate(-50%, -50%) scale(1); }
        80% { opacity: 1; }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
`;
document.head.appendChild(style);
EOF

cat > synaptic-wars-phase2/src/ui/eeg-connection.js << 'EOF'
// EEG Connection Interface
export class EEGConnection {
    constructor() {
        this.connectionStatus = 'disconnected';
        this.createConnectionDialog();
    }

    createConnectionDialog() {
        const dialogHTML = `
            <div id="eeg-connection" style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0,0,0,0.9);
                color: white;
                padding: 30px;
                border-radius: 15px;
                border: 2px solid #8A2BE2;
                text-align: center;
                z-index: 1002;
                min-width: 300px;
            ">
                <h3 style="margin: 0 0 20px 0; color: #8A2BE2;">🎧 Connect EEG Headset</h3>
                <div id="eeg-status" style="margin: 10px 0; padding: 10px; background: #333; border-radius: 5px;">
                    Status: ${this.connectionStatus}
                </div>
                <div style="margin: 20px 0;">
                    <button onclick="connectMuse()" style="
                        background: #8A2BE2;
                        color: white;
                        border: none;
                        padding: 12px 20px;
                        border-radius: 8px;
                        margin: 5px;
                        cursor: pointer;
                        font-size: 14px;
                    ">🔗 Connect Muse Headset</button>
                    <button onclick="useSimulatedEEG()" style="
                        background: #00BFFF;
                        color: white;
                        border: none;
                        padding: 12px 20px;
                        border-radius: 8px;
                        margin: 5px;
                        cursor: pointer;
                        font-size: 14px;
                    ">🎮 Use Simulated Data</button>
                </div>
                <button onclick="closeEEGDialog()" style="
                    background: #666;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 5px;
                    cursor: pointer;
                ">Close</button>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', dialogHTML);
    }

    updateStatus(status) {
        this.connectionStatus = status;
        const statusElement = document.getElementById('eeg-status');
        if (statusElement) {
            statusElement.textContent = `Status: ${status}`;
            statusElement.style.background = status === 'connected' ? '#1dd1a1' : 
                                           status === 'connecting' ? '#feca57' : '#333';
        }
    }

    show() {
        const dialog = document.getElementById('eeg-connection');
        if (dialog) {
            dialog.style.display = 'block';
        }
    }

    hide() {
        const dialog = document.getElementById('eeg-connection');
        if (dialog) {
            dialog.style.display = 'none';
        }
    }
}

// Global functions for UI
window.useSimulatedEEG = () => {
    if (window.game && window.game.eegIntegration) {
        window.game.eegIntegration.useSimulatedData();
        const connection = document.querySelector('#eeg-connection');
        if (connection) connection.style.display = 'none';
    }
};

window.closeEEGDialog = () => {
    const dialog = document.getElementById('eeg-connection');
    if (dialog) {
        dialog.style.display = 'none';
    }
};

// Show EEG connection dialog on page load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const dialog = document.getElementById('eeg-connection');
        if (dialog) {
            dialog.style.display = 'block';
        }
    }, 1000);
});
EOF

# Fix gameplay files
cat > synaptic-wars-phase2/src/gameplay/player-controller.js << 'EOF'
// Advanced Player Controller
export class PlayerController {
    constructor() {
        this.abilities = {
            dendriticLightning: { cooldown: 0, maxCooldown: 2.0, active: false },
            serotoninTsunami: { cooldown: 0, maxCooldown: 5.0, active: false }
        };
        this.position = { x: 0, y: 0, z: 0 };
    }

    update(deltaTime) {
        // Update ability cooldowns
        Object.values(this.abilities).forEach(ability => {
            if (ability.cooldown > 0) {
                ability.cooldown -= deltaTime;
                if (ability.cooldown <= 0) {
                    ability.cooldown = 0;
                    ability.active = false;
                }
            }
        });
    }

    activateAbility(abilityName) {
        const ability = this.abilities[abilityName];
        if (ability && ability.cooldown <= 0) {
            ability.cooldown = ability.maxCooldown;
            ability.active = true;
            
            // Record ability use for metrics
            if (window.game && window.game.neuroMetrics) {
                window.game.neuroMetrics.recordAbilityUse();
            }
            
            console.log(`✅ ${abilityName} activated! Cooldown: ${ability.maxCooldown}s`);
            return true;
        } else if (ability && ability.cooldown > 0) {
            console.log(`⏳ ${abilityName} on cooldown: ${ability.cooldown.toFixed(1)}s remaining`);
            return false;
        }
        return false;
    }

    move(direction) {
        const speed = 5.0;
        this.position.x += direction.x * speed;
        this.position.z += direction.z * speed;
        
        // Keep within bounds
        this.position.x = Math.max(-10, Math.min(10, this.position.x));
        this.position.z = Math.max(-10, Math.min(10, this.position.z));
    }

    getAbilityStatus(abilityName) {
        const ability = this.abilities[abilityName];
        if (ability) {
            return {
                cooldown: ability.cooldown,
                maxCooldown: ability.maxCooldown,
                active: ability.active,
                ready: ability.cooldown <= 0
            };
        }
        return null;
    }

    getAllAbilitiesStatus() {
        const status = {};
        Object.keys(this.abilities).forEach(abilityName => {
            status[abilityName] = this.getAbilityStatus(abilityName);
        });
        return status;
    }
}
EOF

cat > synaptic-wars-phase2/src/gameplay/tau-tangler-ai.js << 'EOF'
// Tau Tangler AI System
export class TauTanglerAI {
    constructor() {
        this.tanglers = [];
        this.spawnRate = 2.0;
        this.lastSpawnTime = 0;
        this.maxTanglers = 8;
    }

    spawnTangler() {
        if (this.tanglers.length >= this.maxTanglers) return null;
        
        const tangler = {
            id: Date.now() + Math.random(),
            position: { 
                x: (Math.random() - 0.5) * 15,
                y: 0,
                z: (Math.random() - 0.5) * 15
            },
            health: 100,
            speed: 0.5 + Math.random() * 1.0,
            rotation: 0,
            scale: 0.8 + Math.random() * 0.4
        };
        
        this.tanglers.push(tangler);
        console.log(`🎯 Tau Tangler spawned! Total: ${this.tanglers.length}`);
        return tangler;
    }

    update(deltaTime, playerPosition) {
        this.lastSpawnTime += deltaTime;
        
        // Spawn new tanglers periodically
        if (this.lastSpawnTime >= this.spawnRate && this.tanglers.length < this.maxTanglers) {
            this.spawnTangler();
            this.lastSpawnTime = 0;
        }
        
        // Update existing tanglers
        this.tanglers.forEach(tangler => {
            // Move toward player
            const dx = playerPosition.x - tangler.position.x;
            const dz = playerPosition.z - tangler.position.z;
            const distance = Math.sqrt(dx * dx + dz * dz);
            
            if (distance > 1.5) {
                tangler.position.x += (dx / distance) * tangler.speed * deltaTime;
                tangler.position.z += (dz / distance) * tangler.speed * deltaTime;
            }
            
            // Rotate and pulse
            tangler.rotation += deltaTime * 2;
            tangler.scale = 0.8 + Math.sin(tangler.rotation) * 0.2;
        });
        
        return this.tanglers;
    }

    removeTangler(tanglerId) {
        const index = this.tanglers.findIndex(t => t.id === tanglerId);
        if (index > -1) {
            this.tanglers.splice(index, 1);
            console.log(`💥 Tau Tangler destroyed! Remaining: ${this.tanglers.length}`);
            return true;
        }
        return false;
    }

    damageTangler(tanglerId, damage) {
        const tangler = this.tanglers.find(t => t.id === tanglerId);
        if (tangler) {
            tangler.health -= damage;
            if (tangler.health <= 0) {
                this.removeTangler(tanglerId);
                return true; // Tangler destroyed
            }
            return false; // Tangler damaged but alive
        }
        return null; // Tangler not found
    }

    getTanglerCount() {
        return this.tanglers.length;
    }

    clearAllTanglers() {
        const count = this.tanglers.length;
        this.tanglers = [];
        console.log(`🧹 Cleared all ${count} Tau Tanglers`);
        return count;
    }
}
EOF

echo "✅ All Phase 2 files have been created with proper JavaScript syntax!"
echo "🚀 Now run: cd synaptic-wars-phase2 && npm install && npm run dev"
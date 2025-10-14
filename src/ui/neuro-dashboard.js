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

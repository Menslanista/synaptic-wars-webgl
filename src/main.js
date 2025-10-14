// Synaptic Wars Phase 2 - Main Entry Point
import * as THREE from 'three';
import { SceneManager } from './scenes/scene-manager.js';
import { PlasticitySystem } from './neuro-engine/plasticity-system.js';
import { EEGIntegration } from './neuro-engine/eeg-integration.js';
import { NeuroMetrics } from './neuro-engine/neuro-metrics.js';
import { NeuroDashboard } from './ui/neuro-dashboard.js';
import { PlayerController } from './gameplay/player-controller.js';
import { TauTanglerAI } from './gameplay/tau-tangler-ai.js';

console.log('🧠 Synaptic Wars Phase 2 - EEG Integration Demo');

class SynapticWarsGame {
    constructor() {
        this.isRunning = false;
        this.lastTime = 0;
        this.achievements = {};
        
        // Initialize systems
        this.plasticitySystem = new PlasticitySystem();
        this.eegIntegration = new EEGIntegration();
        this.neuroMetrics = new NeuroMetrics();
        this.playerController = new PlayerController();
        this.tauTanglerAI = new TauTanglerAI();
        this.neuroDashboard = new NeuroDashboard();
        this.sceneManager = new SceneManager();
        
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.neuron = null;
        
        this.init();
    }

    async init() {
        console.log('Initializing Synaptic Wars Phase 2...');
        
        try {
            // Setup Three.js
            this.setupThreeJS();
            
            // Load initial scene
            await this.sceneManager.loadScene('hippocampus');
            this.scene = this.sceneManager.getCurrentScene().scene;
            
            // Setup camera
            this.setupCamera();
            
            // Add player to scene
            this.neuron = this.sceneManager.addPlayerToScene({
                position: new THREE.Vector3(0, 0, 0)
            });
            
            // Add game container to DOM
            const gameContainer = document.getElementById('game-container');
            if (gameContainer) {
                gameContainer.appendChild(this.renderer.domElement);
            } else {
                console.warn('Game container not found, adding to body');
                document.body.appendChild(this.renderer.domElement);
            }
            
            // Create scene navigation
            this.createSceneNavigation();
            
            // Start game loop
            this.isRunning = true;
            this.gameLoop();
            
            console.log('✅ Synaptic Wars Phase 2 initialized successfully!');
        } catch (error) {
            console.error('❌ Initialization failed:', error);
        }
    }

    setupThreeJS() {
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );
        this.camera.position.set(0, 5, 10);
        this.camera.lookAt(0, 0, 0);
    }

    createSceneNavigation() {
        const navigationHTML = `
            <div id="scene-navigation" style="
                position: fixed;
                bottom: 20px;
                left: 20px;
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 15px;
                border-radius: 10px;
                border: 2px solid #8A2BE2;
                z-index: 1000;
                font-family: Arial, sans-serif;
            ">
                <h4 style="margin: 0 0 10px 0; color: #8A2BE2;">🌍 Brain Regions</h4>
                <button onclick="window.switchScene('hippocampus')" style="
                    background: #8A2BE2;
                    color: white;
                    border: none;
                    padding: 8px 12px;
                    border-radius: 5px;
                    margin: 2px;
                    cursor: pointer;
                    font-size: 12px;
                ">Hippocampus</button>
                <button onclick="window.switchScene('prefrontal-cortex')" style="
                    background: #00BFFF;
                    color: white;
                    border: none;
                    padding: 8px 12px;
                    border-radius: 5px;
                    margin: 2px;
                    cursor: pointer;
                    font-size: 12px;
                ">Prefrontal Cortex</button>
                <button onclick="window.switchScene('cosmic-neuroverse')" style="
                    background: #FF6B6B;
                    color: white;
                    border: none;
                    padding: 8px 12px;
                    border-radius: 5px;
                    margin: 2px;
                    cursor: pointer;
                    font-size: 12px;
                ">Cosmic Neuroverse</button>
                <button onclick="window.nextScene()" style="
                    background: #4ECDC4;
                    color: white;
                    border: none;
                    padding: 8px 12px;
                    border-radius: 5px;
                    margin: 2px;
                    cursor: pointer;
                    font-size: 12px;
                ">Next Region →</button>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', navigationHTML);
    }

    gameLoop(currentTime = 0) {
        if (!this.isRunning) return;
        
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;
        
        this.update(deltaTime);
        
        if (this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
        
        requestAnimationFrame((time) => this.gameLoop(time));
    }

    update(deltaTime) {
        // Update scene manager
        this.sceneManager.update(deltaTime);
        
        // Rotate player neuron
        if (this.neuron) {
            this.neuron.rotation.y += deltaTime;
        }
        
        // Update player controller
        this.playerController.update(deltaTime);
        
        // Update Tau Tangler AI
        const playerPosition = this.neuron ? this.neuron.position : new THREE.Vector3(0, 0, 0);
        this.tauTanglerAI.update(deltaTime, playerPosition);
        
        // Get EEG data
        const focusLevel = this.eegIntegration.getFocusLevel();
        
        // Update neuroplasticity
        const plasticityData = this.plasticitySystem.update(deltaTime, focusLevel);
        
        // Update metrics
        const metrics = this.neuroMetrics.update(plasticityData, { focusLevel });
        
        // Update dashboard
        this.neuroDashboard.update(plasticityData, { focusLevel }, metrics);
        
        // Check for achievements
        this.checkAchievements(plasticityData, metrics);
    }

    checkAchievements(plasticityData, metrics) {
        if (plasticityData.bdnf >= 0.5 && !this.achievements?.bdnfMaster) {
            this.neuroDashboard.showAchievement(
                "BDNF Master", 
                "Your brain is producing optimal growth factors!"
            );
            this.achievements.bdnfMaster = true;
        }
        
        if (plasticityData.strength >= 1.5 && !this.achievements?.synapticChampion) {
            this.neuroDashboard.showAchievement(
                "Synaptic Champion", 
                "Neural connections are strengthening rapidly!"
            );
            this.achievements.synapticChampion = true;
        }
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
            // Reward neuroplasticity for healing
            this.plasticitySystem.reward(0.1);
        }
    }

    async switchScene(sceneName) {
        try {
            await this.sceneManager.loadScene(sceneName);
            this.scene = this.sceneManager.getCurrentScene().scene;
            
            // Re-add player to new scene
            this.neuron = this.sceneManager.addPlayerToScene({
                position: new THREE.Vector3(0, 0, 0)
            });
            
            console.log(`✅ Switched to scene: ${sceneName}`);
        } catch (error) {
            console.error('❌ Scene switch failed:', error);
        }
    }

    async nextScene() {
        await this.sceneManager.cycleToNextScene();
        this.scene = this.sceneManager.getCurrentScene().scene;
        
        // Re-add player to new scene
        this.neuron = this.sceneManager.addPlayerToScene({
            position: new THREE.Vector3(0, 0, 0)
        });
    }

    handleResize() {
        if (this.camera && this.renderer) {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }
    }

    cleanup() {
        this.isRunning = false;
        if (this.sceneManager) {
            this.sceneManager.cleanup();
        }
        if (this.renderer) {
            this.renderer.dispose();
        }
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.game = new SynapticWarsGame();
    
    // Add global functions for UI
    window.activateDendriticLightning = () => {
        if (window.game) window.game.activateDendriticLightning();
    };
    
    window.activateSerotoninTsunami = () => {
        if (window.game) window.game.activateSerotoninTsunami();
    };
    
    window.connectMuse = () => {
        if (window.game) window.game.eegIntegration.connect();
    };
    
    window.switchScene = (sceneName) => {
        if (window.game) window.game.switchScene(sceneName);
    };
    
    window.nextScene = () => {
        if (window.game) window.game.nextScene();
    };
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.game) window.game.handleResize();
    });
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.game) {
        window.game.cleanup();
    }
});

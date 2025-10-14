// Scene Manager - Handles scene loading and transitions
import { HippocampusScene } from './hippocampus-scene.js';
import { PrefrontalCortexScene } from './prefrontal-cortex.js';
import { CosmicNeuroverseScene } from './cosmic-neuroverse.js';

export class SceneManager {
    constructor() {
        this.currentScene = null;
        this.currentSceneName = null;
        this.scenes = new Map();
        this.transitionTime = 1000; // ms
        this.isTransitioning = false;
    }

    async loadScene(sceneName) {
        if (this.isTransitioning) {
            console.warn('⚠️ Already transitioning, please wait...');
            return;
        }
        
        console.log(`🔄 Loading scene: ${sceneName}`);
        this.isTransitioning = true;
        
        // Clean up current scene
        if (this.currentScene) {
            await this.transitionOut();
            this.currentScene.cleanup();
        }
        
        let scene;
        switch(sceneName) {
            case 'hippocampus':
                scene = new HippocampusScene();
                break;
            case 'prefrontal-cortex':
                scene = new PrefrontalCortexScene();
                break;
            case 'cosmic-neuroverse':
                scene = new CosmicNeuroverseScene();
                break;
            default:
                console.warn(`Unknown scene: ${sceneName}, defaulting to hippocampus`);
                scene = new HippocampusScene();
                sceneName = 'hippocampus';
        }
        
        const sceneObject = await scene.load();
        this.scenes.set(sceneName, scene);
        this.currentScene = scene;
        this.currentSceneName = sceneName;
        
        await this.transitionIn();
        this.isTransitioning = false;
        
        console.log(`✅ Scene loaded: ${sceneName}`);
        return sceneObject;
    }

    async transitionOut() {
        // Fade out current scene
        console.log('🎬 Transitioning out...');
        return new Promise(resolve => {
            // In a full implementation, this would handle visual transitions
            // For now, just wait
            setTimeout(resolve, this.transitionTime / 2);
        });
    }

    async transitionIn() {
        // Fade in new scene
        console.log('🎬 Transitioning in...');
        return new Promise(resolve => {
            // In a full implementation, this would handle visual transitions
            // For now, just wait
            setTimeout(resolve, this.transitionTime / 2);
        });
    }

    getCurrentScene() {
        return this.currentScene;
    }

    getCurrentSceneName() {
        return this.currentSceneName;
    }

    update(deltaTime) {
        if (this.currentScene && this.currentScene.update) {
            this.currentScene.update(deltaTime);
        }
    }

    getAvailableScenes() {
        return [
            { name: 'hippocampus', label: 'Hippocampus Memory Maze', description: 'Memory formation and spatial navigation' },
            { name: 'prefrontal-cortex', label: 'Prefrontal Cortex', description: 'Executive functions and decision making' },
            { name: 'cosmic-neuroverse', label: 'Cosmic Neuroverse', description: 'Abstract neural universe visualization' }
        ];
    }

    async cycleToNextScene() {
        const scenes = this.getAvailableScenes();
        const currentIndex = scenes.findIndex(scene => scene.name === this.currentSceneName);
        const nextIndex = (currentIndex + 1) % scenes.length;
        const nextScene = scenes[nextIndex];
        
        return this.loadScene(nextScene.name);
    }

    addPlayerToScene(playerObject) {
        if (this.currentScene && this.currentScene.addPlayerNeuron) {
            return this.currentScene.addPlayerNeuron(playerObject.position);
        }
        return null;
    }

    addEnemyToScene(enemyObject) {
        if (this.currentScene && this.currentScene.addTauTangler) {
            return this.currentScene.addTauTangler(enemyObject.position);
        }
        return null;
    }

    getSpawnPoints(count = 5) {
        if (this.currentScene && this.currentScene.getSpawnPoints) {
            return this.currentScene.getSpawnPoints(count);
        }
        // Default spawn points if scene doesn't provide them
        const spawnPoints = [];
        for (let i = 0; i < count; i++) {
            spawnPoints.push(new THREE.Vector3(
                (Math.random() - 0.5) * 10,
                0,
                (Math.random() - 0.5) * 10
            ));
        }
        return spawnPoints;
    }

    triggerSpecialEffect(effectName) {
        if (!this.currentScene) return;
        
        switch(effectName) {
            case 'neural-big-bang':
                if (this.currentScene.triggerNeuralBigBang) {
                    this.currentScene.triggerNeuralBigBang();
                }
                break;
            case 'decision-making':
                if (this.currentScene.activateDecisionMaking) {
                    this.currentScene.activateDecisionMaking();
                }
                break;
            default:
                console.warn(`Unknown effect: ${effectName}`);
        }
    }

    cleanup() {
        if (this.currentScene) {
            this.currentScene.cleanup();
        }
        this.scenes.clear();
        this.currentScene = null;
        this.currentSceneName = null;
    }
}

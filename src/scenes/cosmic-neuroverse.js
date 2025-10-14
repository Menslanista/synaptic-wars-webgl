// Cosmic Neuroverse - Abstract Neural Universe
import * as THREE from 'three';

export class CosmicNeuroverseScene {
    constructor() {
        this.scene = new THREE.Scene();
        this.neuralGalaxies = [];
        this.quantumConnections = [];
        this.isLoaded = false;
    }

    async load() {
        console.log('🌌 Loading Cosmic Neuroverse...');
        
        // Deep space background
        this.scene.background = new THREE.Color(0x000011);
        
        this.createNeuralGalaxies();
        this.createQuantumEntanglements();
        this.createConsciousnessNebulae();
        this.setupCosmicLighting();
        this.createStarField();
        
        this.isLoaded = true;
        console.log('✅ Cosmic Neuroverse loaded successfully');
        return this.scene;
    }

    createNeuralGalaxies() {
        // Create galaxy-like neural clusters
        const galaxyCount = 5;
        
        for (let i = 0; i < galaxyCount; i++) {
            const galaxy = {
                particles: new THREE.Group(),
                center: new THREE.Vector3(
                    (Math.random() - 0.5) * 20,
                    (Math.random() - 0.5) * 20,
                    (Math.random() - 0.5) * 20
                ),
                rotationSpeed: 0.001 + Math.random() * 0.005
            };
            
            this.createGalaxyParticles(galaxy);
            this.scene.add(galaxy.particles);
            this.neuralGalaxies.push(galaxy);
        }
        
        this.animateGalaxies();
    }

    createGalaxyParticles(galaxy) {
        const particleCount = 200;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        
        for (let i = 0; i < particleCount * 3; i += 3) {
            // Spiral galaxy distribution
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 5;
            const height = (Math.random() - 0.5) * 2;
            
            positions[i] = Math.cos(angle) * radius;
            positions[i + 1] = height;
            positions[i + 2] = Math.sin(angle) * radius;
            
            // Neural activity colors
            const colorIntensity = 0.5 + Math.random() * 0.5;
            colors[i] = 0.8 * colorIntensity;       // R
            colors[i + 1] = 0.3 * colorIntensity;   // G
            colors[i + 2] = 1.0 * colorIntensity;   // B
            
            sizes[i / 3] = 0.02 + Math.random() * 0.08;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        const material = new THREE.PointsMaterial({
            size: 0.1,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true
        });
        
        const particleSystem = new THREE.Points(geometry, material);
        particleSystem.position.copy(galaxy.center);
        galaxy.particles.add(particleSystem);
    }

    animateGalaxies() {
        const animate = () => {
            this.neuralGalaxies.forEach(galaxy => {
                galaxy.particles.rotation.y += galaxy.rotationSpeed;
                
                // Gentle floating motion
                galaxy.particles.position.y += Math.sin(Date.now() * 0.001) * 0.001;
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    createQuantumEntanglements() {
        // Create quantum connections between galaxies
        for (let i = 0; i < this.neuralGalaxies.length; i++) {
            for (let j = i + 1; j < this.neuralGalaxies.length; j++) {
                if (Math.random() > 0.7) { // 30% connection chance
                    this.createQuantumConnection(
                        this.neuralGalaxies[i].center,
                        this.neuralGalaxies[j].center
                    );
                }
            }
        }
    }

    createQuantumConnection(pointA, pointB) {
        const curve = new THREE.CatmullRomCurve3([
            pointA,
            new THREE.Vector3(
                (pointA.x + pointB.x) / 2 + (Math.random() - 0.5) * 3,
                (pointA.y + pointB.y) / 2 + (Math.random() - 0.5) * 3,
                (pointA.z + pointB.z) / 2 + (Math.random() - 0.5) * 3
            ),
            pointB
        ]);
        
        const geometry = new THREE.TubeGeometry(curve, 20, 0.05, 8, false);
        const material = new THREE.MeshBasicMaterial({
            color: 0x00FFFF,
            transparent: true,
            opacity: 0.3
        });
        
        const connection = new THREE.Mesh(geometry, material);
        this.scene.add(connection);
        this.quantumConnections.push(connection);
        
        // Animate connection
        this.animateQuantumConnection(connection);
    }

    animateQuantumConnection(connection) {
        const originalOpacity = connection.material.opacity;
        
        const animate = () => {
            // Pulsing opacity
            const pulse = Math.sin(Date.now() * 0.003) * 0.2 + 0.8;
            connection.material.opacity = originalOpacity * pulse;
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    createConsciousnessNebulae() {
        // Create ethereal neural nebulae
        const nebulaCount = 3;
        
        for (let i = 0; i < nebulaCount; i++) {
            const geometry = new THREE.SphereGeometry(3 + Math.random() * 2, 32, 32);
            const material = new THREE.MeshPhongMaterial({
                color: new THREE.Color().setHSL(Math.random(), 0.8, 0.5),
                transparent: true,
                opacity: 0.1,
                wireframe: true
            });
            
            const nebula = new THREE.Mesh(geometry, material);
            nebula.position.set(
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 15
            );
            
            this.scene.add(nebula);
            
            // Animate nebula
            this.animateNebula(nebula);
        }
    }

    animateNebula(nebula) {
        const originalScale = nebula.scale.clone();
        const rotationSpeed = 0.001 + Math.random() * 0.002;
        
        const animate = () => {
            nebula.rotation.x += rotationSpeed;
            nebula.rotation.y += rotationSpeed * 0.7;
            
            // Gentle breathing motion
            const breath = Math.sin(Date.now() * 0.0005) * 0.1 + 1;
            nebula.scale.copy(originalScale).multiplyScalar(breath);
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    createStarField() {
        // Create background star field
        const starCount = 1000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);
        
        for (let i = 0; i < starCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 100;
            positions[i + 1] = (Math.random() - 0.5) * 100;
            positions[i + 2] = (Math.random() - 0.5) * 100;
            
            sizes[i / 3] = Math.random() * 0.1;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        const material = new THREE.PointsMaterial({
            size: 0.05,
            color: 0xFFFFFF,
            transparent: true,
            opacity: 0.8
        });
        
        const starField = new THREE.Points(geometry, material);
        this.scene.add(starField);
    }

    setupCosmicLighting() {
        // Subtle cosmic lighting
        const ambientLight = new THREE.AmbientLight(0x222266, 0.1);
        this.scene.add(ambientLight);
        
        // Directional light from "consciousness source"
        const directionalLight = new THREE.DirectionalLight(0x4466FF, 0.3);
        directionalLight.position.set(10, 10, 10);
        this.scene.add(directionalLight);
        
        // Point lights in galaxies
        this.neuralGalaxies.forEach(galaxy => {
            const pointLight = new THREE.PointLight(0x8A2BE2, 0.5, 10);
            pointLight.position.copy(galaxy.center);
            this.scene.add(pointLight);
        });
    }

    triggerNeuralBigBang() {
        // Spectacular neural activation effect
        this.neuralGalaxies.forEach(galaxy => {
            galaxy.particles.children.forEach(particleSystem => {
                const positions = particleSystem.geometry.attributes.position.array;
                
                for (let i = 0; i < positions.length; i += 3) {
                    // Expand particles rapidly
                    positions[i] *= 1.5;
                    positions[i + 1] *= 1.5;
                    positions[i + 2] *= 1.5;
                }
                
                particleSystem.geometry.attributes.position.needsUpdate = true;
            });
        });
        
        // Return to normal after 3 seconds
        setTimeout(() => {
            this.neuralGalaxies.forEach(galaxy => {
                galaxy.particles.children.forEach(particleSystem => {
                    const positions = particleSystem.geometry.attributes.position.array;
                    
                    for (let i = 0; i < positions.length; i += 3) {
                        // Contract back to original
                        positions[i] /= 1.5;
                        positions[i + 1] /= 1.5;
                        positions[i + 2] /= 1.5;
                    }
                    
                    particleSystem.geometry.attributes.position.needsUpdate = true;
                });
            });
        }, 3000);
    }

    update(deltaTime) {
        // Update cosmic animations
        if (this.isLoaded) {
            // Additional cosmic updates can go here
        }
    }

    cleanup() {
        this.neuralGalaxies = [];
        this.quantumConnections = [];
        this.isLoaded = false;
    }
}

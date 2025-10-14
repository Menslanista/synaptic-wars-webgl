// Hippocampus Memory Maze Scene
import * as THREE from 'three';

export class HippocampusScene {
    constructor() {
        this.scene = new THREE.Scene();
        this.objects = new Map();
        this.neurons = [];
        this.synapticConnections = [];
    }

    async load() {
        console.log('🧠 Loading Hippocampus Environment...');
        
        // Set background color (neural tissue-like)
        this.scene.background = new THREE.Color(0x0a0a2a);
        
        // Create neural pathway structures
        this.createNeuralPathways();
        this.createSynapticJunctions();
        this.createNeurotransmitterParticles();
        this.createMemoryChambers();
        
        // Add ambient neural lighting
        this.setupLighting();
        
        console.log('✅ Hippocampus scene loaded successfully');
        return this.scene;
    }

    createNeuralPathways() {
        // Create curved neural pathways (hippocampus structure)
        const pathwayCount = 8;
        
        for (let i = 0; i < pathwayCount; i++) {
            const curve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(
                    Math.sin(i * Math.PI * 2 / pathwayCount) * 5,
                    i * 0.5,
                    Math.cos(i * Math.PI * 2 / pathwayCount) * 5
                ),
                new THREE.Vector3(
                    Math.sin((i + 0.5) * Math.PI * 2 / pathwayCount) * 8,
                    i * 0.8,
                    Math.cos((i + 0.5) * Math.PI * 2 / pathwayCount) * 8
                )
            ]);
            
            const tubeGeometry = new THREE.TubeGeometry(curve, 20, 0.3, 8, false);
            const tubeMaterial = new THREE.MeshPhongMaterial({
                color: 0x8A2BE2,
                emissive: 0x4A1B8C,
                transparent: true,
                opacity: 0.7
            });
            
            const pathway = new THREE.Mesh(tubeGeometry, tubeMaterial);
            pathway.name = `neural-pathway-${i}`;
            this.scene.add(pathway);
            this.objects.set(pathway.name, pathway);
        }
    }

    createSynapticJunctions() {
        // Create synaptic connection points
        const junctionCount = 12;
        
        for (let i = 0; i < junctionCount; i++) {
            const geometry = new THREE.SphereGeometry(0.5, 16, 16);
            const material = new THREE.MeshPhongMaterial({
                color: 0x00FF00,
                emissive: 0x008800,
                transparent: true,
                opacity: 0.8
            });
            
            const junction = new THREE.Mesh(geometry, material);
            
            // Position junctions along neural pathways
            const angle = (i / junctionCount) * Math.PI * 2;
            const radius = 4 + Math.random() * 3;
            junction.position.set(
                Math.cos(angle) * radius,
                i * 0.7,
                Math.sin(angle) * radius
            );
            
            junction.name = `synaptic-junction-${i}`;
            this.scene.add(junction);
            this.objects.set(junction.name, junction);
            
            // Add pulsing animation
            this.animateJunction(junction);
        }
    }

    animateJunction(junction) {
        const originalScale = junction.scale.clone();
        let pulsePhase = Math.random() * Math.PI * 2;
        
        const animate = () => {
            pulsePhase += 0.05;
            const pulse = Math.sin(pulsePhase) * 0.3 + 1;
            junction.scale.setScalar(originalScale.x * pulse);
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    createNeurotransmitterParticles() {
        // Create floating neurotransmitter particles
        const particleCount = 50;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i += 3) {
            // Random positions in a sphere
            const radius = 2 + Math.random() * 6;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            
            positions[i] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i + 2] = radius * Math.cos(phi);
            
            // Neurotransmitter colors (dopamine, serotonin, etc.)
            const neurotransmitterType = Math.floor(Math.random() * 3);
            let color;
            switch(neurotransmitterType) {
                case 0: color = [1.0, 0.5, 0.0]; break; // Dopamine (orange)
                case 1: color = [0.0, 1.0, 1.0]; break; // Serotonin (cyan)
                case 2: color = [1.0, 0.0, 1.0]; break; // GABA (purple)
            }
            
            colors[i] = color[0];
            colors[i + 1] = color[1];
            colors[i + 2] = color[2];
        }
        
        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const particleMaterial = new THREE.PointsMaterial({
            size: 0.2,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });
        
        const particleSystem = new THREE.Points(particles, particleMaterial);
        particleSystem.name = 'neurotransmitter-particles';
        this.scene.add(particleSystem);
        this.objects.set(particleSystem.name, particleSystem);
        
        // Animate particles
        this.animateParticles(particleSystem);
    }

    animateParticles(particleSystem) {
        const positions = particleSystem.geometry.attributes.position.array;
        const originalPositions = [...positions];
        const speeds = new Float32Array(positions.length / 3);
        
        for (let i = 0; i < speeds.length; i++) {
            speeds[i] = 0.1 + Math.random() * 0.2;
        }
        
        const animate = () => {
            for (let i = 0; i < positions.length; i += 3) {
                const particleIndex = i / 3;
                const time = Date.now() * 0.001 * speeds[particleIndex];
                
                positions[i] = originalPositions[i] + Math.sin(time) * 0.5;
                positions[i + 1] = originalPositions[i + 1] + Math.cos(time * 0.7) * 0.3;
                positions[i + 2] = originalPositions[i + 2] + Math.sin(time * 0.5) * 0.4;
            }
            
            particleSystem.geometry.attributes.position.needsUpdate = true;
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    createMemoryChambers() {
        // Create memory storage chambers (hippocampus function)
        const chamberCount = 4;
        const chamberColors = [0xFF6B6B, 0x4ECDC4, 0x45B7D1, 0x96CEB4];
        
        for (let i = 0; i < chamberCount; i++) {
            const geometry = new THREE.OctahedronGeometry(1.5, 1);
            const material = new THREE.MeshPhongMaterial({
                color: chamberColors[i],
                emissive: chamberColors[i],
                transparent: true,
                opacity: 0.3,
                wireframe: true
            });
            
            const chamber = new THREE.Mesh(geometry, material);
            
            // Position chambers around the scene
            const angle = (i / chamberCount) * Math.PI * 2;
            chamber.position.set(
                Math.cos(angle) * 6,
                i * 1.5,
                Math.sin(angle) * 6
            );
            
            chamber.name = `memory-chamber-${i}`;
            this.scene.add(chamber);
            this.objects.set(chamber.name, chamber);
            
            // Rotate chambers slowly
            this.rotateChamber(chamber);
        }
    }

    rotateChamber(chamber) {
        const animate = () => {
            chamber.rotation.y += 0.005;
            chamber.rotation.x += 0.002;
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    setupLighting() {
        // Ambient neural glow
        const ambientLight = new THREE.AmbientLight(0x404080, 0.3);
        this.scene.add(ambientLight);
        
        // Directional neural pathway lighting
        const directionalLight = new THREE.DirectionalLight(0x8A2BE2, 0.8);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);
        
        // Point lights at synaptic junctions
        const pointLight1 = new THREE.PointLight(0x00FF00, 0.5, 10);
        pointLight1.position.set(3, 2, 3);
        this.scene.add(pointLight1);
        
        const pointLight2 = new THREE.PointLight(0x00BFFF, 0.5, 10);
        pointLight2.position.set(-3, 4, -3);
        this.scene.add(pointLight2);
        
        // Add fog for depth
        this.scene.fog = new THREE.Fog(0x0a0a2a, 5, 20);
    }

    addPlayerNeuron(position = new THREE.Vector3(0, 0, 0)) {
        // Create player's neuron
        const geometry = new THREE.SphereGeometry(0.8, 32, 32);
        const material = new THREE.MeshPhongMaterial({
            color: 0xFFFFFF,
            emissive: 0x6666FF,
            shininess: 100
        });
        
        const neuron = new THREE.Mesh(geometry, material);
        neuron.position.copy(position);
        neuron.name = 'player-neuron';
        
        this.scene.add(neuron);
        this.objects.set(neuron.name, neuron);
        
        return neuron;
    }

    addTauTangler(position) {
        // Create Tau Tangler enemy
        const geometry = new THREE.IcosahedronGeometry(0.4, 1);
        const material = new THREE.MeshPhongMaterial({
            color: 0xFF4444,
            emissive: 0x992222
        });
        
        const tangler = new THREE.Mesh(geometry, material);
        tangler.position.copy(position);
        tangler.name = `tau-tangler-${Date.now()}`;
        
        this.scene.add(tangler);
        this.objects.set(tangler.name, tangler);
        
        return tangler;
    }

    update(deltaTime) {
        // Update scene animations
        this.objects.forEach((object, name) => {
            if (name.includes('tau-tangler')) {
                // Tanglers pulse ominously
                object.rotation.y += deltaTime * 2;
                object.rotation.x += deltaTime * 1.5;
                
                const pulse = Math.sin(Date.now() * 0.005) * 0.2 + 1;
                object.scale.setScalar(pulse);
            }
        });
    }

    getSpawnPoints(count = 5) {
        // Get random spawn points for Tau Tanglers
        const spawnPoints = [];
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const radius = 6 + Math.random() * 3;
            spawnPoints.push(new THREE.Vector3(
                Math.cos(angle) * radius,
                Math.random() * 4,
                Math.sin(angle) * radius
            ));
        }
        return spawnPoints;
    }

    cleanup() {
        // Clean up scene resources
        this.objects.forEach(object => {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
                if (Array.isArray(object.material)) {
                    object.material.forEach(material => material.dispose());
                } else {
                    object.material.dispose();
                }
            }
        });
        
        this.objects.clear();
        this.neurons = [];
        this.synapticConnections = [];
    }
}

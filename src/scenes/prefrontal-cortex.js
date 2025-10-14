// Prefrontal Cortex - Executive Function Area
import * as THREE from 'three';

export class PrefrontalCortexScene {
    constructor() {
        this.scene = new THREE.Scene();
        this.decisionNodes = [];
        this.thoughtStreams = [];
        this.isLoaded = false;
    }

    async load() {
        console.log('🎯 Loading Prefrontal Cortex Environment...');
        
        this.scene.background = new THREE.Color(0x1a1a3a);
        
        this.createDecisionNetwork();
        this.createThoughtProcesses();
        this.createExecutiveCenters();
        this.setupCognitiveLighting();
        
        this.isLoaded = true;
        console.log('✅ Prefrontal Cortex scene loaded successfully');
        return this.scene;
    }

    createDecisionNetwork() {
        // Create neural network for decision making
        const layerCount = 5;
        const nodesPerLayer = 8;
        
        for (let layer = 0; layer < layerCount; layer++) {
            const layerNodes = [];
            
            for (let node = 0; node < nodesPerLayer; node++) {
                const geometry = new THREE.DodecahedronGeometry(0.3, 0);
                const material = new THREE.MeshPhongMaterial({
                    color: layer === 0 ? 0xFF6B6B : 
                           layer === layerCount - 1 ? 0x4ECDC4 : 0x45B7D1,
                    emissive: layer === 0 ? 0x993333 : 
                             layer === layerCount - 1 ? 0x2A8C85 : 0x2A7A8C,
                    transparent: true,
                    opacity: 0.8
                });
                
                const decisionNode = new THREE.Mesh(geometry, material);
                
                // Position in grid layout
                const x = (node - nodesPerLayer / 2) * 1.2;
                const y = 0;
                const z = (layer - layerCount / 2) * 2;
                
                decisionNode.position.set(x, y, z);
                decisionNode.userData = {
                    layer: layer,
                    activation: 0,
                    connections: []
                };
                
                this.scene.add(decisionNode);
                layerNodes.push(decisionNode);
                this.decisionNodes.push(decisionNode);
            }
            
            // Create connections between layers
            if (layer > 0) {
                this.connectLayers(this.decisionNodes.slice((layer-1)*nodesPerLayer, layer*nodesPerLayer), layerNodes);
            }
        }
        
        // Animate decision network
        this.animateDecisionNetwork();
    }

    connectLayers(previousLayer, currentLayer) {
        // Create neural connections between layers
        previousLayer.forEach(prevNode => {
            currentLayer.forEach(currNode => {
                if (Math.random() > 0.7) { // 30% connection probability
                    this.createNeuralConnection(prevNode, currNode);
                }
            });
        });
    }

    createNeuralConnection(nodeA, nodeB) {
        const points = [];
        points.push(nodeA.position.clone());
        
        // Add some curvature to the connection
        const midPoint = nodeA.position.clone().lerp(nodeB.position, 0.5);
        midPoint.y += (Math.random() - 0.5) * 2;
        
        points.push(midPoint);
        points.push(nodeB.position.clone());
        
        const curve = new THREE.CatmullRomCurve3(points);
        const geometry = new THREE.TubeGeometry(curve, 4, 0.02, 8, false);
        const material = new THREE.MeshBasicMaterial({
            color: 0x8888FF,
            transparent: true,
            opacity: 0.4
        });
        
        const connection = new THREE.Mesh(geometry, material);
        this.scene.add(connection);
        
        nodeA.userData.connections.push(connection);
        nodeB.userData.connections.push(connection);
    }

    animateDecisionNetwork() {
        const animate = () => {
            this.decisionNodes.forEach(node => {
                // Simulate neural activation
                node.userData.activation = Math.sin(Date.now() * 0.001 + node.position.x) * 0.5 + 0.5;
                
                // Pulse based on activation
                const scale = 0.8 + node.userData.activation * 0.4;
                node.scale.setScalar(scale);
                
                // Update connection opacity
                node.userData.connections.forEach(connection => {
                    connection.material.opacity = 0.2 + node.userData.activation * 0.3;
                });
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    createThoughtProcesses() {
        // Create flowing thought streams
        const streamCount = 3;
        
        for (let i = 0; i < streamCount; i++) {
            const curve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(-8, i * 1.5 - 2, 0),
                new THREE.Vector3(-4, i * 1.5 - 1, (Math.random() - 0.5) * 3),
                new THREE.Vector3(0, i * 1.5, 0),
                new THREE.Vector3(4, i * 1.5 - 1, (Math.random() - 0.5) * 3),
                new THREE.Vector3(8, i * 1.5 - 2, 0)
            ]);
            
            const tubeGeometry = new THREE.TubeGeometry(curve, 50, 0.1, 8, false);
            const tubeMaterial = new THREE.MeshBasicMaterial({
                color: 0x00BFFF,
                transparent: true,
                opacity: 0.6
            });
            
            const thoughtStream = new THREE.Mesh(tubeGeometry, tubeMaterial);
            this.scene.add(thoughtStream);
            this.thoughtStreams.push(thoughtStream);
        }
        
        // Animate thought streams
        this.animateThoughtStreams();
    }

    animateThoughtStreams() {
        const animate = () => {
            this.thoughtStreams.forEach((stream, index) => {
                // Move texture offset for flowing effect
                if (stream.material.map) {
                    stream.material.map.offset.x += 0.01;
                }
                
                // Gentle floating motion
                stream.position.y = Math.sin(Date.now() * 0.001 + index) * 0.1;
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    createExecutiveCenters() {
        // Create centers for different executive functions
        const centers = [
            { name: 'Working Memory', color: 0xFFD700, position: new THREE.Vector3(-3, 3, -2) },
            { name: 'Cognitive Control', color: 0xFF6B6B, position: new THREE.Vector3(3, 3, 2) },
            { name: 'Planning', color: 0x4ECDC4, position: new THREE.Vector3(0, 4, 0) },
            { name: 'Problem Solving', color: 0x45B7D1, position: new THREE.Vector3(-2, 2, 3) }
        ];
        
        centers.forEach(center => {
            const geometry = new THREE.OctahedronGeometry(0.8, 1);
            const material = new THREE.MeshPhongMaterial({
                color: center.color,
                emissive: center.color,
                transparent: true,
                opacity: 0.7,
                wireframe: true
            });
            
            const centerNode = new THREE.Mesh(geometry, material);
            centerNode.position.copy(center.position);
            centerNode.name = center.name;
            
            this.scene.add(centerNode);
            
            // Add label (in a real implementation, you'd use CSS2DRenderer)
            this.createCenterLabel(centerNode, center.name);
            
            // Rotate slowly
            this.rotateCenter(centerNode);
        });
    }

    createCenterLabel(center, text) {
        // This would be implemented with CSS2DRenderer in a full implementation
        console.log(`🏷️ ${text} center at:`, center.position);
    }

    rotateCenter(center) {
        const animate = () => {
            center.rotation.y += 0.01;
            center.rotation.x += 0.005;
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    setupCognitiveLighting() {
        // Bright, focused lighting for cognitive clarity
        const ambientLight = new THREE.AmbientLight(0x4040A0, 0.4);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
        directionalLight.position.set(5, 10, 5);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);
        
        // Spotlights on executive centers
        const spotLight1 = new THREE.SpotLight(0xFFD700, 0.5);
        spotLight1.position.set(-3, 6, -2);
        spotLight1.angle = Math.PI / 6;
        this.scene.add(spotLight1);
        
        const spotLight2 = new THREE.SpotLight(0x4ECDC4, 0.5);
        spotLight2.position.set(3, 6, 2);
        spotLight2.angle = Math.PI / 6;
        this.scene.add(spotLight2);
    }

    activateDecisionMaking() {
        // Simulate decision-making process
        this.decisionNodes.forEach(node => {
            node.userData.activation = 1.0;
            node.material.emissive.setHex(0xFFFFFF);
        });
        
        // Return to normal after 2 seconds
        setTimeout(() => {
            this.decisionNodes.forEach(node => {
                const originalColor = node.material.color.getHex();
                node.material.emissive.setHex(originalColor);
            });
        }, 2000);
    }

    update(deltaTime) {
        // Update any scene-specific animations
        if (this.isLoaded) {
            // Additional update logic can go here
        }
    }

    cleanup() {
        this.decisionNodes = [];
        this.thoughtStreams = [];
        this.isLoaded = false;
    }
}

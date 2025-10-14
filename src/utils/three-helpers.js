// Three.js Helper Utilities
export class ThreeHelpers {
    static createNeuronModel() {
        // Creates a basic neuron 3D model
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshPhongMaterial({ 
            color: 0x8A2BE2,
            emissive: 0x4A1B8C,
            shininess: 100
        });
        return new THREE.Mesh(geometry, material);
    }

    static createTauTanglerModel() {
        // Creates Tau Tangler enemy model
        const geometry = new THREE.IcosahedronGeometry(0.3, 1);
        const material = new THREE.MeshPhongMaterial({
            color: 0xFF4444,
            emissive: 0x992222
        });
        return new THREE.Mesh(geometry, material);
    }

    static createNeuroParticleSystem() {
        // Creates particle system for neural effects
        const particleCount = 100;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 10;
        }
        
        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particleMaterial = new THREE.PointsMaterial({
            color: 0x00FFFF,
            size: 0.1,
            transparent: true
        });
        
        return new THREE.Points(particles, particleMaterial);
    }

    static setupBasicScene() {
        // Sets up a basic Three.js scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x1a1a2e);
        
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);
        
        return { scene, camera, renderer };
    }
}

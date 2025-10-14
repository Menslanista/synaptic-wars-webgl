// Performance Optimization Utilities
export class PerformanceOptimizer {
    constructor() {
        this.frameRate = 60;
        this.lastFrameTime = 0;
        this.fpsCounter = 0;
        this.fpsUpdateInterval = 1000; // Update FPS every second
    }

    static enableGPUCulling(renderer) {
        // Enable GPU-based frustum culling
        renderer.localClippingEnabled = true;
        renderer.sortObjects = true;
    }

    static createObjectPool(createFn, initialSize = 10) {
        // Object pooling for Tau Tanglers and particles
        const pool = {
            available: [],
            inUse: [],
            create: createFn
        };

        // Pre-create objects
        for (let i = 0; i < initialSize; i++) {
            pool.available.push(createFn());
        }

        pool.acquire = function() {
            if (this.available.length === 0) {
                this.available.push(this.create());
            }
            const obj = this.available.pop();
            this.inUse.push(obj);
            return obj;
        };

        pool.release = function(obj) {
            const index = this.inUse.indexOf(obj);
            if (index > -1) {
                this.inUse.splice(index, 1);
                this.available.push(obj);
                
                // Reset object state
                if (obj.position) obj.position.set(0, 0, 0);
                if (obj.rotation) obj.rotation.set(0, 0, 0);
                if (obj.scale) obj.scale.set(1, 1, 1);
            }
        };

        return pool;
    }

    static optimizeScene(scene) {
        // Apply scene-wide optimizations
        scene.traverse(child => {
            if (child.isMesh) {
                // Merge geometries where possible
                if (child.geometry) {
                    child.geometry.computeBoundingSphere();
                }
                
                // Use instanced materials for similar objects
                if (child.material) {
                    child.material.precision = 'mediump';
                }
            }
        });
    }

    static createLODModel(highDetailMesh, mediumDetailMesh, lowDetailMesh) {
        // Level of Detail system for different distance ranges
        const lod = new THREE.LOD();
        
        lod.addLevel(highDetailMesh, 0);
        lod.addLevel(mediumDetailMesh, 10);
        lod.addLevel(lowDetailMesh, 25);
        
        return lod;
    }

    static monitorPerformance() {
        // Real-time performance monitoring
        const stats = {
            fps: 0,
            memory: 0,
            drawCalls: 0,
            triangles: 0
        };

        setInterval(() => {
            if (performance.memory) {
                stats.memory = performance.memory.usedJSHeapSize / 1048576; // MB
            }
        }, 1000);

        return stats;
    }
}

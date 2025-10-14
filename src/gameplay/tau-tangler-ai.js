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

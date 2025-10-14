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

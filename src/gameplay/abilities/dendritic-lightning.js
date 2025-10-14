// Dendritic Lightning Ability
export class DendriticLightning {
    constructor() {
        this.damage = 25;
        this.range = 5.0;
        this.effects = ['stun', 'neuroboost'];
    }

    activate(source, targets) {
        const hits = targets.filter(target => {
            const distance = Math.sqrt(
                Math.pow(target.position.x - source.position.x, 2) +
                Math.pow(target.position.z - source.position.z, 2)
            );
            return distance <= this.range;
        });

        hits.forEach(target => {
            target.health -= this.damage;
            this.applyEffects(target);
        });

        return hits.length;
    }

    applyEffects(target) {
        target.effects.push(...this.effects);
    }
}

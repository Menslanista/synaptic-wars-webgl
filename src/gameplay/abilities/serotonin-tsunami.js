// Serotonin Tsunami Ability
export class SerotoninTsunami {
    constructor() {
        this.healAmount = 40;
        this.radius = 8.0;
        this.duration = 3.0;
    }

    activate(source, targets) {
        const inRange = targets.filter(target => {
            const distance = Math.sqrt(
                Math.pow(target.position.x - source.position.x, 2) +
                Math.pow(target.position.z - source.position.z, 2)
            );
            return distance <= this.radius;
        });

        inRange.forEach(target => {
            target.health += this.healAmount;
            target.effects.push('serotonin_boost');
        });

        return inRange.length;
    }
}

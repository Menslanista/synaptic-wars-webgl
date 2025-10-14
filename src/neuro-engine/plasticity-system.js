// Advanced Neuroplasticity System
export class PlasticitySystem {
    constructor() {
        this.bdnf = 0.23;
        this.synapticStrength = 1.0;
        this.neurogenesisRate = 0.01;
        this.myelinGrowth = 0.005;
    }

    update(deltaTime, focusLevel = 1.0) {
        // Real-time neuroplasticity simulation
        this.bdnf += this.neurogenesisRate * deltaTime * focusLevel;
        this.synapticStrength += this.myelinGrowth * deltaTime * (this.bdnf / 0.5);
        
        this.bdnf = Math.min(this.bdnf, 1.0);
        this.synapticStrength = Math.min(this.synapticStrength, 2.0);
        
        return { 
            bdnf: this.bdnf, 
            strength: this.synapticStrength,
            neurogenesisRate: this.neurogenesisRate
        };
    }

    reward(amount, focusMultiplier = 1.0) {
        this.bdnf += amount * focusMultiplier;
        this.synapticStrength += amount * 0.5 * focusMultiplier;
        
        // Ensure values stay within bounds
        this.bdnf = Math.max(0, Math.min(1.0, this.bdnf));
        this.synapticStrength = Math.max(0.5, Math.min(2.0, this.synapticStrength));
        
        return this.getCurrentState();
    }

    getCurrentState() {
        return {
            bdnf: this.bdnf,
            strength: this.synapticStrength,
            neurogenesisRate: this.neurogenesisRate
        };
    }

    applyStress(stressFactor) {
        // Stress reduces BDNF production
        this.neurogenesisRate = Math.max(0.001, 0.01 - (stressFactor * 0.005));
        this.bdnf = Math.max(0.1, this.bdnf - (stressFactor * 0.1));
    }
}

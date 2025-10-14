// Neuroscience-inspired Math Utilities
export class NeuroMath {
    static sigmoid(x) {
        // Sigmoid function for neural activation
        return 1 / (1 + Math.exp(-x));
    }

    static relu(x) {
        // ReLU activation function
        return Math.max(0, x);
    }

    static normalizeBrainwave(data) {
        // Normalize EEG brainwave data (0-1 range)
        const max = Math.max(...data);
        const min = Math.min(...data);
        return data.map(value => (value - min) / (max - min || 1));
    }

    static calculateFocusScore(alpha, beta, theta) {
        // Calculate focus score from brainwave ratios
        // Higher beta/alpha ratio indicates focus
        const focusRatio = beta / (alpha + 0.001);
        const relaxationRatio = alpha / (theta + 0.001);
        
        return NeuroMath.sigmoid(focusRatio - relaxationRatio);
    }

    static neuroplasticityGrowth(currentBDNF, learningRate, stressFactor = 1.0) {
        // Simulate neuroplasticity growth using logistic function
        const maxBDNF = 1.0;
        const growthRate = 0.1 * learningRate * stressFactor;
        return currentBDNF + growthRate * (maxBDNF - currentBDNF) * currentBDNF;
    }

    static goldenRatio(iteration) {
        // Generate golden ratio based values for sacred geometry
        const phi = (1 + Math.sqrt(5)) / 2;
        return Math.pow(phi, iteration) / Math.sqrt(5);
    }

    static fractalNoise(x, y, z, octaves = 4) {
        // Generate fractal noise for neural texture effects
        let value = 0;
        let amplitude = 1;
        let frequency = 1;
        
        for (let i = 0; i < octaves; i++) {
            value += amplitude * Math.sin(frequency * x + Math.sin(frequency * y + Math.sin(frequency * z)));
            amplitude *= 0.5;
            frequency *= 2;
        }
        
        return value;
    }
}

import { describe, it, expect } from 'vitest';
import { NeuroMath } from './neuro-math';

describe('NeuroMath', () => {
    describe('sigmoid', () => {
        it('should return 0.5 for an input of 0', () => {
            expect(NeuroMath.sigmoid(0)).toBe(0.5);
        });

        it('should approach 1 for large positive inputs', () => {
            expect(NeuroMath.sigmoid(100)).toBeCloseTo(1);
        });

        it('should approach 0 for large negative inputs', () => {
            expect(NeuroMath.sigmoid(-100)).toBeCloseTo(0);
        });
    });

    describe('relu', () => {
        it('should return the input for positive numbers', () => {
            expect(NeuroMath.relu(5)).toBe(5);
        });

        it('should return 0 for negative numbers', () => {
            expect(NeuroMath.relu(-5)).toBe(0);
        });

        it('should return 0 for an input of 0', () => {
            expect(NeuroMath.relu(0)).toBe(0);
        });
    });

    describe('normalizeBrainwave', () => {
        it('should normalize an array of numbers to the 0-1 range', () => {
            const data = [10, 20, 30, 40, 50];
            const normalized = NeuroMath.normalizeBrainwave(data);
            expect(Math.min(...normalized)).toBe(0);
            expect(Math.max(...normalized)).toBe(1);
        });

        it('should handle an array with all the same values', () => {
            const data = [5, 5, 5, 5];
            const normalized = NeuroMath.normalizeBrainwave(data);
            normalized.forEach(value => expect(value).toBe(0));
        });

        it('should handle an empty array', () => {
            const data = [];
            const normalized = NeuroMath.normalizeBrainwave(data);
            expect(normalized).toEqual([]);
        });
    });

    describe('calculateFocusScore', () => {
        it('should return a focus score based on brainwave ratios', () => {
            const alpha = 10;
            const beta = 20;
            const theta = 5;
            const score = NeuroMath.calculateFocusScore(alpha, beta, theta);
            // Expected value is based on the formula, re-calculated
            expect(score).toBeCloseTo(0.50005);
        });

        it('should avoid division by zero', () => {
            const alpha = 0;
            const beta = 20;
            const theta = 0;
            const score = NeuroMath.calculateFocusScore(alpha, beta, theta);
            expect(score).not.toBeNaN();
        });
    });

    describe('neuroplasticityGrowth', () => {
        it('should calculate neuroplasticity growth', () => {
            const currentBDNF = 0.5;
            const learningRate = 0.5;
            const stressFactor = 1.0;
            const growth = NeuroMath.neuroplasticityGrowth(currentBDNF, learningRate, stressFactor);
            // Expected value is based on the formula, pre-calculated
            expect(growth).toBeCloseTo(0.5125);
        });
    });

    describe('goldenRatio', () => {
        it('should generate golden ratio based values', () => {
            expect(NeuroMath.goldenRatio(1)).toBeCloseTo(0.7236);
            expect(NeuroMath.goldenRatio(2)).toBeCloseTo(1.1708);
            expect(NeuroMath.goldenRatio(3)).toBeCloseTo(1.8944);
        });
    });

    describe('fractalNoise', () => {
        it('should generate fractal noise values', () => {
            const noise = NeuroMath.fractalNoise(0.1, 0.2, 0.3);
            expect(noise).toBeCloseTo(1.3415);
        });
    });
});

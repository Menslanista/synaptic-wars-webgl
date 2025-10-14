// Neuro Metrics Tracking
export class NeuroMetrics {
    constructor() {
        this.metrics = {
            cognitivePerformance: 0.5,
            attentionSpan: 0.5,
            memoryRecall: 0.5,
            processingSpeed: 0.5,
            sessionTime: 0,
            score: 0,
            abilitiesUsed: 0
        };
        
        this.sessionStartTime = Date.now();
    }

    update(plasticityData, eegData) {
        const sessionTime = (Date.now() - this.sessionStartTime) / 1000;
        
        this.metrics = {
            cognitivePerformance: plasticityData.bdnf,
            attentionSpan: eegData.focusLevel,
            memoryRecall: plasticityData.strength * 0.7,
            processingSpeed: plasticityData.strength * 0.6,
            sessionTime: sessionTime,
            score: this.metrics.score,
            abilitiesUsed: this.metrics.abilitiesUsed
        };
        
        return this.metrics;
    }

    recordAbilityUse() {
        this.metrics.abilitiesUsed++;
        this.metrics.score += 10;
    }

    exportResearchData() {
        return {
            timestamp: new Date().toISOString(),
            metrics: this.metrics
        };
    }

    getSessionSummary() {
        const sessionDuration = (Date.now() - this.sessionStartTime) / 1000;
        return {
            duration: sessionDuration,
            finalScore: this.metrics.score,
            abilitiesUsed: this.metrics.abilitiesUsed,
            avgCognitivePerformance: this.metrics.cognitivePerformance,
            avgAttentionSpan: this.metrics.attentionSpan
        };
    }
}

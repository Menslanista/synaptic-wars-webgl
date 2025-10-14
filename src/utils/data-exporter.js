// Research Data Export Utilities
export class DataExporter {
    static exportNeuroplasticityData(plasticityData, eegData, gameMetrics) {
        const exportData = {
            timestamp: new Date().toISOString(),
            session: {
                duration: gameMetrics.sessionTime || 0,
                score: gameMetrics.score || 0,
                abilitiesUsed: gameMetrics.abilitiesUsed || 0
            },
            neuroplasticity: {
                bdnf: plasticityData.bdnf,
                synapticStrength: plasticityData.strength,
                neurogenesisRate: plasticityData.neurogenesisRate || 0.01
            },
            eeg: {
                focusLevel: eegData.focusLevel,
                alphaWaves: eegData.alpha || 0,
                betaWaves: eegData.beta || 0,
                thetaWaves: eegData.theta || 0
            },
            cognitive: {
                performance: gameMetrics.cognitivePerformance || 0,
                attention: gameMetrics.attentionSpan || 0,
                memory: gameMetrics.memoryRecall || 0,
                processing: gameMetrics.processingSpeed || 0
            }
        };

        return exportData;
    }

    static toCSV(dataArray) {
        if (!dataArray.length) return '';
        
        const headers = Object.keys(dataArray[0]).join(',');
        const rows = dataArray.map(data => 
            Object.values(data).map(value => 
                typeof value === 'object' ? JSON.stringify(value) : value
            ).join(',')
        );
        
        return [headers, ...rows].join('\\n');
    }

    static toJSON(data) {
        return JSON.stringify(data, null, 2);
    }

    static downloadFile(content, filename, mimeType = 'application/json') {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    static exportSessionReport(sessionData) {
        const csvData = this.toCSV([sessionData]);
        this.downloadFile(csvData, `synaptic-wars-session-${Date.now()}.csv`, 'text/csv');
    }

    static exportResearchData(researchData, format = 'json') {
        let content, filename, mimeType;
        
        if (format === 'csv') {
            content = this.toCSV(researchData);
            filename = `neuro-research-${Date.now()}.csv`;
            mimeType = 'text/csv';
        } else {
            content = this.toJSON(researchData);
            filename = `neuro-research-${Date.now()}.json`;
            mimeType = 'application/json';
        }
        
        this.downloadFile(content, filename, mimeType);
    }
}

// EEG Connection Interface
export class EEGConnection {
    constructor() {
        this.connectionStatus = 'disconnected';
        this.createConnectionDialog();
    }

    createConnectionDialog() {
        const dialogHTML = `
            <div id="eeg-connection" style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0,0,0,0.9);
                color: white;
                padding: 30px;
                border-radius: 15px;
                border: 2px solid #8A2BE2;
                text-align: center;
                z-index: 1002;
                min-width: 300px;
            ">
                <h3 style="margin: 0 0 20px 0; color: #8A2BE2;">🎧 Connect EEG Headset</h3>
                <div id="eeg-status" style="margin: 10px 0; padding: 10px; background: #333; border-radius: 5px;">
                    Status: ${this.connectionStatus}
                </div>
                <div style="margin: 20px 0;">
                    <button onclick="connectMuse()" style="
                        background: #8A2BE2;
                        color: white;
                        border: none;
                        padding: 12px 20px;
                        border-radius: 8px;
                        margin: 5px;
                        cursor: pointer;
                        font-size: 14px;
                    ">🔗 Connect Muse Headset</button>
                    <button onclick="useSimulatedEEG()" style="
                        background: #00BFFF;
                        color: white;
                        border: none;
                        padding: 12px 20px;
                        border-radius: 8px;
                        margin: 5px;
                        cursor: pointer;
                        font-size: 14px;
                    ">🎮 Use Simulated Data</button>
                </div>
                <button onclick="closeEEGDialog()" style="
                    background: #666;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 5px;
                    cursor: pointer;
                ">Close</button>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', dialogHTML);
    }

    updateStatus(status) {
        this.connectionStatus = status;
        const statusElement = document.getElementById('eeg-status');
        if (statusElement) {
            statusElement.textContent = `Status: ${status}`;
            statusElement.style.background = status === 'connected' ? '#1dd1a1' : 
                                           status === 'connecting' ? '#feca57' : '#333';
        }
    }

    show() {
        const dialog = document.getElementById('eeg-connection');
        if (dialog) {
            dialog.style.display = 'block';
        }
    }

    hide() {
        const dialog = document.getElementById('eeg-connection');
        if (dialog) {
            dialog.style.display = 'none';
        }
    }
}

// Global functions for UI
window.useSimulatedEEG = () => {
    if (window.game && window.game.eegIntegration) {
        window.game.eegIntegration.useSimulatedData();
        const connection = document.querySelector('#eeg-connection');
        if (connection) connection.style.display = 'none';
    }
};

window.closeEEGDialog = () => {
    const dialog = document.getElementById('eeg-connection');
    if (dialog) {
        dialog.style.display = 'none';
    }
};

// Show EEG connection dialog on page load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const dialog = document.getElementById('eeg-connection');
        if (dialog) {
            dialog.style.display = 'block';
        }
    }, 1000);
});

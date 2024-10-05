import { EventName } from '../types/events.js';
import { LogSeverity } from '../types/manager.js';
import { NodeName } from '../types/nodes.js';
import { getApiRoutes, getLFManager } from '../utils/common.js';
const NAME = NodeName.notify;
export const notifyFactory = {
    eventHandler: (event) => {
        const name = EventName.notify;
        getLFManager().log(`Event '${name}' received`, { event }, LogSeverity.Info);
        const payload = event.detail; // The message to display in the notification is payload.message
        const node = getApiRoutes().getNodeById(payload.id);
        if (node) {
            // Request notification permission if not granted yet
            if (Notification.permission !== 'granted') {
                Notification.requestPermission().then(function (permission) {
                    if (permission === 'granted') {
                        // Once permission is granted, show the notification
                        showNotification(payload.message || 'Workflow complete!');
                    }
                    else {
                        getLFManager().log('Notification permission denied.', {}, LogSeverity.Warning);
                    }
                });
            }
            else {
                // Show notification directly if permission was already granted
                showNotification(payload.message || 'Workflow complete!');
            }
        }
    },
    register: () => {
        const extension = {
            name: 'LFExt_' + NAME,
        };
        getApiRoutes().register(extension);
    },
};
// Function to show the browser notification
function showNotification(message) {
    if (Notification.permission === 'granted') {
        new Notification('ComfyUI - LF Nodes', {
            body: message,
        });
    }
}

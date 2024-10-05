import { EventName } from '../types/events.js';
import { LogSeverity } from '../types/manager.js';
import { NodeName } from '../types/nodes.js';
import { getApiRoutes, getLFManager } from '../utils/common.js';
const NAME = NodeName.notify;
export const notifyFactory = {
    eventHandler: (event) => {
        const name = EventName.notify;
        getLFManager().log(`Event '${name}' received`, { event }, LogSeverity.Info);
        const payload = event.detail;
        const node = getApiRoutes().getNodeById(payload.id);
        if (node) {
            if (Notification.permission !== 'granted') {
                Notification.requestPermission().then(function (permission) {
                    if (permission === 'granted') {
                        showNotification(payload);
                    }
                    else {
                        getLFManager().log('Notification permission denied.', {}, LogSeverity.Warning);
                    }
                });
            }
            else {
                showNotification(payload);
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
function showNotification(payload) {
    const { action, image, message, silent, title } = payload;
    const options = {
        body: message,
        requireInteraction: action === 'none' ? false : true,
        silent,
    };
    if ('image' in Notification.prototype && image) {
        options.image = image;
    }
    if (Notification.permission === 'granted') {
        const notification = new Notification(title, options);
        notification.addEventListener('click', function () {
            switch (action) {
                case 'focus tab':
                    window.focus();
                    break;
                case 'queue prompt':
                    getLFManager().getApiRoutes().queuePrompt();
                    getLFManager().log('New prompt queued from notification.', {}, LogSeverity.Success);
                    break;
                default:
                    break;
            }
        });
    }
}

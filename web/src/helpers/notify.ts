import { NotifyPayload } from '../types/events';
import { LogSeverity } from '../types/manager/manager';
import { getLFManager } from '../utils/common';

export const showNotification = (payload: NotifyPayload) => {
  if (Notification.permission !== 'granted') {
    Notification.requestPermission().then(function (permission) {
      if (permission === 'granted') {
        decorateNotification(payload);
      } else {
        getLFManager().log('Notification permission denied.', {}, LogSeverity.Warning);
      }
    });
  } else {
    decorateNotification(payload);
  }
};

export const decorateNotification = (payload: NotifyPayload) => {
  const { action, image, message, silent, tag, title } = payload;

  const icon =
    action === 'focus tab'
      ? 'visibility'
      : action === 'interrupt'
      ? 'not_interested'
      : action === 'interrupt and queue'
      ? 'refresh'
      : action === 'queue prompt'
      ? 'queue'
      : '';

  const options: NotificationOptions = {
    body: message,
    icon: icon ? window.location.href + `extensions/comfyui-lf/assets/svg/${icon}.svg` : undefined,
    requireInteraction: action === 'none' ? false : true,
    silent,
    tag,
  };

  if ('image' in Notification.prototype && image) {
    options.image = image;
  }

  if (Notification.permission === 'granted') {
    const notification = new Notification(title, options);

    notification.addEventListener('click', function () {
      const routes = getLFManager().getApiRoutes();
      switch (action) {
        case 'focus tab':
          window.focus();
          break;
        case 'interrupt':
          routes.interrupt();
          break;
        case 'interrupt and queue':
          routes.interrupt();
          routes.queuePrompt();
          getLFManager().log(
            'New prompt queued from notification after interrupting.',
            {},
            LogSeverity.Success,
          );
          break;
        case 'queue prompt':
          routes.queuePrompt();
          getLFManager().log('New prompt queued from notification.', {}, LogSeverity.Success);
          break;
      }
    });
  }
};

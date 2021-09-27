import { notifications } from './notifications-store';
import type { Notification } from './notification';
import { generateTimestampHash } from '../../../shared/functions/random';

const timeouts: { [key: string]: any } = {};

/**
 * Add notification.
 *
 * @param notification
 */
const addNotification = (notification: Notification): void => {
    notification.id = generateTimestampHash();
    notifications.update(value => [notification, ...value]);

    timeouts[notification.id] = setTimeout(
        removeNotification.bind(undefined, notification.id),
        notification.duration || 5000
    );
};

/**
 * Remove notification.
 *
 * @param notificationId
 */
const removeNotification = (notificationId: string): void => {
    notifications.update(value => {
        const index = value.map(obj => obj.id).indexOf(notificationId);

        if (index !== -1) {
            value.splice(index, 1);
        }

        // Cleanup to avoid memory leaks.
        clearTimeout(timeouts[notificationId]);
        delete timeouts[notificationId];

        return value;
    });
};

export {
    addNotification,
    removeNotification
};

import type { NotificationType } from '../../../shared/components/notification/notification-type';

export interface Notification {
    id?: string;
    type?: NotificationType;
    title?: string;
    message?: string;
    duration?: number;
}

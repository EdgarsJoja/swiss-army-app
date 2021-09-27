import { writable } from 'svelte/store';
import type { Notification } from './notification';

const notificationsArray: Notification[] = [];
export let notifications = writable(notificationsArray);

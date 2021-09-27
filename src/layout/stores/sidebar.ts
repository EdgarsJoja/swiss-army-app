import { writable } from 'svelte/store';

const storageKey = 'layout.sidebar.state';

const storedSidebarState = localStorage.getItem(storageKey);
export let sidebarState = writable(storedSidebarState || 'normal');

sidebarState.subscribe(value => localStorage.setItem(storageKey, value));

import { writable } from 'svelte/store';

const storageKey = 'selected_app';

const storedSelectedApp = localStorage.getItem(storageKey);
export let selectedApp = writable(storedSelectedApp);

selectedApp.subscribe(value => localStorage.setItem(storageKey, value));

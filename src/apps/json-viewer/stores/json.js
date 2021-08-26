import { writable } from 'svelte/store';

const storageKey = 'json_viewer.json';

const storedJson = localStorage.getItem(storageKey);
export let json = writable(storedJson);

json.subscribe(value => localStorage.setItem(storageKey, value));

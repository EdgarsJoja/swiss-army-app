import { writable } from 'svelte/store';

const storageKey = 'notepad.text';

const storedText = localStorage.getItem(storageKey);
export let text = writable(JSON.parse(storedText) || {});

text.subscribe(value => localStorage.setItem(storageKey, JSON.stringify(value)));

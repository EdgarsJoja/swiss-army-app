import { writable } from 'svelte/store';

const storageKey = 'jwt.jwt';

const storedJWT = localStorage.getItem(storageKey) || '';
export let jwt = writable(storedJWT);

jwt.subscribe(value => localStorage.setItem(storageKey, value));

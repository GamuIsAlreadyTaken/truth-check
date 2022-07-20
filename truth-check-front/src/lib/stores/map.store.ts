import { get, writable } from "svelte/store";

export const map = <T>(init: Record<string, T> = {}) => {
  const {
    subscribe,
    update
  } = writable(new Map(Object.entries(init)))
  return {
    subscribe,
    set: ([key, value]: [string, T]) => update(m => m.set(key, value)),
    get: (key: string) => get({ subscribe }).get(key),
    delete: (key: string) => update(m => { m.delete(key); return m }),
    entries: () => get({ subscribe }).entries()
  }
}
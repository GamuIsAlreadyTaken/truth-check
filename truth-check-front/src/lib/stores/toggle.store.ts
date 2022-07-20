
import { writable } from "svelte/store";

export const toggle = (initialState?: boolean) => {
  const {
    subscribe,
    set,
    update
  } = writable(!!initialState)
  return {
    initialState,
    subscribe,
    set,
    open: () => {
      return set(true)
    },
    close: () => {
      return set(false)
    },
    toggle: () => {
      return update(s => !s)
    }
  }
}
export type Toggle = ReturnType<typeof toggle>
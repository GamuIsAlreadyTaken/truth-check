import type { SvelteComponentDev } from "svelte/internal";
import { get, writable } from "svelte/store";
import { map } from "../lib/stores/map.store";

const current = writable<[url, component]>()
const pages = map<component>()

export const pageControl = () => ({
  subscribe: current.subscribe,
  addPage: (page: Page) => {
    pages.set(page)

    if (!get(current)) current.set(page)
  },
  go: ([url, component]: [url, component?], fallback?: url) => {
    const map = get(pages)
    if (component) map.set(url, component)
    if (fallback && !map.has(url)) {
      url = fallback
    }
    return current.set([url, map.get(url)])
  },
  has: (url: url) => get(pages).has(url),
  hook: (url: url)=>(()=>current.set([url, get(pages).get(url)]))
})

type url = string
type component = typeof SvelteComponentDev

type Page = [
  url, component
]


// Add all pages referenced in pages/index to the controls
const control = pageControl()
import * as importedPages from "./";
for (const importedPage of Object.values(importedPages)) {
  control.addPage([
    buildUrlFromImport(importedPage),
    importedPage
  ]);
}
function buildUrlFromImport(importedPage){
  return `/${importedPage.name.match(/<(.+?)>/)[1].toLowerCase()}`
}

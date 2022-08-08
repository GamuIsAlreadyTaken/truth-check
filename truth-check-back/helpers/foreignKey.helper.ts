import type { ResourceStructure } from "../types/resource.types.ts";
import type { ForeignKey } from '../types/types.ts'
import type { AtLeast } from "./type.helper.ts";
/**
 * Gets all ForeignKeys from a resource
 * @param resource from where to get the ForeignKeys
 * @param previous list of ForeignKeys not to be gotten
 * @returns 
 */
export function findForeignKeys({ data }: AtLeast<ResourceStructure, 'data'>, previous: ForeignKey[] = []): ForeignKey[] {
  const foreignKeys: ForeignKey[] = []

  for (const value of Object.values(data)) {
    const valueArray = Array.isArray(value) ? value : [value]
    // Valid if type Value == string | number | boolean | ForeignKey
    foreignKeys.push(...valueArray.filter(v => typeof v === 'object') as ForeignKey[])
  }
  const foreignKeySet = new Set<string>(previous.map(hashKey))
  return foreignKeys.filter(key =>
    !foreignKeySet.has(hashKey(key)) && foreignKeySet.add(hashKey(key))
  )
}
function hashKey(key: ForeignKey) {
  return `${key.foreignId}${key.documentVersion}`
}
import { NAMES } from './data/names'
import type { NamesPersistedState } from './namesStorage'

export const TOP_RATED_DISPLAY_LIMIT = 150

export function defaultNamesState(): NamesPersistedState {
  return { names: [...NAMES], ratings: {}, banned: [] }
}

/** Names eligible for random pick: not banned and not positively rated (> 0). */
export function pickableNames(state: NamesPersistedState): string[] {
  const banned = new Set(state.banned)
  return state.names.filter((n) => {
    if (banned.has(n)) return false
    if (ratingFor(state, n) > 0) return false
    return true
  })
}

export function ratingFor(state: NamesPersistedState, name: string): number {
  return state.ratings[name] ?? 0
}

export function sortLocale(a: string, b: string): number {
  return a.localeCompare(b, undefined, { sensitivity: 'base' })
}

/** Key for the persisted name list and ratings in `localStorage`. */
export const NAMES_STORAGE_KEY = 'simple-name-picker:names'

export type NamesPersistedState = {
  names: string[]
  /** Per-name score; names omitted default to 0 in the UI. */
  ratings: Record<string, number>
  /** Names excluded from random picking. */
  banned: string[]
}

function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === 'object' && x !== null && !Array.isArray(x)
}

/**
 * Read saved names and ratings. Returns `null` if nothing is stored or data is invalid.
 * Supports legacy format: a JSON array of strings (ratings default to {}).
 */
export function loadNamesState(): NamesPersistedState | null {
  if (typeof localStorage === 'undefined') return null
  try {
    const raw = localStorage.getItem(NAMES_STORAGE_KEY)
    if (raw == null) return null

    const parsed: unknown = JSON.parse(raw)

    if (Array.isArray(parsed)) {
      const names = parsed.filter((x): x is string => typeof x === 'string')
      return { names, ratings: {}, banned: [] }
    }

    if (!isRecord(parsed)) return null

    const namesRaw = parsed.names
    const ratingsRaw = parsed.ratings

    if (!Array.isArray(namesRaw)) return null

    const names = namesRaw.filter((x): x is string => typeof x === 'string')

    if (!isRecord(ratingsRaw)) return { names, ratings: {}, banned: [] }

    const ratings: Record<string, number> = {}
    for (const [key, val] of Object.entries(ratingsRaw)) {
      if (typeof val === 'number' && Number.isFinite(val)) ratings[key] = val
    }

    const bannedRaw = parsed.banned
    let banned: string[] = []
    if (Array.isArray(bannedRaw)) {
      banned = bannedRaw.filter((x): x is string => typeof x === 'string')
    }

    return { names, ratings, banned }
  } catch {
    return null
  }
}

/**
 * Persist names and per-name ratings. Drops ratings for names not in the list and omits zero scores.
 */
export function saveNamesState(state: NamesPersistedState): void {
  if (typeof localStorage === 'undefined') return
  const ratings: Record<string, number> = {}
  for (const name of state.names) {
    const v = state.ratings[name]
    if (typeof v === 'number' && v !== 0) ratings[name] = v
  }
  const nameSet = new Set(state.names)
  const banned = [...new Set(state.banned.filter((n) => nameSet.has(n)))]

  const payload: NamesPersistedState = { names: state.names, ratings, banned }
  localStorage.setItem(NAMES_STORAGE_KEY, JSON.stringify(payload))
}

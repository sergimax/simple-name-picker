/** Key for the persisted name list in `localStorage`. */
export const NAMES_STORAGE_KEY = 'simple-name-picker:names'

/**
 * Read the saved name list. Returns `null` if nothing is stored or data is invalid.
 */
export function loadNames(): string[] | null {
  if (typeof localStorage === 'undefined') return null
  try {
    const raw = localStorage.getItem(NAMES_STORAGE_KEY)
    if (raw == null) return null
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return null
    return parsed.filter((x): x is string => typeof x === 'string')
  } catch {
    return null
  }
}

/**
 * Persist the current name list.
 */
export function saveNames(names: string[]): void {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(NAMES_STORAGE_KEY, JSON.stringify(names))
}

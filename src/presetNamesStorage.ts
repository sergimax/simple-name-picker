/** Key for the user-editable preset name list in `localStorage`. */
export const PRESET_NAMES_STORAGE_KEY = 'simple-name-picker:preset-names'

function isStringArray(x: unknown): x is string[] {
  return Array.isArray(x) && x.every((v) => typeof v === 'string')
}

export function loadPresetNames(): string[] | null {
  if (typeof localStorage === 'undefined') return null
  try {
    const raw = localStorage.getItem(PRESET_NAMES_STORAGE_KEY)
    if (raw == null) return null
    const parsed: unknown = JSON.parse(raw)
    if (!isStringArray(parsed)) return null
    const cleaned = normalizeNames(parsed)
    return cleaned.length > 0 ? cleaned : null
  } catch {
    return null
  }
}

export function savePresetNames(names: string[]): void {
  if (typeof localStorage === 'undefined') return
  const cleaned = normalizeNames(names)
  localStorage.setItem(PRESET_NAMES_STORAGE_KEY, JSON.stringify(cleaned))
}

export function presetNamesToText(names: string[]): string {
  return normalizeNames(names).join('\n')
}

/** Parse a freeform text list into a clean, de-duplicated name list (order preserved). */
export function parsePresetNamesText(text: string): string[] {
  const lines = text
    .split(/\r?\n/g)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
  return normalizeNames(lines)
}

function normalizeNames(names: string[]): string[] {
  const out: string[] = []
  const seen = new Set<string>()
  for (const raw of names) {
    const name = raw.trim()
    if (name.length === 0) continue
    if (seen.has(name)) continue
    seen.add(name)
    out.push(name)
  }
  return out
}

/** Key for the user-editable preset name list in `localStorage`. */
export const PRESET_NAMES_STORAGE_KEY = 'simple-name-picker:preset-names'

export type PresetGender = 'female' | 'male'

export type PresetNamesCatalog = {
  female: string[]
  male: string[]
  selected?: PresetGender
}

function isStringArray(x: unknown): x is string[] {
  return Array.isArray(x) && x.every((v) => typeof v === 'string')
}

function isPresetGender(x: unknown): x is PresetGender {
  return x === 'female' || x === 'male'
}

function isPresetNamesCatalog(x: unknown): x is PresetNamesCatalog {
  if (x == null || typeof x !== 'object') return false
  const obj = x as Record<string, unknown>
  if (!isStringArray(obj.female)) return false
  if (!isStringArray(obj.male)) return false
  if (obj.selected !== undefined && !isPresetGender(obj.selected)) return false
  return true
}

export function loadPresetNamesCatalog(): PresetNamesCatalog | null {
  if (typeof localStorage === 'undefined') return null
  try {
    const raw = localStorage.getItem(PRESET_NAMES_STORAGE_KEY)
    if (raw == null) return null
    const parsed: unknown = JSON.parse(raw)
    // Migration: old format was a plain string[]
    if (isStringArray(parsed)) {
      const female = normalizeNames(parsed)
      return {
        female,
        male: [],
        selected: 'female',
      }
    }
    if (!isPresetNamesCatalog(parsed)) return null
    const female = normalizeNames(parsed.female)
    const male = normalizeNames(parsed.male)
    const selected = parsed.selected
    return {
      female,
      male,
      selected: selected && isPresetGender(selected) ? selected : undefined,
    }
  } catch {
    return null
  }
}

export function savePresetNamesCatalog(catalog: PresetNamesCatalog): void {
  if (typeof localStorage === 'undefined') return
  const cleaned: PresetNamesCatalog = {
    female: normalizeNames(catalog.female),
    male: normalizeNames(catalog.male),
    selected: catalog.selected,
  }
  localStorage.setItem(PRESET_NAMES_STORAGE_KEY, JSON.stringify(cleaned))
}

export function loadPresetNames(): string[] | null {
  const catalog = loadPresetNamesCatalog()
  if (!catalog) return null
  const selected: PresetGender = catalog.selected ?? 'female'
  const names = normalizeNames(catalog[selected])
  return names.length > 0 ? names : null
}

export function savePresetNames(names: string[]): void {
  const catalog = loadPresetNamesCatalog()
  const next: PresetNamesCatalog = {
    female: catalog?.female ?? [],
    male: catalog?.male ?? [],
    selected: catalog?.selected ?? 'female',
  }
  next[selectedOrDefault(next)] = normalizeNames(names)
  savePresetNamesCatalog(next)
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

function selectedOrDefault(catalog: PresetNamesCatalog): PresetGender {
  return catalog.selected ?? 'female'
}

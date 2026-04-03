import { useEffect, useMemo, useState } from 'react'
import {
  defaultNamesState,
  pickableNames,
  sortLocale,
  TOP_RATED_DISPLAY_LIMIT,
} from '../namePickerState'
import { loadNamesState, saveNamesState, type NamesPersistedState } from '../namesStorage'

export function usePersistedNamesCatalog() {
  const [state, setState] = useState<NamesPersistedState>(
    () => loadNamesState() ?? defaultNamesState(),
  )

  useEffect(() => {
    saveNamesState(state)
  }, [state])

  const { names, banned, ratings } = state

  const pickable = useMemo(() => pickableNames(state), [state])

  const discardedNames = useMemo(() => {
    const inList = new Set(names)
    return banned.filter((n) => inList.has(n)).sort(sortLocale)
  }, [banned, names])

  const topRatedEntries = useMemo(() => {
    return names
      .map((name) => ({ name, rating: ratings[name] ?? 0 }))
      .filter((row) => row.rating > 0)
      .sort(
        (a, b) => b.rating - a.rating || sortLocale(a.name, b.name),
      )
  }, [names, ratings])

  const topRatedShown = topRatedEntries.slice(0, TOP_RATED_DISPLAY_LIMIT)

  return {
    state,
    setState,
    names,
    banned,
    pickable,
    discardedNames,
    topRatedEntries,
    topRatedShown,
  }
}

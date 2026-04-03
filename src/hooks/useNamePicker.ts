import {
  useCallback,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'
import {
  defaultNamesState,
  pickableNames,
  ratingFor,
} from '../namePickerState'
import type { NamesPersistedState } from '../namesStorage'

type Setter = Dispatch<SetStateAction<NamesPersistedState>>

export function useNamePicker(
  state: NamesPersistedState,
  setState: Setter,
  pickable: string[],
  showStatus: (message: string) => void,
) {
  const { names, banned } = state
  const [picked, setPicked] = useState<string | null>(null)

  const handleReset = useCallback(() => {
    setState(defaultNamesState())
    setPicked(null)
    showStatus('List, ratings, and bans reset to the default catalog.')
  }, [setState, showStatus])

  const handlePick = useCallback(() => {
    if (names.length === 0) {
      showStatus('Your list is empty—add names or reset to default.')
      return
    }
    if (pickable.length === 0) {
      showStatus('Every name is banned—reset the list to clear bans.')
      return
    }
    const i = Math.floor(Math.random() * pickable.length)
    setPicked(pickable[i])
  }, [names.length, pickable, showStatus])

  const bumpRatingAndAdvance = useCallback(
    (delta: number) => {
      if (picked === null) return
      const target = picked
      setState((prev) => {
        const current = ratingFor(prev, target)
        return {
          ...prev,
          ratings: { ...prev.ratings, [target]: current + delta },
        }
      })
      const others = pickable.filter((n) => n !== target)
      if (others.length > 0) {
        setPicked(others[Math.floor(Math.random() * others.length)])
      }
    },
    [picked, pickable, setState],
  )

  const handleLike = useCallback(() => bumpRatingAndAdvance(1), [bumpRatingAndAdvance])
  const handleDislike = useCallback(
    () => bumpRatingAndAdvance(-1),
    [bumpRatingAndAdvance],
  )

  const handleUnban = useCallback(
    (name: string) => {
      setState((prev) => ({
        ...prev,
        banned: prev.banned.filter((n) => n !== name),
      }))
      showStatus(`“${name}” is back in the pick pool.`)
    },
    [setState, showStatus],
  )

  const handleBan = useCallback(() => {
    if (picked === null) return
    const name = picked

    const nextBanned = banned.includes(name) ? banned : [...banned, name]
    const nextState: NamesPersistedState = { ...state, banned: nextBanned }
    setState(nextState)

    const pool = pickableNames(nextState)
    if (pool.length === 0) {
      setPicked(null)
      showStatus(
        `“${name}” is banned. Every name is banned—reset the list to clear bans.`,
      )
      return
    }
    const j = Math.floor(Math.random() * pool.length)
    setPicked(pool[j])
    showStatus(`“${name}” is banned—here’s another name.`)
  }, [banned, picked, setState, showStatus, state])

  const pickedRating = picked !== null ? ratingFor(state, picked) : null

  return {
    picked,
    pickedRating,
    handleReset,
    handlePick,
    handleLike,
    handleDislike,
    handleBan,
    handleUnban,
  }
}

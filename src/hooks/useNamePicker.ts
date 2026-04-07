import {
  useCallback,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'
import {
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
  getResetState: () => NamesPersistedState,
) {
  const { names, banned } = state
  const [picked, setPicked] = useState<string | null>(null)

  const handleReset = useCallback(() => {
    setState(getResetState())
    setPicked(null)
    showStatus('Список, оценки и баны сброшены к пресету.')
  }, [getResetState, setState, showStatus])

  const handlePick = useCallback(() => {
    if (names.length === 0) {
      showStatus('Список пуст — добавьте имена или сбросьте к значениям по умолчанию.')
      return
    }
    if (pickable.length === 0) {
      showStatus(
        'Больше не из чего выбирать — разбаньте часть имён, уберите положительные оценки (список справа) или сделайте сброс.',
      )
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

  const handleAdjustRating = useCallback(
    (target: string, delta: number) => {
      setState((prev) => {
        const current = ratingFor(prev, target)
        return {
          ...prev,
          ratings: { ...prev.ratings, [target]: current + delta },
        }
      })
    },
    [setState],
  )

  const handleResetNameRating = useCallback((target: string) => {
    setState((prev) => {
      const nextRatings = { ...prev.ratings }
      delete nextRatings[target]
      return { ...prev, ratings: nextRatings }
    })
  }, [setState])

  const handleUnban = useCallback(
    (name: string) => {
      setState((prev) => ({
        ...prev,
        banned: prev.banned.filter((n) => n !== name),
      }))
      showStatus(`«${name}» снова доступно для выбора.`)
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
        `«${name}» отправлено в бан. Больше не из чего выбирать — разбаньте имена, понизьте положительные оценки или сделайте сброс.`,
      )
      return
    }
    const j = Math.floor(Math.random() * pool.length)
    setPicked(pool[j])
    showStatus(`«${name}» в бане — вот другое имя.`)
  }, [banned, picked, setState, showStatus, state])

  const pickedRating = picked !== null ? ratingFor(state, picked) : null

  return {
    picked,
    pickedRating,
    handleReset,
    handlePick,
    handleLike,
    handleDislike,
    handleAdjustRating,
    handleResetNameRating,
    handleBan,
    handleUnban,
  }
}

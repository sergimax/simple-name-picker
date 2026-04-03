import { useCallback, useEffect, useMemo, useState } from 'react'
import { NAMES } from './data/names'
import {
  loadNamesState,
  saveNamesState,
  type NamesPersistedState,
} from './namesStorage'
import './App.css'

function defaultState(): NamesPersistedState {
  return { names: [...NAMES], ratings: {}, banned: [] }
}

function pickableNames(state: NamesPersistedState): string[] {
  const banned = new Set(state.banned)
  return state.names.filter((n) => !banned.has(n))
}

function ratingFor(state: NamesPersistedState, name: string): number {
  return state.ratings[name] ?? 0
}

function sortLocale(a: string, b: string): number {
  return a.localeCompare(b, undefined, { sensitivity: 'base' })
}

const TOP_RATED_DISPLAY_LIMIT = 150

function App() {
  const [state, setState] = useState<NamesPersistedState>(
    () => loadNamesState() ?? defaultState(),
  )
  const { names, banned, ratings } = state
  const pickable = pickableNames(state)

  const discardedNames = useMemo(() => {
    const inList = new Set(names)
    return banned.filter((n) => inList.has(n)).sort(sortLocale)
  }, [banned, names])

  const topRatedEntries = useMemo(() => {
    const rows = names
      .map((name) => ({ name, rating: ratings[name] ?? 0 }))
      .filter((row) => row.rating > 0)
      .sort(
        (a, b) => b.rating - a.rating || sortLocale(a.name, b.name),
      )
    return rows
  }, [names, ratings])

  const topRatedShown = topRatedEntries.slice(0, TOP_RATED_DISPLAY_LIMIT)
  const topRatedOverflow = topRatedEntries.length - topRatedShown.length
  const [picked, setPicked] = useState<string | null>(null)
  const [status, setStatus] = useState<string | null>(null)

  useEffect(() => {
    saveNamesState(state)
  }, [state])

  const showStatus = useCallback((message: string) => {
    setStatus(message)
    window.setTimeout(() => setStatus(null), 2500)
  }, [])

  const handleReset = () => {
    const fresh = defaultState()
    setState(fresh)
    setPicked(null)
    showStatus('List, ratings, and bans reset to the default catalog.')
  }

  const handlePick = () => {
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
  }

  const applyRatingDelta = (delta: number) => {
    if (picked === null) return

    setState((prev) => {
      const current = ratingFor(prev, picked)
      const nextRating = current + delta
      return {
        ...prev,
        ratings: { ...prev.ratings, [picked]: nextRating },
      }
    })
  }

  const handleLike = () => applyRatingDelta(1)
  const handleDislike = () => applyRatingDelta(-1)

  const handleUnban = (name: string) => {
    setState((prev) => ({
      ...prev,
      banned: prev.banned.filter((n) => n !== name),
    }))
    showStatus(`“${name}” is back in the pick pool.`)
  }

  const handleBan = () => {
    if (picked === null) return
    const name = picked

    const nextBanned = state.banned.includes(name)
      ? state.banned
      : [...state.banned, name]
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
  }

  const pickedRating = picked !== null ? ratingFor(state, picked) : null

  return (
    <>
      <section id="center" className="picker">
        <header className="picker-header">
          <h1 className="picker-title">Name picker</h1>
          <button
            type="button"
            className="btn btn-reset"
            onClick={handleReset}
            title="Restore the default name list and clear all ratings and bans"
          >
            Reset all
          </button>
        </header>
        <p className="picker-intro">
          <span className="picker-count">{names.length} names</span>
          {banned.length > 0 && (
            <>
              {' '}
              (<span className="picker-banned-count">{banned.length} banned</span>)
            </>
          )}{' '}
          in this list. Your picks, ratings, and bans are saved automatically in
          this browser. Banned names are skipped when picking. Each name has a
          rating (starts at 0).
        </p>

        {picked !== null && (
          <div className="picked" aria-live="polite">
            <div className="picked-label">Result</div>
            <div className="picked-name">{picked}</div>
            <div className="picked-rating" aria-label="Current rating for this name">
              Rating: <span className="picked-rating-value">{pickedRating}</span>
            </div>
            <div className="rating-actions" role="group" aria-label="Rate this name">
              <button type="button" className="btn btn-like" onClick={handleLike}>
                Like
              </button>
              <button
                type="button"
                className="btn btn-dislike"
                onClick={handleDislike}
              >
                Dislike
              </button>
              <button type="button" className="btn btn-ban" onClick={handleBan}>
                Ban
              </button>
            </div>
          </div>
        )}

        {status !== null && (
          <p className="status" role="status">
            {status}
          </p>
        )}

        <div className="picker-actions">
          <button type="button" className="btn btn-primary" onClick={handlePick}>
            Pick a name
          </button>
        </div>

        <div className="lists-panel">
          <section
            className="list-block"
            aria-labelledby="discarded-heading"
          >
            <h2 id="discarded-heading" className="list-block-title">
              Discarded (banned)
            </h2>
            <p className="list-block-hint">
              These names are excluded from random picks. Restore moves a name
              back into the pool.
            </p>
            {discardedNames.length === 0 ? (
              <p className="list-empty">No banned names.</p>
            ) : (
              <ul className="name-list">
                {discardedNames.map((name) => (
                  <li key={name}>
                    <span className="name-list-label">{name}</span>
                    <button
                      type="button"
                      className="btn btn-inline"
                      onClick={() => handleUnban(name)}
                      title="Put this name back into random picks"
                    >
                      Restore
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section
            className="list-block"
            aria-labelledby="top-rated-heading"
          >
            <h2 id="top-rated-heading" className="list-block-title">
              Top rated
            </h2>
            <p className="list-block-hint">
              Names you have liked at least once, highest score first.
            </p>
            {topRatedEntries.length === 0 ? (
              <p className="list-empty">No positive ratings yet.</p>
            ) : (
              <>
                <ul className="name-list">
                  {topRatedShown.map((row) => (
                    <li key={row.name}>
                      <span className="name-list-label">{row.name}</span>
                      <span className="name-list-score" aria-label="Rating">
                        {row.rating}
                      </span>
                    </li>
                  ))}
                </ul>
                {topRatedOverflow > 0 && (
                  <p className="list-overflow" role="status">
                    Showing {topRatedShown.length} of {topRatedEntries.length}{' '}
                    liked names.
                  </p>
                )}
              </>
            )}
          </section>
        </div>
      </section>
    </>
  )
}

export default App

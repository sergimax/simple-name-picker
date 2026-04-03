import { useCallback, useEffect, useState } from 'react'
import { NAMES } from './data/names'
import {
  loadNamesState,
  saveNamesState,
  type NamesPersistedState,
} from './namesStorage'
import './App.css'

function defaultState(): NamesPersistedState {
  return { names: [...NAMES], ratings: {} }
}

function ratingFor(state: NamesPersistedState, name: string): number {
  return state.ratings[name] ?? 0
}

function App() {
  const [state, setState] = useState<NamesPersistedState>(
    () => loadNamesState() ?? defaultState(),
  )
  const { names } = state
  const [picked, setPicked] = useState<string | null>(null)
  const [status, setStatus] = useState<string | null>(null)

  useEffect(() => {
    saveNamesState(state)
  }, [state])

  const showStatus = useCallback((message: string) => {
    setStatus(message)
    window.setTimeout(() => setStatus(null), 2500)
  }, [])

  const handleSave = () => {
    saveNamesState(state)
    showStatus(`Saved ${names.length} names and ratings to this browser.`)
  }

  const handleLoad = () => {
    const stored = loadNamesState()

    if (stored === null) {
      const fresh = defaultState()
      setState(fresh)
      setPicked(null)
      showStatus('No saved data found—restored the default list.')
      return
    }

    setState(stored)
    setPicked(null)
    showStatus(`Loaded ${stored.names.length} names from this browser.`)
  }

  const handleReset = () => {
    const fresh = defaultState()
    setState(fresh)
    setPicked(null)
    showStatus('List and ratings reset to the default catalog.')
  }

  const handlePick = () => {
    if (names.length === 0) {
      showStatus('Your list is empty—add names or reset to default.')
      return
    }
    const i = Math.floor(Math.random() * names.length)
    setPicked(names[i])
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

  const handlePass = () => {
    if (picked === null) return

    saveNamesState(state)
  }

  const pickedRating = picked !== null ? ratingFor(state, picked) : null

  return (
    <>
      <section id="center" className="picker">
        <h1>Name picker</h1>
        <p className="picker-intro">
          <span className="picker-count">{names.length} names</span> in this
          list. Each name has a rating (starts at 0). <b>Save</b> and <b>load</b>{' '}
          keep a copy in your browser; <b>reset</b> restores the default list and
          clears ratings.
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
                Like (+1)
              </button>
              <button type="button" className="btn btn-pass" onClick={handlePass}>
                Pass
              </button>
              <button
                type="button"
                className="btn btn-dislike"
                onClick={handleDislike}
              >
                Dislike (−1)
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
          <div className="btn-group">
            <button type="button" className="btn" onClick={handleSave}>
              Save
            </button>
            <button type="button" className="btn" onClick={handleLoad}>
              Load
            </button>
            <button type="button" className="btn" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default App

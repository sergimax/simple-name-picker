import { useCallback, useState } from 'react'
import { NAMES } from './data/names'
import { loadNames, saveNames } from './namesStorage'
import './App.css'

const defaultNames = (): string[] => [...NAMES]

function App() {
  const [names, setNames] = useState<string[]>(
    () => loadNames() ?? defaultNames(),
  )
  const [picked, setPicked] = useState<string | null>(null)
  const [status, setStatus] = useState<string | null>(null)

  const showStatus = useCallback((message: string) => {
    setStatus(message)
    window.setTimeout(() => setStatus(null), 2500)
  }, [])

  const handleSave = () => {
    saveNames(names)
    showStatus(`Saved ${names.length} names to this browser.`)
  }

  const handleLoad = () => {
    const stored = loadNames()
    if (stored === null) {
      setNames(defaultNames())
      showStatus('No saved list found—restored the default list.')
      return
    }
    setNames(stored)
    showStatus(`Loaded ${stored.length} names from this browser.`)
  }

  const handleReset = () => {
    setNames(defaultNames())
    setPicked(null)
    showStatus('List reset to the default catalog.')
  }

  const handlePick = () => {
    if (names.length === 0) {
      showStatus('Your list is empty—add names or reset to default.')
      return
    }
    const i = Math.floor(Math.random() * names.length)
    setPicked(names[i])
  }

  return (
    <>
      <section id="center" className="picker">
        <h1>Name picker</h1>
        <p className="picker-intro">
          <span className="picker-count">{names.length} names</span> in this
          list. <b>Save</b> and <b>load</b> keep a copy in your browser; <b>reset</b> restores the
          default list.
        </p>

        {picked !== null && (
          <div className="picked" aria-live="polite">
            <div className="picked-label">Result</div>
            <div className="picked-name">{picked}</div>
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

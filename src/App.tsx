import { usePersistedNamesCatalog } from './hooks/usePersistedNamesCatalog'
import { useNamePicker } from './hooks/useNamePicker'
import { useStatusMessage } from './hooks/useStatusMessage'
import './App.css'

function App() {
  const {
    state,
    setState,
    names,
    banned,
    pickable,
    discardedNames,
    topRatedEntries,
    topRatedShown,
    topRatedOverflow,
  } = usePersistedNamesCatalog()

  const { status, showStatus } = useStatusMessage()

  const {
    picked,
    pickedRating,
    handleReset,
    handlePick,
    handleLike,
    handleDislike,
    handleBan,
    handleUnban,
  } = useNamePicker(state, setState, pickable, showStatus)

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

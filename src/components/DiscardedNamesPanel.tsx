type DiscardedNamesPanelProps = {
  names: string[]
  onRestore: (name: string) => void
}

export function DiscardedNamesPanel({ names, onRestore }: DiscardedNamesPanelProps) {
  return (
    <section className="list-block" aria-labelledby="discarded-heading">
      <h2 id="discarded-heading" className="list-block-title">
        Discarded (banned)
      </h2>
      <p className="list-block-hint">
        These names are excluded from random picks. Restore moves a name back
        into the pool.
      </p>
      {names.length === 0 ? (
        <p className="list-empty">No banned names.</p>
      ) : (
        <ul className="name-list">
          {names.map((name) => (
            <li key={name}>
              <span className="name-list-label">{name}</span>
              <button
                type="button"
                className="btn btn-inline"
                onClick={() => onRestore(name)}
                title="Put this name back into random picks"
              >
                Restore
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

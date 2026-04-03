import '../shared/nameLists.css'

type RatedNameRow = { name: string; rating: number }

type TopRatedNamesPanelProps = {
  entries: RatedNameRow[]
  shown: RatedNameRow[]
}

export function TopRatedNamesPanel({ entries, shown }: TopRatedNamesPanelProps) {
  const overflowCount = entries.length - shown.length
  return (
    <section className="list-block" aria-labelledby="top-rated-heading">
      <h2 id="top-rated-heading" className="list-block-title">
        Top rated
      </h2>
      <p className="list-block-hint">
        Names you have liked at least once, highest score first.
      </p>
      {entries.length === 0 ? (
        <p className="list-empty">No positive ratings yet.</p>
      ) : (
        <>
          <ul className="name-list">
            {shown.map((row) => (
              <li key={row.name}>
                <span className="name-list-label">{row.name}</span>
                <span className="name-list-score" aria-label="Rating">
                  {row.rating}
                </span>
              </li>
            ))}
          </ul>
          {overflowCount > 0 && (
            <p className="list-overflow" role="status">
              Showing {shown.length} of {entries.length} liked names.
            </p>
          )}
        </>
      )}
    </section>
  )
}

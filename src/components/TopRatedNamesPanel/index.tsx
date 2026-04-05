import '../shared/buttons.css'
import '../shared/nameLists.css'
import './TopRatedNamesPanel.css'

type RatedNameRow = { name: string; rating: number }

type TopRatedNamesPanelProps = {
  entries: RatedNameRow[]
  shown: RatedNameRow[]
  onAdjustRating: (name: string, delta: number) => void
}

export function TopRatedNamesPanel({
  entries,
  shown,
  onAdjustRating,
}: TopRatedNamesPanelProps) {
  const overflowCount = entries.length - shown.length

  return (
    <section
      className="top-rated-names-panel"
      aria-labelledby="top-rated-heading"
      data-names-panel="top-rated"
    >
      <h2 id="top-rated-heading" className="list-block-title">
        Ratings
      </h2>
      <p className="list-block-hint">
        Non-zero scores (likes and dislikes), highest first. Positive scores are
        skipped when picking.
      </p>
      {entries.length === 0 ? (
        <p className="list-empty">No rated names yet.</p>
      ) : (
        <>
          <ul
            className="name-list"
            aria-label="Rated names, highest score first"
          >
            {shown.map((row) => (
              <li key={row.name}>
                <span className="name-list-label">{row.name}</span>
                <div
                  className="name-list-rating-controls"
                  role="group"
                  aria-label={`Adjust rating for ${row.name}`}
                >
                  <button
                    type="button"
                    className="btn btn-inline btn-rating-minus"
                    onClick={() => onAdjustRating(row.name, -1)}
                    title="Remove one point"
                    aria-label={`Remove one point from ${row.name}`}
                  >
                    −
                  </button>
                  <span
                    className="name-list-score"
                    aria-label={`Rating: ${row.rating}`}
                  >
                    {row.rating}
                  </span>
                  <button
                    type="button"
                    className="btn btn-inline btn-rating-plus"
                    onClick={() => onAdjustRating(row.name, 1)}
                    title="Add one point"
                    aria-label={`Add one point to ${row.name}`}
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {overflowCount > 0 && (
            <p className="list-overflow" role="status">
              Showing {shown.length} of {entries.length} rated names.
            </p>
          )}
        </>
      )}
    </section>
  )
}

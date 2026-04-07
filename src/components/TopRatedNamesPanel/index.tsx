import type { CSSProperties } from 'react'
import '../shared/buttons.css'
import '../shared/nameLists.css'
import './TopRatedNamesPanel.css'

type RatedNameRow = { name: string; rating: number }

type TopRatedNamesPanelProps = {
  entries: RatedNameRow[]
  shown: RatedNameRow[]
  onAdjustRating: (name: string, delta: number) => void
  onResetRating: (name: string) => void
}

export function TopRatedNamesPanel({
  entries,
  shown,
  onAdjustRating,
  onResetRating,
}: TopRatedNamesPanelProps) {
  const overflowCount = entries.length - shown.length
  const minR =
    shown.length > 0 ? Math.min(...shown.map((r) => r.rating)) : 0
  const maxR =
    shown.length > 0 ? Math.max(...shown.map((r) => r.rating)) : 0
  const ratingSpan = maxR - minR

  /** Higher rating → brighter accent tint (0 = dimmest in view, 1 = brightest). */
  function rowBrightnessStyle(rating: number): CSSProperties {
    const t = ratingSpan === 0 ? 0.5 : (rating - minR) / ratingSpan
    return {
      background: `linear-gradient(90deg,
        color-mix(in srgb, var(--bg) 52%, var(--accent) 48%),
        color-mix(in srgb, var(--bg) 96%, var(--text) 4%))`,
      backgroundSize: '320% 100%',
      backgroundPosition: `${(1 - t) * 100}% 0`,
    }
  }

  return (
    <section
      className="top-rated-names-panel"
      aria-labelledby="top-rated-heading"
      data-names-panel="top-rated"
    >
      <h2 id="top-rated-heading" className="list-block-title">
        Добавленные имена
      </h2>
      <p className="list-block-hint">
        Ненулевые оценки (нравится/не нравится), сначала самые высокие.
        Положительные оценки пропускаются при выборе. «Сброс» возвращает оценку к
        0 и убирает имя из этого списка.
      </p>
      {entries.length === 0 ? (
        <p className="list-empty">Пока нет оценённых имён.</p>
      ) : (
        <>
          <ul
            className="name-list"
            aria-label="Оценённые имена, сначала самые высокие"
          >
            {shown.map((row) => (
              <li key={row.name} style={rowBrightnessStyle(row.rating)}>
                <span className="name-list-label">{row.name}</span>
                <div className="name-list-row-tools">
                  <div
                    className="name-list-rating-controls"
                    role="group"
                    aria-label={`Изменить оценку для ${row.name}`}
                  >
                    <button
                      type="button"
                      className="btn btn-inline btn-rating-minus"
                      onClick={() => onAdjustRating(row.name, -1)}
                      title="Убавить на один"
                      aria-label={`Убавить один балл у ${row.name}`}
                    >
                      −
                    </button>
                    <span
                      className="name-list-score"
                      aria-label={`Оценка: ${row.rating}`}
                    >
                      {row.rating}
                    </span>
                    <button
                      type="button"
                      className="btn btn-inline btn-rating-plus"
                      onClick={() => onAdjustRating(row.name, 1)}
                      title="Добавить один"
                      aria-label={`Добавить один балл к ${row.name}`}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="btn btn-inline btn-rating-reset"
                    onClick={() => onResetRating(row.name)}
                    title="Сбросить оценку (к 0) и убрать из списка"
                    aria-label={`Сбросить оценку для ${row.name} до нуля`}
                  >
                    Сброс
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {overflowCount > 0 && (
            <p className="list-overflow" role="status">
              Показано {shown.length} из {entries.length} оценённых имён.
            </p>
          )}
        </>
      )}
    </section>
  )
}

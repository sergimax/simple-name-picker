import '../shared/buttons.css'
import '../shared/nameLists.css'
import './DiscardedNamesPanel.css'

type DiscardedNamesPanelProps = {
  names: string[]
  onRestore: (name: string) => void
}

export function DiscardedNamesPanel({ names, onRestore }: DiscardedNamesPanelProps) {
  return (
    <section
      className="discarded-names-panel"
      aria-labelledby="discarded-heading"
      data-names-panel="discarded"
    >
      <h2 id="discarded-heading" className="list-block-title">
        Отклонены
      </h2>
      <p className="list-block-hint">
        Эти имена исключены из случайного выбора. «Вернуть» возвращает имя обратно
        в пул для выбора.
      </p>
      {names.length === 0 ? (
        <p className="list-empty">Нет имён в бане.</p>
      ) : (
        <ul
          className="name-list"
          aria-label="Имена, исключённые из случайного выбора"
        >
          {names.map((name) => (
            <li key={name}>
              <span className="name-list-label">{name}</span>
              <button
                type="button"
                className="btn btn-inline"
                onClick={() => onRestore(name)}
                title="Вернуть это имя в случайный выбор"
              >
                Вернуть
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

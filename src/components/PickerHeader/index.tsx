import '../shared/buttons.css'
import './PickerHeader.css'

type PickerHeaderProps = {
  onReset: () => void
}

export function PickerHeader({ onReset }: PickerHeaderProps) {
  return (
    <header className="picker-header">
      <h1 className="picker-title">Выбор имени</h1>
      <button
        type="button"
        className="btn btn-reset"
        onClick={onReset}
        title="Восстановить список имён по умолчанию и очистить все оценки и баны"
      >
        Сбросить всё
      </button>
    </header>
  )
}

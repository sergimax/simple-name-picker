import '../shared/buttons.css'
import './PickerHeader.css'
import { PresetNamesDialog } from './PresetNamesDialog'

type PickerHeaderProps = {
  onReset: () => void
  presetNames: string[]
  onUpdatePreset: (nextNames: string[]) => void
}

export function PickerHeader({
  onReset,
  presetNames,
  onUpdatePreset,
}: PickerHeaderProps) {
  return (
    <header className="picker-header">
      <h1 className="picker-title">Выбор имени</h1>
      <div className="picker-header-actions">
        <PresetNamesDialog presetNames={presetNames} onUpdatePreset={onUpdatePreset} />
        <button
          type="button"
          className="btn btn-reset"
          onClick={onReset}
          title="Применить набор имён: сбросить имена, оценки и баны"
        >
          Сбросить набор имён
        </button>
      </div>
    </header>
  )
}

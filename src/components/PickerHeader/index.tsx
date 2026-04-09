import '../shared/buttons.css'
import './PickerHeader.css'
import { PresetNamesDialog } from './PresetNamesDialog'
import type { PresetGender, PresetNamesCatalog } from '../../presetNamesStorage'

type PickerHeaderProps = {
  onReset: () => void
  presetCatalog: PresetNamesCatalog
  onUpdatePreset: (preset: PresetGender, nextNames: string[]) => void
}

export function PickerHeader({
  onReset,
  presetCatalog,
  onUpdatePreset,
}: PickerHeaderProps) {
  return (
    <header className="picker-header">
      <h1 className="picker-title">Выбор имени</h1>
      <div className="picker-header-actions">
        <PresetNamesDialog catalog={presetCatalog} onUpdatePreset={onUpdatePreset} />
        <button
          type="button"
          className="btn"
          onClick={onReset}
          title="Применить исходный набор имён"
        >
          Сбросить
        </button>
      </div>
    </header>
  )
}

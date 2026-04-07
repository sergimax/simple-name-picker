import '../shared/buttons.css'
import './PickerActions.css'

type PickerActionsProps = {
  onPick: () => void
  hasPicked: boolean
}

export function PickerActions({ onPick, hasPicked }: PickerActionsProps) {
  return (
    <div className="picker-actions">
      <button type="button" className="btn btn-primary" onClick={onPick}>
        {hasPicked ? 'Следующее имя' : 'Выбрать имя'}
      </button>
    </div>
  )
}

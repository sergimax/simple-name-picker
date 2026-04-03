type PickerActionsProps = {
  onPick: () => void
}

export function PickerActions({ onPick }: PickerActionsProps) {
  return (
    <div className="picker-actions">
      <button type="button" className="btn btn-primary" onClick={onPick}>
        Pick a name
      </button>
    </div>
  )
}

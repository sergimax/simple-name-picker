type PickerHeaderProps = {
  onReset: () => void
}

export function PickerHeader({ onReset }: PickerHeaderProps) {
  return (
    <header className="picker-header">
      <h1 className="picker-title">Name picker</h1>
      <button
        type="button"
        className="btn btn-reset"
        onClick={onReset}
        title="Restore the default name list and clear all ratings and bans"
      >
        Reset all
      </button>
    </header>
  )
}

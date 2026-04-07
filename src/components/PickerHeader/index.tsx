import '../shared/buttons.css'
import './PickerHeader.css'
import { useId, useMemo, useRef, useState } from 'react'
import {
  parsePresetNamesText,
  presetNamesToText,
} from '../../presetNamesStorage'

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
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const titleId = useId()

  const initialText = useMemo(() => presetNamesToText(presetNames), [presetNames])
  const [draft, setDraft] = useState(initialText)

  const openEditor = () => {
    const dlg = dialogRef.current
    if (!dlg) return
    setDraft(initialText)
    dlg.showModal()
  }

  const closeEditor = () => {
    dialogRef.current?.close()
  }

  const handleSave = () => {
    const next = parsePresetNamesText(draft)
    onUpdatePreset(next)
    closeEditor()
  }

  return (
    <header className="picker-header">
      <h1 className="picker-title">Выбор имени</h1>
      <div className="picker-header-actions">
        <button
          type="button"
          className="btn"
          onClick={openEditor}
          title="Отредактировать пресет (список имён, который применяется при сбросе)"
        >
          Пресет…
        </button>
        <button
          type="button"
          className="btn btn-reset"
          onClick={onReset}
          title="Применить пресет: сбросить имена, оценки и баны"
        >
          Сбросить всё
        </button>
      </div>

      <dialog className="preset-dialog" ref={dialogRef} aria-labelledby={titleId}>
        <form method="dialog" className="preset-dialog__form">
          <h2 id={titleId} className="preset-dialog__title">
            Пресет: список имён
          </h2>
          <p className="preset-dialog__hint">
            Одно имя на строку. Пустые строки и дубликаты будут удалены.
          </p>
          <label className="preset-dialog__label">
            <span className="preset-dialog__label-text">Имена</span>
            <textarea
              className="preset-dialog__textarea"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={12}
              spellCheck={false}
            />
          </label>

          <div className="preset-dialog__actions">
            <button type="button" className="btn" onClick={closeEditor}>
              Отмена
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Сохранить и применить
            </button>
          </div>
        </form>
      </dialog>
    </header>
  )
}

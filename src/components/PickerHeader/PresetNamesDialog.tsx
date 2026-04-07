import { useId, useMemo, useRef, useState } from 'react'
import { parsePresetNamesText, presetNamesToText } from '../../presetNamesStorage'

type PresetNamesDialogProps = {
  presetNames: string[]
  onUpdatePreset: (nextNames: string[]) => void
  triggerClassName?: string
}

export function PresetNamesDialog({
  presetNames,
  onUpdatePreset,
  triggerClassName = 'btn',
}: PresetNamesDialogProps) {
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
    <>
      <button
        type="button"
        className={triggerClassName}
        onClick={openEditor}
        title="Отредактировать список имён"
      >
        Редактировать
      </button>

      <dialog className="preset-dialog" ref={dialogRef} aria-labelledby={titleId}>
        <form method="dialog" className="preset-dialog__form">
          <h2 id={titleId} className="preset-dialog__title">
            Список имён
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
            <button type="button" className="btn" onClick={() => setDraft('')}>
              Очистить
            </button>
            <button type="button" className="btn" onClick={closeEditor}>
              Отмена
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Сохранить и применить
            </button>
          </div>
        </form>
      </dialog>
    </>
  )
}

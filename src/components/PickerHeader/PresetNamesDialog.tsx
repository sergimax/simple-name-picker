import { useId, useRef, useState } from 'react'
import { FEMALE_NAMES, MALE_NAMES } from '../../data/names'
import type { PresetGender, PresetNamesCatalog } from '../../presetNamesStorage'
import { parsePresetNamesText, presetNamesToText } from '../../presetNamesStorage'

type PresetNamesDialogProps = {
  catalog: PresetNamesCatalog
  onUpdatePreset: (preset: PresetGender, nextNames: string[]) => void
  triggerClassName?: string
}

export function PresetNamesDialog({
  catalog,
  onUpdatePreset,
  triggerClassName = 'btn',
}: PresetNamesDialogProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const titleId = useId()

  const [draft, setDraft] = useState(() => {
    const key: PresetGender = catalog.selected ?? 'female'
    return presetNamesToText(catalog[key])
  })
  /** Which preset slot «Сохранить и применить» writes to (set by template buttons or on open). */
  const [saveTarget, setSaveTarget] = useState<PresetGender>(() => catalog.selected ?? 'female')

  const openEditor = () => {
    const dlg = dialogRef.current
    if (!dlg) return
    const key: PresetGender = catalog.selected ?? 'female'
    setSaveTarget(key)
    setDraft(presetNamesToText(catalog[key]))
    dlg.showModal()
  }

  const closeEditor = () => {
    dialogRef.current?.close()
  }

  const fillFromTemplate = (preset: PresetGender) => {
    const names = preset === 'female' ? FEMALE_NAMES : MALE_NAMES
    setSaveTarget(preset)
    setDraft(presetNamesToText([...names]))
  }

  const handleSave = () => {
    const next = parsePresetNamesText(draft)
    onUpdatePreset(saveTarget, next)
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
            Одно имя на строку. Пустые строки и дубликаты будут удалены. Кнопки ниже подставляют
            встроенные списки из приложения. «Сохранить и применить» записывает текст в{' '}
            {saveTarget === 'female' ? 'женский' : 'мужской'} набор и включает его в работе.
          </p>

          <div className="preset-dialog__fill-row" role="group" aria-label="Подставить шаблон">
            <button
              type="button"
              className="btn"
              onClick={() => fillFromTemplate('female')}
            >
              Вставить женские (шаблон)
            </button>
            <button type="button" className="btn" onClick={() => fillFromTemplate('male')}>
              Вставить мужские (шаблон)
            </button>
          </div>

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

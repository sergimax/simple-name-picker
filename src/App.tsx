import { AppFooter } from './components/app-footer/index.tsx'
import { DiscardedNamesPanel } from './components/DiscardedNamesPanel/index.tsx'
import { PickedResult } from './components/PickedResult/index.tsx'
import { PickerActions } from './components/PickerActions/index.tsx'
import { PickerHeader } from './components/PickerHeader/index.tsx'
import { PickerIntro } from './components/PickerIntro/index.tsx'
import { PickerStatus } from './components/PickerStatus/index.tsx'
import { TopRatedNamesPanel } from './components/TopRatedNamesPanel/index.tsx'
import { usePersistedNamesCatalog } from './hooks/usePersistedNamesCatalog'
import { useNamePicker } from './hooks/useNamePicker'
import { useStatusMessage } from './hooks/useStatusMessage'
import { FEMALE_NAMES, MALE_NAMES } from './data/names'
import type { PresetGender, PresetNamesCatalog } from './presetNamesStorage'
import { loadPresetNamesCatalog, savePresetNamesCatalog } from './presetNamesStorage'
import './App.css'
import { useEffect, useMemo, useState } from 'react'

function App() {
  const {
    state,
    setState,
    names,
    pickable,
    discardedNames,
    topRatedEntries,
    topRatedShown,
  } = usePersistedNamesCatalog()

  const { status, showStatus } = useStatusMessage()

  const [presetCatalog, setPresetCatalog] = useState<PresetNamesCatalog>(() => {
    const stored = loadPresetNamesCatalog()
    if (stored) {
      return {
        female: stored.female.length > 0 ? stored.female : [...FEMALE_NAMES],
        male: stored.male.length > 0 ? stored.male : [...MALE_NAMES],
        selected: stored.selected ?? 'female',
      }
    }
    return {
      female: [...FEMALE_NAMES],
      male: [...MALE_NAMES],
      selected: 'female',
    }
  })

  const selectedPreset: PresetGender = presetCatalog.selected ?? 'female'
  const selectedPresetNames = useMemo(() => {
    return selectedPreset === 'male' ? presetCatalog.male : presetCatalog.female
  }, [presetCatalog.female, presetCatalog.male, selectedPreset])

  useEffect(() => {
    savePresetNamesCatalog(presetCatalog)
  }, [presetCatalog])

  const getResetState = useMemo(() => {
    return () => ({ names: [...selectedPresetNames], ratings: {}, banned: [] })
  }, [selectedPresetNames])

  const {
    picked,
    handleReset,
    handlePick,
    handleLike,
    handleDislike,
    handleBan,
    handleUnban,
    handleAdjustRating,
    handleResetNameRating,
  } = useNamePicker(state, setState, pickable, showStatus, getResetState)

  return (
    <>
      <div className="app-layout">
        <aside className="app-column app-column--discarded">
          <DiscardedNamesPanel names={discardedNames} onRestore={handleUnban} />
        </aside>

        <section id="center" className="picker app-column app-column--main">
          <PickerHeader
            onReset={handleReset}
            presetCatalog={presetCatalog}
            onUpdatePreset={(preset, next) => {
              setPresetCatalog((prev) => ({ ...prev, [preset]: next, selected: preset }))
              setState({ names: [...next], ratings: {}, banned: [] })
              showStatus('Набор имён обновлён и применён (оценки и баны очищены).')
            }}
          />
          <PickerIntro nameCount={names.length} bannedCount={discardedNames.length} />

          {picked !== null && (
            <PickedResult
              name={picked}
              onLike={handleLike}
              onDislike={handleDislike}
              onBan={handleBan}
            />
          )}

          <PickerStatus message={status} />
          <PickerActions onPick={handlePick} hasPicked={picked !== null} />
        </section>

        <aside className="app-column app-column--top-rated">
          <TopRatedNamesPanel
            entries={topRatedEntries}
            shown={topRatedShown}
            onAdjustRating={handleAdjustRating}
            onResetRating={handleResetNameRating}
          />
        </aside>
      </div>
      <AppFooter />
    </>
  )
}

export default App

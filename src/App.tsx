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
import { NAMES } from './data/names'
import { loadPresetNames, savePresetNames } from './presetNamesStorage'
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

  const [presetNames, setPresetNames] = useState<string[]>(
    () => loadPresetNames() ?? [...NAMES],
  )

  useEffect(() => {
    savePresetNames(presetNames)
  }, [presetNames])

  const getResetState = useMemo(() => {
    return () => ({ names: [...presetNames], ratings: {}, banned: [] })
  }, [presetNames])

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
            presetNames={presetNames}
            onUpdatePreset={(next) => {
              setPresetNames(next)
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

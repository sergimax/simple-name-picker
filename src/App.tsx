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
import './App.css'

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

  const {
    picked,
    pickedRating,
    handleReset,
    handlePick,
    handleLike,
    handleDislike,
    handleBan,
    handleUnban,
    handleAdjustRating,
    handleResetNameRating,
  } = useNamePicker(state, setState, pickable, showStatus)

  return (
    <>
      <div className="app-layout">
        <aside className="app-column app-column--discarded">
          <DiscardedNamesPanel names={discardedNames} onRestore={handleUnban} />
        </aside>

        <section id="center" className="picker app-column app-column--main">
          <PickerHeader onReset={handleReset} />
          <PickerIntro nameCount={names.length} bannedCount={discardedNames.length} />

          {picked !== null && (
            <PickedResult
              name={picked}
              rating={pickedRating ?? 0}
              onLike={handleLike}
              onDislike={handleDislike}
              onBan={handleBan}
            />
          )}

          <PickerStatus message={status} />
          <PickerActions onPick={handlePick} />
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
      <footer className="app-footer">
        <span className="app-footer-version">v{__APP_VERSION__}</span>
      </footer>
    </>
  )
}

export default App

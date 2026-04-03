import { DiscardedNamesPanel } from './components/DiscardedNamesPanel'
import { PickedResult } from './components/PickedResult'
import { PickerActions } from './components/PickerActions'
import { PickerHeader } from './components/PickerHeader'
import { PickerIntro } from './components/PickerIntro'
import { PickerStatus } from './components/PickerStatus'
import { TopRatedNamesPanel } from './components/TopRatedNamesPanel'
import { usePersistedNamesCatalog } from './hooks/usePersistedNamesCatalog'
import { useNamePicker } from './hooks/useNamePicker'
import { useStatusMessage } from './hooks/useStatusMessage'
import './App.css'

function App() {
  const {
    state,
    setState,
    names,
    banned,
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
  } = useNamePicker(state, setState, pickable, showStatus)

  return (
    <>
      <section id="center" className="picker">
        <PickerHeader onReset={handleReset} />
        <PickerIntro nameCount={names.length} bannedCount={banned.length} />

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

        <div className="lists-panel">
          <DiscardedNamesPanel names={discardedNames} onRestore={handleUnban} />
          <TopRatedNamesPanel
            entries={topRatedEntries}
            shown={topRatedShown}
          />
        </div>
      </section>
    </>
  )
}

export default App

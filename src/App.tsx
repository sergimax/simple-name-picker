import { DiscardedNamesPanel } from './components/DiscardedNamesPanel/index.tsx'
import { ListsPanel } from './components/ListsPanel/index.tsx'
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
  } = useNamePicker(state, setState, pickable, showStatus)

  return (
    <>
      <section id="center" className="picker">
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

        <ListsPanel>
          <DiscardedNamesPanel names={discardedNames} onRestore={handleUnban} />
          <TopRatedNamesPanel
            entries={topRatedEntries}
            shown={topRatedShown}
          />
        </ListsPanel>
      </section>
    </>
  )
}

export default App

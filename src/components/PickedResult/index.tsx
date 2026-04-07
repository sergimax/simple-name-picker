import '../shared/buttons.css'
import './PickedResult.css'

type PickedResultProps = {
  name: string
  onLike: () => void
  onDislike: () => void
  onBan: () => void
}

export function PickedResult({
  name,
  onLike,
  onDislike,
  onBan,
}: PickedResultProps) {
  return (
    <div className="picked" aria-live="polite">
      <div className="picked-label">Текущий выбор</div>
      <p className="picked-name">{name}</p>
      <div className="rating-actions" role="group" aria-label="Оценить это имя">
        <button type="button" className="btn btn-like" onClick={onLike}>
          Нравится
        </button>
        <button type="button" className="btn btn-dislike" onClick={onDislike}>
          Не нравится
        </button>
        <button type="button" className="btn btn-ban" onClick={onBan}>
          В бан
        </button>
      </div>
    </div>
  )
}

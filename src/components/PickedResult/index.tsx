import '../shared/buttons.css'
import './PickedResult.css'

type PickedResultProps = {
  name: string
  rating: number
  onLike: () => void
  onDislike: () => void
  onBan: () => void
}

export function PickedResult({
  name,
  rating,
  onLike,
  onDislike,
  onBan,
}: PickedResultProps) {
  return (
    <div className="picked" aria-live="polite">
      <div className="picked-label">Current pick</div>
      <p className="picked-name">{name}</p>
      <div className="picked-rating" aria-label="Current rating for this name">
        Rating: <span className="picked-rating-value">{rating}</span>
      </div>
      <div className="rating-actions" role="group" aria-label="Rate this name">
        <button type="button" className="btn btn-like" onClick={onLike}>
          Like
        </button>
        <button type="button" className="btn btn-dislike" onClick={onDislike}>
          Dislike
        </button>
        <button type="button" className="btn btn-ban" onClick={onBan}>
          Ban
        </button>
      </div>
    </div>
  )
}

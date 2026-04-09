import './PickerIntro.css'

type PickerIntroProps = {
  nameCount: number
  bannedCount: number
}

export function PickerIntro({ nameCount, bannedCount }: PickerIntroProps) {
  return (
    <p className="picker-intro">
      <span className="picker-count">{nameCount} имён</span>
      {bannedCount > 0 && (
        <>
          {' '}
          (<span className="picker-banned-count">{bannedCount} в бане</span>)
        </>
      )}{' '}
      в этом списке. Отклоненные и оцененные имена пропускаются.
    </p>
  )
}

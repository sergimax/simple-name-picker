import './PickerIntro.css'

type PickerIntroProps = {
  nameCount: number
  bannedCount: number
}

export function PickerIntro({ nameCount, bannedCount }: PickerIntroProps) {
  return (
    <p className="picker-intro">
      <span className="picker-count">{nameCount} names</span>
      {bannedCount > 0 && (
        <>
          {' '}
          (<span className="picker-banned-count">{bannedCount} banned</span>)
        </>
      )}{' '}
      in this list. Your picks, ratings, and bans are saved automatically in this
      browser. Banned names are skipped when picking. Each name has a rating
      (starts at 0).
    </p>
  )
}

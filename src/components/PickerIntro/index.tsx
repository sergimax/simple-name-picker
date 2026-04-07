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
      в этом списке. Ваши выборы, оценки и баны автоматически сохраняются в этом
      браузере. Имена в бане и имена с положительной оценкой пропускаются при
      выборе. У каждого имени есть оценка (начинается с 0).
    </p>
  )
}

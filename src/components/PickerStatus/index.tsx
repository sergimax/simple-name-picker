import './PickerStatus.css'

type PickerStatusProps = {
  message: string | null
}

export function PickerStatus({ message }: PickerStatusProps) {
  if (message === null) return null

  return (
    <p className="status" role="status">
      {message}
    </p>
  )
}

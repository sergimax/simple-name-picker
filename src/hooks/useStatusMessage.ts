import { useCallback, useEffect, useRef, useState } from 'react'

const DEFAULT_DURATION_MS = 2500

export function useStatusMessage(durationMs = DEFAULT_DURATION_MS) {
  const [status, setStatus] = useState<string | null>(null)
  const timeoutRef = useRef<ReturnType<typeof window.setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current)
    }
  }, [])

  const showStatus = useCallback(
    (message: string) => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current)
      setStatus(message)
      timeoutRef.current = window.setTimeout(() => {
        setStatus(null)
        timeoutRef.current = null
      }, durationMs)
    },
    [durationMs],
  )

  return { status, showStatus }
}

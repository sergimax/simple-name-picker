import type { ReactNode } from 'react'
import './ListsPanel.css'

type ListsPanelProps = {
  children: ReactNode
}

export function ListsPanel({ children }: ListsPanelProps) {
  return <div className="lists-panel">{children}</div>
}

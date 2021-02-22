import { ReactElement, ReactNode } from 'react'

import './Card.css'

export const Card = ({ children }: { children: ReactNode }): ReactElement => {
  return <div className="card">{children}</div>
}

import { ReactElement } from 'react'

import './ErrorMessage.css'

export const ErrorMessage = ({
  message
}: {
  message: string
}): ReactElement => {
  return <div className="error-message">{message}</div>
}

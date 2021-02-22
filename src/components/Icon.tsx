import { ReactElement } from 'react'

import Icon01d from '../assets/01d.svg'
import Icon01n from '../assets/01n.svg'
import Icon02d from '../assets/02d.svg'
import Icon02n from '../assets/02n.svg'
import Icon03d from '../assets/03d.svg'
import Icon03n from '../assets/03n.svg'
import Icon04d from '../assets/04d.svg'
import Icon04n from '../assets/04n.svg'
import Icon09d from '../assets/09d.svg'
import Icon09n from '../assets/09n.svg'
import Icon10d from '../assets/10d.svg'
import Icon10n from '../assets/10n.svg'
import Icon11d from '../assets/11d.svg'
import Icon11n from '../assets/11n.svg'
import Icon13d from '../assets/13d.svg'
import Icon13n from '../assets/13n.svg'
import Icon50d from '../assets/50d.svg'
import Icon50n from '../assets/50n.svg'

const icons = {
  '01d': Icon01d,
  '01n': Icon01n,
  '02d': Icon02d,
  '02n': Icon02n,
  '03d': Icon03d,
  '03n': Icon03n,
  '04d': Icon04d,
  '04n': Icon04n,
  '09d': Icon09d,
  '09n': Icon09n,
  '10d': Icon10d,
  '10n': Icon10n,
  '11d': Icon11d,
  '11n': Icon11n,
  '13d': Icon13d,
  '13n': Icon13n,
  '50d': Icon50d,
  '50n': Icon50n
}

const isIconKeyType = (
  candidate: string | IconKeyType
): candidate is IconKeyType => {
  return candidate in icons
}

type IconKeyType = keyof typeof icons

interface IconProps {
  id: IconKeyType | string
  className?: string
  width?: number
  height?: number
}

export const Icon = ({ id }: IconProps): ReactElement | null => {
  if (!isIconKeyType(id)) return null

  const SelectedIcon = icons[id]
  return <SelectedIcon />
}

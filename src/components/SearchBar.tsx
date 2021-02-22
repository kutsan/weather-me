import { ReactElement, useState } from 'react'

import './SearchBar.css'

interface SearchBarProps {
  onSubmit: (city: string) => void
}

export const SearchBar = ({ onSubmit }: SearchBarProps): ReactElement => {
  const [city, setCity] = useState<string>('')

  return (
    <form
      className="search-bar"
      onSubmit={(event) => {
        event.preventDefault()

        onSubmit(city)
      }}
    >
      <input
        className="search-bar__input"
        onChange={(event) => setCity(event.target.value)}
        name="city"
        type="search"
        placeholder="Search city..."
        aria-label="Search city"
        autoFocus
      />
    </form>
  )
}

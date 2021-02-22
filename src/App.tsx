import { ReactElement, useState } from 'react'

import './App.css'

import { SearchBar } from './components/SearchBar'
import { Card } from './components/Card'
import { Result } from './components/Result'
import { Spinner } from './components/Spinner'
import { ErrorMessage } from './components/ErrorMessage'

import { fetchWeather, WeatherDataType } from './utils/api'

export const App = (): ReactElement => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<WeatherDataType | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (city: string): Promise<void> => {
    setError(null)
    setData(null)

    if (city === '') {
      return
    }

    setLoading(true)

    try {
      const result = await fetchWeather(city)
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  let content: ReactElement | null = null

  if (loading) {
    content = <Spinner />
  } else if (error !== null) {
    content = <ErrorMessage message={error} />
  } else if (data !== null) {
    content = <Result data={data} />
  }

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {content !== null && <Card>{content}</Card>}
    </>
  )
}

import React, { useState } from 'react'

import './App.css'

import SearchBar from './components/SearchBar.jsx'
import WeatherCard from './components/WeatherCard.jsx'

import searchWeather from './utils/api.js'

const App = () => {
	const [data, setData] = useState({
		loading: null,
		error: null,
		weather: null
	})

	const handleSubmit = async (city) => {
		setData({ loading: true })

		try {
			const result = await searchWeather(city)
			setData({ loading: false, ...result })
		} catch (err) {
			setData({ loading: false, ...err })
		}
	}

	return (
		<>
			<SearchBar submit={handleSubmit} />
			<WeatherCard data={data} />
		</>
	)
}

export default App

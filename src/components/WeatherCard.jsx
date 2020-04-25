import React from 'react'
import PropTypes from 'prop-types'

import Icon from './Icon'

import './WeatherCard.css'

const WeatherCard = ({ data: { loading, weather, error } }) => {
	let content = ''

	if (loading) {
		content = <span className='spinner' />
	} else if (error) {
		content = error
	} else if (weather) {
		content = (
			<>
				<div className='weather-card__icon-container'>
					<Icon id={weather.icon} className='weather-card__icon' />
					<div className='weather-card__title'>{weather.title}</div>
					<div className='weather-card__status'>{weather.status}</div>
				</div>

				<div className='weather-card__city-container'>
					<div className='weather-card__temp'>{`${weather.temp}C°`}</div>
					<div className='weather-card__city'>
						{weather.city}, {weather.country}
					</div>
					<div>Humidity: {weather.humidity}</div>
					<div>Wind Speed: {weather.wind_speed}</div>
					<div>Wind Degree: {weather.wind_degree}</div>
					<div>Clouds: {weather.clouds}%</div>
				</div>
			</>
		)
	}

	return content ? <div className='weather-card'>{content}</div> : null
}

WeatherCard.propTypes = {
	data: PropTypes.shape({
		loading: PropTypes.bool,
		weather: PropTypes.object,
		error: PropTypes.string
	})
}

export default WeatherCard

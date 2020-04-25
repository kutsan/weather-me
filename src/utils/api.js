const OWM_API_KEY = '877c6e9a329760249936da831eddc570'

export default async function (city) {
	if (!city) {
		return Promise.reject({
			weather: null,
			error: 'City cannot be blank. You should provide a city name to search.'
		})
	}

	if (typeof city !== 'string') {
		return Promise.reject({
			weather: null,
			error: `Expected 'city' as "string" but received "${typeof city}".`
		})
	}

	const response = await fetch(
		'https://api.openweathermap.org/data/2.5/weather/' +
			`?q=${city.trim()}` +
			`&APPID=${OWM_API_KEY}`
	)

	let data = {}

	if (response.ok) {
		data = await response.json()
	} else {
		return Promise.reject({ weather: null, error: 'Bad request.' })
	}

	try {
		return {
			error: null,
			weather: {
				city: data.name,
				id: data.id,
				title: data.weather[0].main,
				status: data.weather[0].description,
				icon: data.weather[0].icon,
				temp: (data.main.temp - 273.15).toFixed(0),
				pressure: data.main.pressure,
				humidity: data.main.humidity,
				wind_speed: data.wind.speed,
				wind_degree: data.wind.deg,
				clouds: data.clouds.all,
				sunrise: data.sys.sunrise,
				sunset: data.sys.sunset,
				country: data.sys.country
			}
		}
	} catch (err) {
		return Promise.reject({ weather: null, error: 'Given city could not find in database.' })
	}
}

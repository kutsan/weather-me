import qs from 'qs'

import searchWeather from './api.js'

beforeAll(() => {
	const successfulMockup = {
		coord: { lon: 139.76, lat: 35.68 },
		weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }],
		base: 'stations',
		main: {
			temp: 277.85,
			pressure: 1016,
			humidity: 59,
			temp_min: 276.15,
			temp_max: 279.15
		},
		visibility: 16093,
		wind: { speed: 3.1, deg: 340 },
		clouds: { all: 1 },
		dt: 1514811360,
		sys: {
			type: 1,
			id: 7622,
			message: 0.0028,
			country: 'JP',
			sunrise: 1514757045,
			sunset: 1514792313
		},
		id: 1850144,
		name: 'Tokyo',
		cod: 200
	}

	const errorMockup = {
		cod: '404',
		message: 'Nothing to geocode'
	}

	global.fetch = jest.fn((URL) => {
		const { q: city } = qs.parse(URL)
		let mockup = {}

		if (city === 'asdasdas') {
			mockup = errorMockup
		} else {
			mockup = successfulMockup
		}

		return Promise.resolve({
			ok: true,
			json() {
				return mockup
			}
		})
	})
})

test('should resolve data correctly', async () => {
	const result = await searchWeather('tokyo')

	expect(result).toEqual({
		error: null,
		weather: {
			city: 'Tokyo',
			id: 1850144,
			title: 'Clear',
			status: 'clear sky',
			icon: '01n',
			temp: '5',
			pressure: 1016,
			humidity: 59,
			wind_speed: 3.1,
			wind_degree: 340,
			clouds: 1,
			sunrise: 1514757045,
			sunset: 1514792313,
			country: 'JP'
		}
	})
})

test('should reject if city could not find', async () => {
	try {
		await searchWeather('asdasdas')
	} catch (err) {
		expect(err).toEqual({ weather: null, error: 'Given city could not find in database.' })
	}
})

test('should reject if city is not given', async () => {
	try {
		await searchWeather()
	} catch (err) {
		expect(err).toEqual({
			weather: null,
			error: `City cannot be blank. You should provide a city name to search.`
		})
	}
})

test('should reject if city is not string', async () => {
	try {
		await searchWeather(123)
	} catch (err) {
		expect(err).toEqual({
			weather: null,
			error: `Expected 'city' as "string" but received "number".`
		})
	}
})

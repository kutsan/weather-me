import * as qs from 'qs'

import { fetchWeather } from './api'

beforeAll(() => {
  const successfulMockup = {
    coord: { lon: 139.76, lat: 35.68 },
    weather: [
      { id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }
    ],
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
    message: 'city not found'
  }

  global.fetch = jest.fn(
    async (requestInfo: RequestInfo): Promise<Response> => {
      const url =
        typeof requestInfo === 'string' ? requestInfo : requestInfo.url

      const { q: city } = qs.parse(url)
      let mockup = {}

      if (city === 'asdasdas') {
        mockup = errorMockup
      } else {
        mockup = successfulMockup
      }

      return await Promise.resolve({
        ok: true,
        // @ts-expect-error
        json() {
          return mockup
        }
      })
    }
  )
})

test('should resolve data correctly', async () => {
  const result = await fetchWeather('tokyo')

  expect(result).toEqual({
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
  })
})

test('should reject if city could not find', async () => {
  try {
    await fetchWeather('asdasdas')
  } catch (err) {
    expect(err).toEqual(new Error('city not found'))
  }
})

// Well, I know I know, having API keys in client-side is really really bad
// practice but it's pointless to setup and maintain a backend for this simple
// project just to have protected API calls. So, ¯\_(ツ)_/¯.
const OWM_API_KEY = '877c6e9a329760249936da831eddc570'

export interface WeatherDataType {
  city: string
  id: number
  title: string
  status: string
  icon: string
  temp: string
  pressure: number
  humidity: number
  wind_speed: number
  wind_degree: number
  clouds: number
  sunrise: number
  sunset: number
  country: string
}

interface ResponseDataType {
  cod: number
  id: number
  name: string
  main: {
    feels_like: number
    humidity: number
    pressure: number
    temp: number
    temp_max: number
    temp_min: number
  }
  wind: {
    deg: number
    speed: number
  }
  clouds: {
    all: number
  }
  sys: {
    sunrise: number
    sunset: number
    country: string
  }
  weather: Array<{
    description: string
    icon: string
    id: number
    main: string
  }>
}

interface ResponseErrorType {
  cod: string
  message: string
}

const isResponseDataType = (
  candidate: ResponseErrorType | ResponseDataType,
  response: Response
): candidate is ResponseDataType => {
  return response.ok && candidate.cod === 200
}

export const fetchWeather = async (city: string): Promise<WeatherDataType> => {
  const response = await fetch(
    'https://api.openweathermap.org/data/2.5/weather/' +
      `?q=${city.trim()}` +
      `&APPID=${OWM_API_KEY}`
  )

  const data: ResponseDataType | ResponseErrorType = await response.json()

  if (isResponseDataType(data, response)) {
    return {
      id: data.id,
      city: data.name,
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
  } else {
    return await Promise.reject(data)
  }
}

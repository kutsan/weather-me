import { ReactElement } from 'react'

import './Result.css'

import { Icon } from './Icon'
import { WeatherDataType } from '../utils/api'

export const Result = ({ data }: { data: WeatherDataType }): ReactElement => {
  return (
    <>
      <div className="result__icon-container">
        <div className="result__icon">
          <Icon id={data.icon} />
        </div>
        <div className="result__title">{data.title}</div>
        <div className="result__status">{data.status}</div>
      </div>

      <div className="result__city-container">
        <div className="result__temp">{`${data.temp}C°`}</div>
        <div className="result__city">
          {data.city}, {data.country}
        </div>
        <div>Humidity: {data.humidity}</div>
        <div>Wind Speed: {data.wind_speed}</div>
        <div>Wind Degree: {data.wind_degree}</div>
        <div>Clouds: {data.clouds}%</div>
      </div>
    </>
  )
}

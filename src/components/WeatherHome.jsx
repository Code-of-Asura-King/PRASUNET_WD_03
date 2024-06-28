import React, { useContext } from 'react'
import locationlogo from '../assets/icons8-location.gif'
import './WeatherHome.css'

import { counterContext } from '../context/context';

const WeatherHome = () => {

  let weather = useContext(counterContext)
  console.log({weather})
  
  return (

    <>
      {weather && weather.location && weather.current ? (
        <div>
          <div className="logo">
            <div className="header">
              <div className="greeting">WELCOME</div>
              <div className="location">
                <img src={locationlogo} alt="location" width="50px" />
                <p>{weather.location.name},{weather.location.country}</p>
              </div>
            </div>
            <img src={weather.current.condition.icon} alt="logo" height="150px" width="50px" />

          </div>
          <div className="temp">
            <h4>{weather.current.temp_c}°C</h4>
            <p>{weather.current.condition.text} </p>
            <div className="date-time">
              <span className="date">{weather.location.localtime.substring(0,11)}</span>
              <span> . </span>
              <span className="time">{weather.location.localtime.substring(11)}</span>
            </div>
          </div>
        </div>) : (
        <span>Loading...</span>
      )
      }
    </>
  )
}

export default WeatherHome

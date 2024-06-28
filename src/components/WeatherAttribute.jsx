import React, { useState, useEffect, useContext} from 'react'
import sunriselogo from '../assets/sunrise.png'
import sunsetlogo from '../assets/sunset.png'
import thermologo from '../assets/thermo.png'
import barometerlogo from '../assets/barometer.png'
import humiditylogo from '../assets/humidity.png'
import visibilitylogo from '../assets/visibility.png'
import windlogo from '../assets/wind.png'
import uvlogo from '../assets/uv.png'

import './WeatherAttribute.css'
import { counterContext } from '../context/context'


const WeatherAttribute = () => {

    let weather = useContext(counterContext)

    const [error, setError] = useState(null);
    const [sunrise, setsunrise] = useState("")
    const [sunset, setsunset] = useState("")
    const [data, setData] = useState({})
  

    useEffect(() => {
        if (weather && weather.location) {            
            let url = `https://api.sunrisesunset.io/json?lat=${weather.location.lat}&lng=${weather.location.lon}`;
            fetchData(url);           
        }
    }, [weather, setData]);
    console.log(data)

    async function fetchData(url) {
        try {
            const response = await fetch(url);
            const result = await response.text();
            const data = JSON.parse(result);
            setData(data);
            setsunrise(data.results.sunrise);
            setsunset(data.results.sunset);
        } catch (error) {
            setError(error);
        }
    }


    return (
        <>
            <div className="heading">
                <h2>Today's Highlights</h2>
            </div>

            <div className="suntime">
                <div className="sunrise">
                    <img src={sunriselogo} alt="sunrise" width="50px" height="50px" />
                    <div className="text">
                        <span>Sunrise</span>
                        <span><b>{sunrise.substring(0,4)+sunrise.substring(7,10)}</b></span>
                    </div>
                </div>

                <div className="sunset">
                    <img src={sunsetlogo} alt="sunset" width="50px" height="50px" />
                    <div className="text">
                        <span>Sunset</span>
                        <span><b>{sunset.substring(0,4)+sunset.substring(7,10)}</b></span>
                    </div>
                </div>
            </div>

            {weather && weather.current ? (
                <div className="other">

                    <div className="Temperature attribute">
                        <img src={thermologo} alt="therm" width="30px" height="50px" />
                        <div className="text">
                            <span style={{ textAlign: "center" }}>Feels Like</span>
                            <span><b>{Math.floor(weather.current.feelslike_c)}°C</b></span>
                        </div>
                    </div>

                    <div className="wind attribute">
                        <img src={windlogo} alt="wind" width="50px" height="50px" />
                        <div className="text">
                            <span>SSE</span>
                            <span><b>{weather.current.wind_kph}</b></span>
                        </div>
                    </div>

                    <div className="humidity attribute">
                        <img src={humiditylogo} alt="humidity" width="30px" height="50px" />
                        <div className="text">
                            <span>Humidity</span>
                            <span><b>{weather.current.humidity}%</b></span>
                        </div>
                    </div>

                    <div className="UV attribute">
                        <img src={uvlogo} alt="sunrise" width="50px" height="50px" />
                        <div className="text">
                            <span>UV</span>
                            <span><b>{weather.current.uv}</b></span>
                        </div>
                    </div>

                    <div className="visibility attribute">

                        <img src={visibilitylogo} alt="visible" width="50px" height="50px" />
                        <div className="text">
                            <span>Visibility</span>
                            <span><b>{weather.current.vis_km} km</b></span>
                        </div>
                    </div>

                    <div className="pressure attribute">

                        <img src={barometerlogo} alt="pressure" width="70px" height="50px" />
                        <div className="text">
                            <span>Pressure</span>
                            <span><b>{weather.current.pressure_mb}hPa</b></span>

                        </div>
                    </div>

                </div>) : (
                <span>Loading...</span>
            )}

        </>
    )
}

export default WeatherAttribute

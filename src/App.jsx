import React, { useState, useEffect } from 'react'
import WeatherHome from './components/WeatherHome'
import WeatherAttribute from './components/WeatherAttribute'
import searchlogo from './assets/icons8-search-64.png'

import './App.css'

import { counterContext } from './context/context'
import apiKeys from './components/apikeys'
import axios from 'axios';



function App() {

  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState({});


  const search = (city) => { 

    axios
      .get(
        `${apiKeys.base}?key=${apiKeys.key}&q=${city != "[object Object]" ? city : query
        }&aqi=no`
      )
      .then((response) => {
        setWeather(response.data);
        setQuery("");
      })
      .catch(function (error) {
        console.log(error);
        setWeather("");
        setQuery("");
        setError({ message: "Not Found", query: query });
      });
  };

  useEffect(() => {
    search("Kolkata");
  }, []);


  return (
    <>
      <counterContext.Provider value={weather}>
        <div className="card">
          <div className="search">
            <input type="search" name="search" id="searchbox" placeholder="Search city" onChange={(e) => setQuery(e.target.value)} value={query} onKeyDown={(e) => {
              if (e.key === 'Enter') {
                search(query);
              }
            }} />
            <img src={searchlogo} alt="search" width="50px" onClick={search} />
          </div>

          <div className="box">
            <div className="box1">
              <WeatherHome />
            </div>

            <div className="box2">
              <WeatherAttribute />
            </div>
          </div>
          
        </div>
      </counterContext.Provider>
    </>
  )
}

export default App

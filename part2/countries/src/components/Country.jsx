import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const WEATHER_URL = "https://goweather.herokuapp.com/weather";

function Country({ country, handleShowCountry }) {
  const [weather, setWeather] = useState();

  useEffect(() => {
    axios
      .get(`${WEATHER_URL}/${country.capital[0]}`)
      .then((response) => setWeather(response.data));
  }, []);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>

      <h3>languages:</h3>
      <ul>
        {Object.entries(country.languages).map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
      </ul>

      <div>
        <img src={country.flags.png} alt={`${country.name.common} flag`} />
      </div>

      {weather && (
        <>
          <h2>Weather in {country.capital[0]}:</h2>
          <p>temperature: {weather.temperature}</p>
          <p>{weather.description}</p>
          <p>{weather.wind}</p>
        </>
      )}
    </div>
  );
}

export default Country;

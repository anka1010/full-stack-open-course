import { useState, useEffect } from "react";
import axios from "axios";
import Country from "./components/Country";

const BASE_URL = "https://studies.cs.helsinki.fi/restcountries/api/all";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  let filteredCountries = searchQuery
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    axios
      .get(BASE_URL)
      .then((response) => {
        setCountries(response.data);
      })
      .catch((err) => console.log("Countries not found"));
  }, []);

  function handleSearchQuery(e) {
    setSearchQuery(e.target.value);
  }

  function handleShowCountry(countryName) {
    setSearchQuery(countryName);
  }

  return (
    <div>
      <label>
        find countries{" "}
        <input value={searchQuery} onChange={handleSearchQuery} />
      </label>

      <div>
        {filteredCountries.length > 10 && (
          <p>Too many matches, please, specify anither filter</p>
        )}
      </div>
      {filteredCountries.length > 1 &&
        filteredCountries.length <= 10 &&
        filteredCountries.map((country) => (
          <p key={country.flag}>
            {country.name.common}{" "}
            <button onClick={() => handleShowCountry(country.name.common)}>
              show
            </button>
          </p>
        ))}
      {filteredCountries.length === 1 && (
        <Country country={filteredCountries[0]} />
      )}
    </div>
  );
}

export default App;

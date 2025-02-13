import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => setCountries(response.data))
      .catch(error => console.error("Error fetching countries:", error));
  }, []);

  return (
    <div>
      <h1>Country Search</h1>
      <Search query={query} setQuery={setQuery} setSelectedCountry={setSelectedCountry} />
      <Countries countries={countries} query={query} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />
    </div>
  );
};

export default App;

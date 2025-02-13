import { useEffect } from "react";
import CountryDetails from "./CountryDetails";

const Countries = ({ countries, query, selectedCountry, setSelectedCountry }) => {
  const filtered = countries.filter(country =>
    country.name.common.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (filtered.length === 1) {
      setSelectedCountry(filtered[0]);
    } else if (!query.trim()) {
      setSelectedCountry(null);
    }
  }, [filtered, query, setSelectedCountry]);

  if (filtered.length > 10) {
    return <p>Too many matches, please specify further.</p>;
  }

  return (
    <ul>
      {filtered.map(country => (
        <li key={country.cca2}>
          {country.name.common}
          <button onClick={() => setSelectedCountry(country)}>Show</button>
        </li>
      ))}
      {selectedCountry && <CountryDetails country={selectedCountry} />}
    </ul>
  );
};

export default Countries;

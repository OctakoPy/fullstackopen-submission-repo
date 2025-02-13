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
    <>
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(country => (
            <tr key={country.cca2}>
              <td>{country.name.common}</td>
              <td>
                <button onClick={() => setSelectedCountry(country)}>Show</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCountry && <CountryDetails country={selectedCountry} />}
    </>
  );
};

export default Countries;

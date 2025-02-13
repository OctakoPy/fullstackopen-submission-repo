const CountryDetails = ({ country }) => {
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital?.[0]}</p>
        <p>Population: {country.population}</p>
        <p>Languages:</p>
        <ul>
          {Object.values(country.languages).map(lang => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />
      </div>
    );
  };
  
  export default CountryDetails;
  
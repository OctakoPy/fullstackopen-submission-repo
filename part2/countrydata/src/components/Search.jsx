const Search = ({ query, setQuery, setSelectedCountry }) => {
    return (
      <div>
        Search countries: 
        <input 
          value={query} 
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedCountry(null); // Clear selected country on search change
          }} 
        />
      </div>
    );
  };
  
  export default Search;
  
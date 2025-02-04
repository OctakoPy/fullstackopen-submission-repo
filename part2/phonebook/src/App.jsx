import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  // Handle input change
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  // Handle form submission
  const addPerson = (event) => {
    event.preventDefault(); // Prevent page refresh
    setPersons([...persons, { name: newName }]); // Add new person
    setNewName(''); // Reset input field
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      
      {/* Debugging: Show the newName value */}
      <div>debug: {newName}</div> 

      <h2>Numbers</h2>
      <ul>
        {persons.map((person, index) => (
          <li key={index}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;

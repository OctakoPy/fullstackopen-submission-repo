import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040-1234567' }]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  // Handle name input change
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  // Handle number input change
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  // Handle form submission
  const addPerson = (event) => {
    event.preventDefault(); // Prevent page refresh

    // Validation: Check if both fields have input
    if (!newName.trim() || !newNumber.trim()) {
      alert("Both name and number must be filled!");
      return;
    }

    // Check if the name already exists
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    // Add the new person with their number
    setPersons([...persons, { name: newName, number: newNumber }]);

    // Reset the input fields
    setNewName('');
    setNewNumber('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ul>
        {persons.map((person, index) => (
          <li key={index}>{person.name} {person.number}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;

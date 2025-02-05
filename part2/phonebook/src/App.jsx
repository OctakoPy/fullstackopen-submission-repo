import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Handle name input change
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  // Handle number input change
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle form submission
  const addPerson = (event) => {
    event.preventDefault(); // Prevent page refresh

    if (!newName.trim() || !newNumber.trim()) {
      alert("Both name and number must be filled!");
      return;
    }

    if (persons.some((person) => person.name.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons([...persons, { name: newName, number: newNumber, id: persons.length + 1 }]);
    setNewName('');
    setNewNumber('');
  };

  // Filter persons based on search input (case-insensitive)
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      {/* Search input */}
      <div>
        Search: <input value={searchTerm} onChange={handleSearchChange} />
      </div>

      {/* Form for adding new contacts */}
      <form onSubmit={addPerson}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

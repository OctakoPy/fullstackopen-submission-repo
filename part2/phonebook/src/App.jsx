import { useState, useEffect } from "react";
import axios from "axios";
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';  // Import the new Filter component

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState(""); // Add a state for filter text

  // Fetch persons from the server on initial load
  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(response => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    // Prevent duplicate names
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    // Save to server
    axios
      .post("http://localhost:3001/persons", newPerson)
      .then(response => {
        setPersons(persons.concat(response.data)); // Update state with new person
        setNewName(""); // Reset input fields
        setNewNumber("");
      })
      .catch(error => {
        console.error("Failed to save contact:", error);
      });
  };

  const handleDelete = (id) => {
    setPersons(persons.filter((person) => person.id !== id)); // Remove the deleted person from the state
  };

  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase())  // Filter persons based on name
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} setFilter={setFilter} />  {/* Include the filter component */}

      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} onDelete={handleDelete} /> {/* Use the filtered persons */}
    </div>
  );
};

export default App;

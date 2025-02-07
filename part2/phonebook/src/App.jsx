import { useState, useEffect } from "react";
import Phonebook from "./services/Phonebook"; // our service module
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

  // Fetch persons from the server on initial load
  useEffect(() => {
    Phonebook.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000); // Hide after 3 seconds
  };

  const addPerson = (event) => {
    event.preventDefault();
  
    // Check if both fields are provided
    if (!newName.trim() || !newNumber.trim()) {
      alert("Both name and phone number are required.");
      return;
    }
  
    const existingPerson = persons.find(person => person.name === newName);
  
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to the phonebook. Replace the old number with the new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber };
  
        Phonebook.update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => 
              person.id !== existingPerson.id ? person : returnedPerson
            ));
            setNewName("");
            setNewNumber("");
            showNotification(`Updated ${returnedPerson.name}'s number successfully!`);
          })
          .catch(error => {
            console.error("Failed to update contact:", error);
          });
      }
      return;
    }
  
    const newPerson = { name: newName, number: newNumber };
  
    Phonebook.create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        showNotification(`Added ${returnedPerson.name} to the phonebook!`);
      })
      .catch(error => {
        console.error("Failed to save contact:", error);
      });
  };
  

  const handleDelete = (id) => {
    Phonebook.deletePerson(id)
      .then(() => {
        // Use a functional update to ensure the latest state is used.
        setPersons(prevPersons => prevPersons.filter(person => person.id !== id));
      })
      .catch(error => {
        // If the error is a 404, the resource is already gone; update the state anyway.
        if (error.response && error.response.status === 404) {
          setPersons(prevPersons => prevPersons.filter(person => person.id !== id));
        } else {
          console.error("Failed to delete contact:", error);
        }
      });
  };
  

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
  
      <Notification message={notification} />
      <Filter filter={filter} setFilter={setFilter} />

      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} onDelete={handleDelete} />
    </div>
  );
};

export default App;

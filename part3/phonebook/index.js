const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

morgan.token('post-data', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : '';
  });

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'));


let persons = [
  { id: 1, name: "Arto Hellas", number: "040-123456" },
  { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
  { id: 3, name: "Dan Abramov", number: "12-43-234345" },
  { id: 4, name: "Mary Poppendieck", number: "39-23-6423122" }
];

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.post('/api/persons', (req, res) => {
    const { name, number } = req.body;
  
    // Validate request - name and number are required
    if (!name || !number) {
      return res.status(400).json({ error: "Name and number are required" });
    }
  
    // Check if name already exists
    if (persons.some(p => p.name === name)) {
      return res.status(400).json({ error: "Name must be unique" });
    }
  
    // Generate a unique ID
    const id = Math.floor(Math.random() * 1000000);
  
    // Create new person
    const newPerson = { id, name, number };
    persons = [...persons, newPerson];
  
    res.status(201).json(newPerson);
  });
  

app.get('/info', (req, res) => {
  const entryCount = persons.length;
  const requestTime = new Date();

  res.send(`
    <p>Phonebook has info for ${entryCount} people</p>
    <p>${requestTime}</p>
  `);
});

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(p => p.id === id);
  
    if (person) {
      res.json(person);
    } else {
      res.status(404).json({ error: "Person not found" });
    }
  });

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const initialLength = persons.length;

    persons = persons.filter(p => p.id !== id);

    if (persons.length < initialLength) {
        res.status(204).end(); // Successful deletion, no content
    } else {
        res.status(404).json({ error: "Person not found" });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

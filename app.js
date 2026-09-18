require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();


app.use(express.json());
app.use(cors('*'));

let todos = [
    // In-memory Data : Array of todo objects
  { id: 1, task: 'Finish week 4 Slides', completed: false },
  { id: 2, task: 'Learn API Development', completed: true },
  { id: 3, task: 'Deploy API (today)', completed: false }
];

//Get all todos
app.get('/todos', (req, res) => {
  res.status(200).json(todos);
});

//Post a new todo
app.post('/todos', (req, res) => {
  const { task } = req.body;
    if (!task) {
      return res.status(400).json({ error: 'Task is required' });
    }
  const newTodo = { id: todos.length + 1, task, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

//Get a specific todo by ID
app.get('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  res.status(200).json(todo);
});

//Update/ PATCH a specific todo by ID
app.patch('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  Object.assign(todo, req.body);
  res.status(200).json(todo);
});

//Delete a specific todo by ID
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const lengthBeforeDelete = todos.length;
  todos = todos.filter((t) => t.id !== id);
  if (todos.length === lengthBeforeDelete) 
    return res.status(404).json({ error: 'Todo not found' });
  res.status(204).send();
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
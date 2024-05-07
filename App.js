const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory storage for tasks
let tasks = [];

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Routes for CRUD operations
// Create a new task
app.post('/tasks', (req, res) => {
  const { title, description, status } = req.body;
  if (!title || !status) {
    return res.status(400).json({ error: 'Title and status are required' });
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    description: description || '',
    status
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Read all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Update a task
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, description, status } = req.body;

  const taskToUpdate = tasks.find(task => task.id === taskId);
  if (!taskToUpdate) {
    return res.status(404).json({ error: 'Task not found' });
  }

  taskToUpdate.title = title || taskToUpdate.title;
  taskToUpdate.description = description || taskToUpdate.description;
  taskToUpdate.status = status || taskToUpdate.status;

  res.json(taskToUpdate);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);

  tasks = tasks.filter(task => task.id !== taskId);
  res.sendStatus(204);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let tasks = [];

// Get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Add a new task
app.post('/tasks', (req, res) => {
    const task = req.body.task;
    tasks.push(task);
    res.status(201).json({ message: 'Task added', tasks });
});

// Update a task
app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const newTask = req.body.task;
    if (id >= 0 && id < tasks.length) {
        tasks[id] = newTask;
        res.json({ message: 'Task updated', tasks });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id >= 0 && id < tasks.length) {
        tasks.splice(id, 1);
        res.json({ message: 'Task deleted', tasks });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

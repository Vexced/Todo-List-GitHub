const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

router.get('/', async (req, res) => {
  const todos = await Todo.findAll();
  res.json(todos);
});

router.post('/', async (req, res) => {
  const { task } = req.body;
  const newTodo = await Todo.create({ task });
  res.status(201).json(newTodo);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { done } = req.body;
  const todo = await Todo.findByPk(id);
  if (!todo) return res.status(404).json({ message: 'Todo not found' });

  todo.done = done;
  await todo.save();
  res.json(todo);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Todo.destroy({ where: { id } });
  res.status(204).end();
});

module.exports = router;

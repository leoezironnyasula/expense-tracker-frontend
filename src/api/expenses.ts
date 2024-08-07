const express = require('express');
import { Expense } from '../types/Expense';

const router = express.Router();

let expenses: Expense[] = [];

router.get('/', (req, res) => {
  res.json(expenses);
});

router.post('/', (req, res) => {
  const newExpense: Expense = {
    id: expenses.length + 1,
    name: req.body.name,
    amount: req.body.amount,
    date: req.body.date,
  };
  expenses.push(newExpense);
  res.json(newExpense);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  expenses = expenses.filter(expense => expense.id !== id);
  res.status(204).send();
});

module.exports = router;

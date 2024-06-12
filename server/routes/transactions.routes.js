
const express = require('express');
const { addIncome, getIncome, deleteIncome } = require('../controllers/income.controllers');
const { addExpense, getExpense, deleteExpense } = require('../controllers/expense.controller');
const router = express.Router();

router.post('/add-income',addIncome);
router.get('/get-incomes',getIncome)
    .delete('/delete-income/:id',deleteIncome);

router.post('/add-expense',addExpense)
    .get('/get-expenses',getExpense)
    .delete('/delete-expense/:id',deleteExpense)

module.exports = router
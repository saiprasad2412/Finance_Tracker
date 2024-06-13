
const express = require('express');
const { addIncome, getIncome, deleteIncome } = require('../controllers/income.controllers');
const { addExpense, getExpense, deleteExpense } = require('../controllers/expense.controller');
const { JWTverify } = require('../middlewares/auth.middleware');
const router = express.Router();
// router.use(JWTverify)

router.post('/add-income',JWTverify,addIncome);
router.get('/get-incomes',getIncome)
    .delete('/delete-income/:id',deleteIncome);

router.post('/add-expense',addExpense)
    .get('/get-expenses',getExpense)
    .delete('/delete-expense/:id',deleteExpense)

module.exports = router
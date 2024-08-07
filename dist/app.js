"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expensesList = document.getElementById('expenses-list');
    expenseForm.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const date = document.getElementById('date').value;
        const newExpense = { name, amount, date };
        try {
            const response = yield fetch('/api/expenses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newExpense),
            });
            const addedExpense = yield response.json();
            addExpenseToList(addedExpense);
            expenseForm.reset();
        }
        catch (error) {
            console.error('Error adding expense:', error);
        }
    }));
    const fetchExpenses = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield fetch('/api/expenses');
            const expenses = yield response.json();
            expenses.forEach(addExpenseToList);
        }
        catch (error) {
            console.error('Error fetching expenses:', error);
        }
    });
    const addExpenseToList = (expense) => {
        const expenseItem = document.createElement('div');
        expenseItem.innerHTML = `
      <h3>${expense.name}</h3>
      <p>Amount: ${expense.amount}</p>
      <p>Date: ${expense.date}</p>
      <button data-id="${expense.id}">Delete</button>
    `;
        expenseItem.querySelector('button').addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
            const id = e.target.dataset.id;
            try {
                yield fetch(`/api/expenses/${id}`, {
                    method: 'DELETE',
                });
                expensesList.removeChild(expenseItem);
            }
            catch (error) {
                console.error('Error deleting expense:', error);
            }
        }));
        expensesList.appendChild(expenseItem);
    };
    fetchExpenses();
});

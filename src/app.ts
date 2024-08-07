// Assuming there are functions to handle fetching and rendering expenses
async function fetchExpenses() {
  const response = await fetch('/api/expenses');
  const expenses = await response.json();
  return expenses;
}

function renderExpenses(expenses: any[]) {
  const expenseList = document.getElementById('expense-list');
  if (!expenseList) return;

  expenseList.innerHTML = '';
  expenses.forEach(expense => {
    const expenseItem = document.createElement('li');
    expenseItem.textContent = `${expense.name} - $${expense.amount} - ${expense.date}`;
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.dataset.id = expense.id;

    deleteButton.addEventListener('click', async (e) => {
      const target = e.target as HTMLButtonElement;
      if (target && target.dataset) {
        const id = target.dataset.id;
        if (id) {
          try {
            await deleteExpense(id);
            target.parentElement?.remove();
          } catch (error) {
            console.error('Error deleting expense:', error);
          }
        }
      }
    });

    expenseItem.appendChild(deleteButton);
    expenseList.appendChild(expenseItem);
  });
}

async function deleteExpense(id: string) {
  const response = await fetch(`/api/expenses/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Failed to delete expense');
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const expenses = await fetchExpenses();
    renderExpenses(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
  }
});

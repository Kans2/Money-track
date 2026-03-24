// We are updating these dates to the current year/month
export const initialTransactions = [
  // A transaction for "Today" (Will show up in Week, Month, Quarter, Year)
  { id: 1, type: 'expense', amount: 1200, category: 'Food & Dining', description: 'Swiggy Order', date: '2026-03-24', icon: 'utensils' },

  // A transaction for earlier this month (Will show up in Month, Quarter, Year)
  { id: 2, type: 'income', amount: 25000, category: 'Salary', description: 'Monthly Salary', date: '2026-03-10', icon: 'money-bill-wave' },
  { id: 3, type: 'expense', amount: 350, category: 'Transportation', description: 'Uber Ride', date: '2026-03-08', icon: 'car' },

  // A transaction for last month (Will show up in Quarter, Year)
  { id: 4, type: 'expense', amount: 1200, category: 'Shopping', description: 'Amazon Purchase', date: '2026-02-15', icon: 'shopping-bag' },

  // A transaction for earlier this year (Will show up in Quarter, Year)
  { id: 5, type: 'income', amount: 5000, category: 'Freelance', description: 'Project Payment', date: '2026-01-05', icon: 'laptop-code' }
];

export const defaultIncomeCategories = ['Salary', 'Freelance', 'Bonus', 'Other Income'];
export const defaultExpenseCategories = ['Food & Dining', 'Shopping', 'Transportation', 'Utilities', 'Rent', 'Entertainment', 'Other Expense'];


// export const initialTransactions = [
//   { id: 1, type: 'expense', amount: 1200, category: 'Food & Dining', description: 'Swiggy Order', date: '2023-06-15', icon: 'utensils' },
//   { id: 2, type: 'income', amount: 25000, category: 'Salary', description: 'Monthly Salary', date: '2023-06-10', icon: 'money-bill-wave' },
//   { id: 3, type: 'expense', amount: 350, category: 'Transportation', description: 'Uber Ride', date: '2023-06-08', icon: 'car' },
//   { id: 4, type: 'expense', amount: 1200, category: 'Shopping', description: 'Amazon Purchase', date: '2023-06-05', icon: 'shopping-bag' },
//   { id: 5, type: 'income', amount: 5000, category: 'Freelance', description: 'Project Payment', date: '2023-06-01', icon: 'laptop-code' }
// ];

// export const defaultIncomeCategories = ['Salary', 'Freelance', 'Bonus', 'Other Income'];
// export const defaultExpenseCategories = ['Food & Dining', 'Shopping', 'Transportation', 'Utilities', 'Rent', 'Entertainment', 'Other Expense'];
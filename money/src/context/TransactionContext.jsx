import { createContext, useState } from 'react';
import { initialTransactions, defaultIncomeCategories, defaultExpenseCategories } from '../utils/SampleData.js';

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [incomeCategories] = useState(defaultIncomeCategories);
  const [expenseCategories] = useState(defaultExpenseCategories);
  const [filter, setFilter] = useState({
    dateRange: 'all',
    fromDate: '',
    toDate: '',
    type: 'all',
    category: 'all'
  });

  // NEW: State for SMS Parsing Rules
  const [smsRules, setSmsRules] = useState([
    { id: 1, name: 'HDFC Bank', pattern: 'Debit of ₹(.*) from a/c', type: 'expense', category: 'Other Expense' },
    { id: 2, name: 'Salary Credit', pattern: 'Credited.*?₹([0-9,]+)', type: 'income', category: 'Salary' }
  ]);

  const addTransaction = (transaction) => setTransactions(prev => [transaction, ...prev]);
  const addSmsRule = (rule) => setSmsRules(prev => [...prev, rule]);
  const deleteSmsRule = (id) => setSmsRules(prev => prev.filter(r => r.id !== id));

  const filteredTransactions = transactions.filter(t => {
    // 1. Type Filter
    if (filter.type !== 'all' && t.type !== filter.type) return false;

    // 2. Category Filter
    if (filter.category !== 'all' && t.category !== filter.category) return false;

    // 3. Date Range Filter
    if (filter.dateRange && filter.dateRange !== 'all') {
      const tDate = new Date(t.date);
      const today = new Date();
      tDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      if (filter.dateRange === 'today') {
        if (tDate.getTime() !== today.getTime()) return false;
      }
      else if (filter.dateRange === 'week') {
        const weekAgo = new Date(today);
        weekAgo.setDate(today.getDate() - 7);
        if (tDate < weekAgo) return false;
      }
      else if (filter.dateRange === 'month') {
        if (tDate.getMonth() !== today.getMonth() || tDate.getFullYear() !== today.getFullYear()) return false;
      }
      else if (filter.dateRange === 'year') {
        if (tDate.getFullYear() !== today.getFullYear()) return false;
      }
      else if (filter.dateRange === 'custom') {
        if (filter.fromDate && new Date(t.date) < new Date(filter.fromDate)) return false;
        if (filter.toDate && new Date(t.date) > new Date(filter.toDate)) return false;
      }
    }

    return true;
  });

  const income = filteredTransactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const expense = filteredTransactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const balance = income - expense;

  return (
    <TransactionContext.Provider value={{
      transactions, filteredTransactions, addTransaction,
      balance, income, expense,
      incomeCategories, expenseCategories,
      filter, setFilter,
      smsRules, addSmsRule, deleteSmsRule // Export the new state and functions
    }}>
      {children}
    </TransactionContext.Provider>
  );
};
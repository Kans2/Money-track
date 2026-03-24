import { useState, useEffect, useMemo } from 'react';

export const useMoneyTrack = () => {
  const [transactions, setTransactions] = useState(() => 
    JSON.parse(localStorage.getItem('mt_transactions')) || []
  );

  const [rules, setRules] = useState(() => 
    JSON.parse(localStorage.getItem('mt_rules')) || [
      { id: 1, name: 'HDFC Bank', pattern: 'Debit of ₹(.*) from a/c', type: 'Expense', category: 'Shopping' }
    ]
  );

  useEffect(() => {
    localStorage.setItem('mt_transactions', JSON.stringify(transactions));
    localStorage.setItem('mt_rules', JSON.stringify(rules));
  }, [transactions, rules]);

  const totals = useMemo(() => {
    return transactions.reduce((acc, t) => {
      const amt = parseFloat(t.amount) || 0;
      if (t.type.toLowerCase() === 'income') acc.income += amt;
      else acc.expense += amt;
      return acc;
    }, { income: 0, expense: 0 });
  }, [transactions]);

  const addTransaction = (tx) => setTransactions(prev => [tx, ...prev]);
  const deleteTransaction = (id) => setTransactions(prev => prev.filter(t => t.id !== id));
  const addRule = (rule) => setRules(prev => [...prev, rule]);

  return { transactions, rules, totals, addTransaction, deleteTransaction, addRule };
};
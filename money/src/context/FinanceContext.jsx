import { createContext, useContext, useState, useEffect } from "react";

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState({
    income: ["Salary", "Freelance", "Bonus"],
    expense: ["Food & Dining", "Shopping", "Transport"]
  });

  const [filter, setFilter] = useState({
    dateRange: "month",
    type: "all",
    category: "all"
  });

  // Load from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("transactions"));
    if (data) setTransactions(data);
  }, []);

  // Save
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  return (
    <FinanceContext.Provider
      value={{ transactions, setTransactions, categories, setCategories, filter, setFilter }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);
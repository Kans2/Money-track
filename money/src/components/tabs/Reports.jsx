import { useState, useContext, useMemo } from 'react';
import { TransactionContext } from '../../context/TransactionContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend);

export default function ReportsTab() {
  const { filteredTransactions } = useContext(TransactionContext);
  const [timePeriod, setTimePeriod] = useState('Month');

  // --- 1. Filter Transactions by Time Period ---
  const periodTransactions = useMemo(() => {
    const today = new Date();

    return filteredTransactions.filter(t => {
      const tDate = new Date(t.date);

      switch (timePeriod) {
        case 'Week': {
          const oneWeekAgo = new Date(today);
          oneWeekAgo.setDate(today.getDate() - 7);
          return tDate >= oneWeekAgo && tDate <= today;
        }
        case 'Month': {
          return tDate.getMonth() === today.getMonth() && tDate.getFullYear() === today.getFullYear();
        }
        case 'Quarter': {
          const currentQuarter = Math.floor(today.getMonth() / 3);
          const tQuarter = Math.floor(tDate.getMonth() / 3);
          return tQuarter === currentQuarter && tDate.getFullYear() === today.getFullYear();
        }
        case 'Year': {
          return tDate.getFullYear() === today.getFullYear();
        }
        default:
          return true;
      }
    });
  }, [filteredTransactions, timePeriod]);

  // --- 2. Calculations for Summary Cards (Based on Filtered Data) ---
  const periodIncome = periodTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const periodExpense = periodTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const savingsRate = periodIncome > 0 ? (((periodIncome - periodExpense) / periodIncome) * 100).toFixed(1) : 0;

  const biggestExpense = useMemo(() => {
    const expenses = periodTransactions.filter(t => t.type === 'expense');
    if (expenses.length === 0) return null;
    return expenses.reduce((max, current) => (current.amount > max.amount ? current : max));
  }, [periodTransactions]);

  // --- 3. Calculations for Charts ---
  const chartData = useMemo(() => {
    // Labels for the charts (Jan to Dec)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyIncome = Array(12).fill(0);
    const monthlyExpenses = Array(12).fill(0);
    const categoryTotals = {};

    periodTransactions.forEach(t => {
      const date = new Date(t.date);
      const monthIndex = date.getMonth();

      if (t.type === 'income') monthlyIncome[monthIndex] += t.amount;

      if (t.type === 'expense') {
        monthlyExpenses[monthIndex] += t.amount;
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
      }
    });

    return { months, monthlyIncome, monthlyExpenses, categoryTotals };
  }, [periodTransactions]);

  // --- Chart Configurations ---
  const lineChartData = {
    labels: chartData.months,
    datasets: [{
      label: 'Expenses',
      data: chartData.monthlyExpenses,
      borderColor: '#ef4444',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      borderWidth: 2,
      tension: 0.3,
      fill: true
    }]
  };

  const barChartData = {
    labels: chartData.months,
    datasets: [
      {
        label: 'Income',
        data: chartData.monthlyIncome,
        backgroundColor: '#10b981',
        borderRadius: 4
      },
      {
        label: 'Expenses',
        data: chartData.monthlyExpenses,
        backgroundColor: '#ef4444',
        borderRadius: 4
      }
    ]
  };

  const categoryLabels = Object.keys(chartData.categoryTotals);
  const categoryValues = Object.values(chartData.categoryTotals);
  const doughnutChartData = {
    labels: categoryLabels.length > 0 ? categoryLabels : ['No Data'],
    datasets: [{
      data: categoryValues.length > 0 ? categoryValues : [1],
      backgroundColor: categoryValues.length > 0
        ? ['#ef4444', '#3b82f6', '#f59e0b', '#10b981', '#8b5cf6', '#ec4899']
        : ['#e5e7eb'],
      borderWidth: 0
    }]
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true, grid: { display: false } },
      x: { grid: { display: false } }
    }
  };

  // --- Insights Generation ---
  const foodSpending = chartData.categoryTotals['Food & Dining'] || 0;
  const transportSpending = chartData.categoryTotals['Transportation'] || 0;

  return (
    <div className="space-y-4 pb-10">

      {/* Time Period Selector */}
      <div className="bg-white rounded-xl shadow-sm border p-1 flex justify-between items-center">
        {['Week', 'Month', 'Quarter', 'Year'].map(period => (
          <button
            key={period}
            onClick={() => setTimePeriod(period)}
            className={`flex-1 py-1.5 text-sm rounded-lg transition-colors ${timePeriod === period ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 bg-transparent'}`}
          >
            {period}
          </button>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <p className="text-sm text-gray-600">Total Income</p>
          <p className="text-xl font-bold text-green-600">₹{periodIncome.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <p className="text-sm text-gray-600">Total Expenses</p>
          <p className="text-xl font-bold text-red-600">₹{periodExpense.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <p className="text-sm text-gray-600">Savings Rate</p>
          <p className="text-xl font-bold text-indigo-600">{savingsRate}%</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4 overflow-hidden">
          <p className="text-sm text-gray-600">Biggest Expense</p>
          <p className="text-lg font-bold text-gray-800 truncate">{biggestExpense ? biggestExpense.description : 'None'}</p>
          <p className="text-xs text-gray-400 mt-1 truncate">
            {biggestExpense ? `₹${biggestExpense.amount.toLocaleString()} on ${biggestExpense.category}` : 'No expenses found'}
          </p>
        </div>
      </div>

      {/* Expense Trend Chart */}
      <div className="bg-white rounded-xl shadow-sm border p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-gray-800">Expense Trend</h3>
        </div>
        <div className="h-48 relative">
          <Line data={lineChartData} options={{ ...commonOptions, plugins: { legend: { display: false } } }} />
        </div>
      </div>

      {/* Income vs Expenses Chart */}
      <div className="bg-white rounded-xl shadow-sm border p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-gray-800">Income vs Expenses</h3>
        </div>
        <div className="h-48 relative">
          <Bar data={barChartData} options={{ ...commonOptions, plugins: { legend: { position: 'top' } } }} />
        </div>
      </div>

      {/* Expense Categories Breakdown */}
      <div className="bg-white rounded-xl shadow-sm border p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-gray-800">Expense Categories</h3>
        </div>
        <div className="h-48 relative flex justify-center">
          <Doughnut
            data={doughnutChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              cutout: '70%',
              plugins: { legend: { position: 'right', labels: { boxWidth: 12 } } }
            }}
          />
        </div>
      </div>

      {/* Spending Insights Section */}
      <div className="bg-white rounded-xl shadow-sm border p-4">
        <h3 className="font-medium text-gray-800 mb-3">Spending Insights</h3>

        {foodSpending === 0 && transportSpending === 0 ? (
          <div className="bg-gray-50 rounded-xl p-4 text-center text-gray-500 border border-gray-100">
            <i className="fas fa-info-circle text-2xl mb-2 text-gray-400"></i>
            <p className="text-sm">No spending insights available</p>
          </div>
        ) : (
          <div className="space-y-3">
            {foodSpending > 0 && (
              <div className="flex items-start bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                <div className="bg-yellow-100 p-2 rounded-full mr-3 text-yellow-600">
                  <i className="fas fa-utensils"></i>
                </div>
                <div>
                  <p className="font-medium text-sm text-gray-800">Food & Dining</p>
                  <p className="text-xs text-gray-600 mt-0.5">You've spent ₹{foodSpending.toLocaleString()} on food in this period.</p>
                </div>
              </div>
            )}
            {transportSpending > 0 && (
              <div className="flex items-start bg-blue-50 p-3 rounded-lg border border-blue-100">
                <div className="bg-blue-100 p-2 rounded-full mr-3 text-blue-600">
                  <i className="fas fa-car"></i>
                </div>
                <div>
                  <p className="font-medium text-sm text-gray-800">Transportation</p>
                  <p className="text-xs text-gray-600 mt-0.5">Travel expenses are currently at ₹{transportSpending.toLocaleString()}.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
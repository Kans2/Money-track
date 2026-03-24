import { useContext, useMemo } from 'react';
import { TransactionContext } from '../../context/TransactionContext';

export default function CategoriesTab() {
    const { filteredTransactions, incomeCategories, expenseCategories, income, expense } = useContext(TransactionContext);

    // Calculate totals for each individual category
    const categoryTotals = useMemo(() => {
        const totals = {};
        filteredTransactions.forEach(t => {
            totals[t.category] = (totals[t.category] || 0) + t.amount;
        });
        return totals;
    }, [filteredTransactions]);

    return (
        <div className="space-y-4 pb-10">

            {/* Expense Categories Card */}
            <div className="bg-white rounded-xl shadow-sm border p-4">
                <h3 className="font-medium text-gray-800 mb-4">Expense Categories</h3>

                <div className="space-y-4">
                    {expenseCategories.map(category => {
                        const amount = categoryTotals[category] || 0;
                        const percentage = expense > 0 ? ((amount / expense) * 100).toFixed(1) : 0;

                        return (
                            <div key={category}>
                                <div className="flex justify-between items-center mb-1.5">
                                    <span className="text-sm text-gray-700">{category}</span>
                                    <span className="text-sm font-medium text-gray-800">
                                        ₹{amount.toLocaleString()}
                                    </span>
                                </div>
                                {/* Progress Bar */}
                                <div className="w-full bg-gray-100 rounded-full h-1.5">
                                    <div
                                        className="bg-red-500 h-1.5 rounded-full transition-all duration-500 ease-out"
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        );
                    })}

                    {expenseCategories.length === 0 && (
                        <p className="text-sm text-gray-500 text-center py-2">No expense categories found.</p>
                    )}
                </div>
            </div>

            {/* Income Categories Card */}
            <div className="bg-white rounded-xl shadow-sm border p-4">
                <h3 className="font-medium text-gray-800 mb-4">Income Categories</h3>

                <div className="space-y-4">
                    {incomeCategories.map(category => {
                        const amount = categoryTotals[category] || 0;
                        const percentage = income > 0 ? ((amount / income) * 100).toFixed(1) : 0;

                        return (
                            <div key={category}>
                                <div className="flex justify-between items-center mb-1.5">
                                    <span className="text-sm text-gray-700">{category}</span>
                                    <span className="text-sm font-medium text-gray-800">
                                        ₹{amount.toLocaleString()}
                                    </span>
                                </div>
                                {/* Progress Bar */}
                                <div className="w-full bg-gray-100 rounded-full h-1.5">
                                    <div
                                        className="bg-green-400 h-1.5 rounded-full transition-all duration-500 ease-out"
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        );
                    })}

                    {incomeCategories.length === 0 && (
                        <p className="text-sm text-gray-500 text-center py-2">No income categories found.</p>
                    )}
                </div>
            </div>

        </div>
    );
}
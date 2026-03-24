import { useState, useContext } from 'react';
import { TransactionContext } from '../../context/TransactionContext';

export default function AddTransactionModal({ onClose }) {
    const { addTransaction, incomeCategories, expenseCategories } = useContext(TransactionContext);
    const [type, setType] = useState('expense');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const handleSave = () => {
        if (!amount || !category) return;
        addTransaction({
            id: Date.now(),
            type,
            amount: parseFloat(amount),
            category,
            description: description || category,
            date,
            icon: type === 'income' ? 'money-bill' : 'shopping-cart'
        });
        onClose();
    };

    return (

        < div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4 z-50" >
            <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-md p-5 pb-8 sm:pb-5 animate-[slideIn_0.3s_ease-out] shadow-2xl">

                <div className="flex justify-between items-center mb-5 border-b pb-3">
                    <h3 className="font-bold text-lg text-gray-900">Add Transaction</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 sm:hidden"><i className="fas fa-times text-lg"></i></button>
                </div>

                <div className="flex mb-5 bg-gray-100 p-1 rounded-xl">
                    <button onClick={() => setType('income')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${type === 'income' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500'}`}>Income</button>
                    <button onClick={() => setType('expense')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${type === 'expense' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500'}`}>Expense</button>
                </div>

                <div className="space-y-4">
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount (₹)" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-indigo-400 text-gray-800" />

                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-indigo-400 text-gray-800 appearance-none">
                        <option value="">Select Category</option>
                        {(type === 'income' ? incomeCategories : expenseCategories).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>

                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description (Optional)" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-indigo-400 text-gray-800" />

                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-indigo-400 text-gray-800" />
                </div>

                <div className="flex justify-end space-x-3 mt-6 pt-4">
                    <button onClick={onClose} className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition hidden sm:block">Cancel</button>
                    <button onClick={handleSave} className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium shadow-md hover:bg-indigo-700 transition">Save Transaction</button>
                </div>
            </div>
        </div >
    );
}
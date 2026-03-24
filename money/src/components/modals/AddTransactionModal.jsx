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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-md p-4">
                <h3 className="font-medium text-lg mb-4 border-b pb-2">Add Transaction</h3>

                <div className="flex mb-4">
                    <button onClick={() => setType('income')} className={`flex-1 py-2 border rounded-l-lg ${type === 'income' ? 'bg-indigo-600 text-white' : 'bg-white'}`}>Income</button>
                    <button onClick={() => setType('expense')} className={`flex-1 py-2 border rounded-r-lg ${type === 'expense' ? 'bg-indigo-600 text-white' : 'bg-white'}`}>Expense</button>
                </div>

                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" className="w-full p-3 border rounded-lg mb-4" />

                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-3 border rounded-lg mb-4">
                    <option value="">Select Category</option>
                    {(type === 'income' ? incomeCategories : expenseCategories).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>

                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description (Optional)" className="w-full p-3 border rounded-lg mb-4" />
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-3 border rounded-lg mb-4" />

                <div className="flex justify-end space-x-2 border-t pt-4">
                    <button onClick={onClose} className="px-4 py-2 border rounded-lg">Cancel</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Save</button>
                </div>
            </div>
        </div>
    );
}
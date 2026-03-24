import { useState, useContext } from 'react';
import { TransactionContext } from '../../context/TransactionContext';

export default function AddRuleModal({ onClose }) {
    const { addSmsRule, incomeCategories, expenseCategories } = useContext(TransactionContext);

    const [name, setName] = useState('');
    const [pattern, setPattern] = useState('');
    const [type, setType] = useState('expense');
    const [category, setCategory] = useState('');

    const handleSave = () => {
        if (!name || !pattern || !category) return alert("Please fill all fields");

        // Basic regex validation to ensure the user didn't write something that crashes the app
        try {
            new RegExp(pattern);
        } catch (e) {
            return alert("Invalid Regex Pattern");
        }

        addSmsRule({
            id: Date.now(),
            name,
            pattern,
            type,
            category
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-md p-5 animate-[slideIn_0.2s_ease-out]">
                <h3 className="font-medium text-lg mb-4 border-b pb-2">Add SMS Parsing Rule</h3>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-700 mb-1">Rule Name</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. HDFC Bank Debit" className="w-full p-2 border rounded-lg text-sm" />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 mb-1">Pattern (Regex)</label>
                        <input type="text" value={pattern} onChange={e => setPattern(e.target.value)} placeholder="e.g. Debit of ₹(.*) from a/c" className="w-full p-2 border rounded-lg text-sm font-mono" />
                        <p className="text-[10px] text-gray-500 mt-1">Use (.*) to capture the amount.</p>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 mb-1">Transaction Type</label>
                        <select value={type} onChange={e => { setType(e.target.value); setCategory(''); }} className="w-full p-2 border rounded-lg text-sm bg-white">
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 mb-1">Assign to Category</label>
                        <select value={category} onChange={e => setCategory(e.target.value)} className="w-full p-2 border rounded-lg text-sm bg-white">
                            <option value="">Select Category</option>
                            {(type === 'income' ? incomeCategories : expenseCategories).map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex justify-end space-x-2 border-t mt-6 pt-4">
                    <button onClick={onClose} className="px-4 py-2 border rounded-lg text-sm text-gray-600">Cancel</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm">Save Rule</button>
                </div>
            </div>
        </div>
    );
}
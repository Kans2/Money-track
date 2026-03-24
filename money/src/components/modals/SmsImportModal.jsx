import { useState, useContext } from 'react';
import { TransactionContext } from '../../context/TransactionContext';

export default function SmsImportModal({ detected, onClose }) {
    const { addTransaction } = useContext(TransactionContext);
    const [selectedIds, setSelectedIds] = useState(detected.map(t => t.id));

    const toggleSelection = (id) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
    };

    const handleImport = () => {
        const toImport = detected.filter(t => selectedIds.includes(t.id));
        toImport.forEach(t => addTransaction(t));
        onClose();
    };

    return (

        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4 z-50">
            <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-md p-5 pb-8 sm:pb-5 animate-[slideIn_0.3s_ease-out] shadow-2xl">

                <div className="flex justify-between items-center mb-4 border-b pb-3">
                    <h3 className="font-bold text-lg text-gray-900">Import SMS</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 sm:hidden"><i className="fas fa-times text-lg"></i></button>
                </div>

                <p className="text-gray-600 mb-4 text-sm font-medium">
                    Found <span className="font-bold text-indigo-600">{detected.length}</span> new transactions:
                </p>

                <div className="max-h-64 overflow-y-auto space-y-2 mb-4 pr-2">
                    {detected.map(t => (
                        <label key={t.id} className="flex items-center p-3 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50 transition bg-white shadow-sm">
                            <input
                                type="checkbox"
                                className="mr-3 w-5 h-5 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"
                                checked={selectedIds.includes(t.id)}
                                onChange={() => toggleSelection(t.id)}
                            />
                            <div className="flex-1">
                                <p className="font-bold text-gray-800 text-sm">₹{t.amount.toLocaleString()} - {t.description}</p>
                                <p className="text-xs text-gray-500 mt-0.5 font-medium">{t.type === 'income' ? 'Credit' : 'Debit'} on {t.date}</p>
                            </div>
                            <div className={`ml-2 w-8 h-8 rounded-full flex items-center justify-center ${t.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                <i className={`fas fa-${t.icon} text-xs`}></i>
                            </div>
                        </label>
                    ))}
                </div>

                <div className="flex justify-end space-x-3 mt-5 pt-4 border-t border-gray-100">
                    <button onClick={onClose} className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition hidden sm:block">Cancel</button>
                    <button
                        onClick={handleImport}
                        disabled={selectedIds.length === 0}
                        className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium shadow-md hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Import Selected
                    </button>
                </div>
            </div>
        </div>
    );
}
import { useState, useContext } from 'react';
import { TransactionContext } from '../../context/TransactionContext';

export default function SmsImportModal({ detected, onClose }) {
    const { addTransaction } = useContext(TransactionContext);
    // Store an array of IDs representing the checked items. Default: all checked.
    const [selectedIds, setSelectedIds] = useState(detected.map(t => t.id));

    const toggleSelection = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const handleImport = () => {
        const toImport = detected.filter(t => selectedIds.includes(t.id));
        // Add each selected transaction to context
        toImport.forEach(t => addTransaction(t));
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-md p-4 animate-[slideIn_0.2s_ease-out]">
                <h3 className="font-medium text-lg mb-4 border-b pb-2">Import Transactions from SMS</h3>

                <p className="text-gray-700 mb-3 text-sm">
                    We found <span className="font-bold">{detected.length}</span> new transactions in your SMS:
                </p>

                <div className="max-h-64 overflow-y-auto space-y-2 mb-4 pr-1">
                    {detected.map(t => (
                        <label key={t.id} className="flex items-start p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                                type="checkbox"
                                className="mt-1 mr-3 w-4 h-4 text-indigo-600 rounded border-gray-300"
                                checked={selectedIds.includes(t.id)}
                                onChange={() => toggleSelection(t.id)}
                            />
                            <div className="flex-1">
                                <p className="font-medium text-gray-800">₹{t.amount.toLocaleString()} - {t.description}</p>
                                <p className="text-xs text-gray-500 mt-1">{t.type === 'income' ? 'Credit' : 'Debit'} on {t.date}</p>
                            </div>
                            <div className={`ml-2 ${t.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                                <i className={`fas fa-${t.icon}`}></i>
                            </div>
                        </label>
                    ))}
                </div>

                <div className="flex justify-end space-x-2 border-t pt-4">
                    <button onClick={onClose} className="px-4 py-2 border rounded-lg text-sm">Cancel</button>
                    <button
                        onClick={handleImport}
                        disabled={selectedIds.length === 0}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm disabled:opacity-50"
                    >
                        Import Selected
                    </button>
                </div>
            </div>
        </div>
    );
}
import { useState, useContext } from 'react';
import { TransactionContext } from '../../context/TransactionContext';

export default function FilterModal({ onClose }) {
    const { filter, setFilter, incomeCategories, expenseCategories } = useContext(TransactionContext);

    // Use local state so changes don't apply until the user clicks "Apply"
    const [localFilter, setLocalFilter] = useState({
        dateRange: filter.dateRange || 'all',
        fromDate: filter.fromDate || '',
        toDate: filter.toDate || '',
        type: filter.type || 'all',
        category: filter.category || 'all'
    });

    const applyFilter = () => {
        setFilter(localFilter);
        onClose();
    };

    const resetFilter = () => {
        setLocalFilter({
            dateRange: 'all',
            fromDate: '',
            toDate: '',
            type: 'all',
            category: 'all'
        });
    };

    const dateRanges = [
        { id: 'today', label: 'Today' },
        { id: 'week', label: 'This Week' },
        { id: 'month', label: 'This Month' },
        { id: 'year', label: 'This Year' },
        { id: 'custom', label: 'Custom' }
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center sm:p-4 z-50">
            <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-md animate-[slideIn_0.3s_ease-out] max-h-[90vh] flex flex-col">

                {/* Header */}
                <div className="p-5 border-b border-gray-100">
                    <h3 className="font-bold text-lg text-gray-900">Filter Transactions</h3>
                </div>

                {/* Scrollable Body */}
                <div className="p-5 overflow-y-auto space-y-6">

                    {/* Date Range Section */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">Date Range</label>
                        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                            {dateRanges.map(range => (
                                <button
                                    key={range.id}
                                    onClick={() => setLocalFilter({ ...localFilter, dateRange: range.id })}
                                    className={`whitespace-nowrap px-4 py-2 border rounded-xl text-sm font-medium transition-colors ${localFilter.dateRange === range.id
                                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                                        }`}
                                >
                                    {range.label}
                                </button>
                            ))}
                        </div>

                        {/* Custom Date Inputs (Only show if 'custom' is selected) */}
                        {localFilter.dateRange === 'custom' && (
                            <div className="grid grid-cols-2 gap-4 mt-3 animate-[fadeIn_0.2s_ease-out]">
                                <div>
                                    <label className="block text-gray-500 text-xs mb-1">From</label>
                                    <input
                                        type="date"
                                        value={localFilter.fromDate}
                                        onChange={(e) => setLocalFilter({ ...localFilter, fromDate: e.target.value })}
                                        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-indigo-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-500 text-xs mb-1">To</label>
                                    <input
                                        type="date"
                                        value={localFilter.toDate}
                                        onChange={(e) => setLocalFilter({ ...localFilter, toDate: e.target.value })}
                                        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-indigo-400"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Transaction Type Section */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">Transaction Type</label>
                        <div className="flex space-x-2">
                            {['all', 'income', 'expense'].map(t => (
                                <button
                                    key={t}
                                    onClick={() => setLocalFilter({ ...localFilter, type: t, category: 'all' })}
                                    className={`px-5 py-2 border rounded-xl text-sm font-medium capitalize transition-colors ${localFilter.type === t
                                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                                        }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Category Section */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">Category</label>
                        <select
                            value={localFilter.category}
                            onChange={(e) => setLocalFilter({ ...localFilter, category: e.target.value })}
                            className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-indigo-400 appearance-none cursor-pointer"
                        >
                            <option value="all">All Categories</option>
                            {(localFilter.type === 'all' || localFilter.type === 'income') &&
                                <optgroup label="Income">{incomeCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}</optgroup>
                            }
                            {(localFilter.type === 'all' || localFilter.type === 'expense') &&
                                <optgroup label="Expense">{expenseCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}</optgroup>
                            }
                        </select>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-5 border-t border-gray-100 flex justify-between items-center bg-gray-50 sm:rounded-b-2xl">
                    <button
                        onClick={resetFilter}
                        className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                    >
                        Reset
                    </button>
                    <div className="flex space-x-3">
                        <button
                            onClick={onClose}
                            className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={applyFilter}
                            className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium shadow-md hover:bg-indigo-700 transition"
                        >
                            Apply
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}






// import { useContext } from 'react';
// import { TransactionContext } from '../../context/TransactionContext';

// export default function FilterModal({ onClose }) {
//     const { filter, setFilter, incomeCategories, expenseCategories } = useContext(TransactionContext);

//     const applyFilter = () => {
//         // In a full app, you'd manage local state here and only apply on "Save"
//         onClose();
//     };

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-2xl w-full max-w-md p-4">
//                 <h3 className="font-medium text-lg mb-4 border-b pb-2">Filter Transactions</h3>

//                 <label className="block text-gray-700 mb-2">Type</label>
//                 <div className="flex space-x-2 mb-4">
//                     {['all', 'income', 'expense'].map(t => (
//                         <button key={t} onClick={() => setFilter({ ...filter, type: t })} className={`px-3 py-1 border rounded-lg text-sm capitalize ${filter.type === t ? 'bg-indigo-600 text-white' : ''}`}>{t}</button>
//                     ))}
//                 </div>

//                 <label className="block text-gray-700 mb-2">Category</label>
//                 <select value={filter.category} onChange={(e) => setFilter({ ...filter, category: e.target.value })} className="w-full p-2 border rounded-lg mb-4">
//                     <option value="all">All Categories</option>
//                     {[...incomeCategories, ...expenseCategories].map(cat => <option key={cat} value={cat}>{cat}</option>)}
//                 </select>

//                 <div className="flex justify-end space-x-2 border-t pt-4">
//                     <button onClick={onClose} className="px-4 py-2 border rounded-lg">Cancel</button>
//                     <button onClick={applyFilter} className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Apply</button>
//                 </div>
//             </div>
//         </div>
//     );
// }
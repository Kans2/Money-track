import { useState, useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import Header from '../components/layout/Header';
import TransactionList from '../components/transactions/TransactionList';
import FilterModal from '../components/modals/FilterModal';

export default function AllTransactions() {
    const { filteredTransactions } = useContext(TransactionContext);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

    return (
        <>
            <Header title="All Transactions" showBack={true} onOpenFilter={() => setIsFilterModalOpen(true)} />

            <main className="px-4">
                <div className="bg-white rounded-xl shadow-md p-3 mb-4 flex items-center">
                    <i className="fas fa-filter text-indigo-600 mr-2"></i>
                    <p className="text-sm">Showing Filtered Results</p>
                </div>

                <TransactionList transactions={filteredTransactions} />
            </main>

            {isFilterModalOpen && <FilterModal onClose={() => setIsFilterModalOpen(false)} />}
        </>
    );
}
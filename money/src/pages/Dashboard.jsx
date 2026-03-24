import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { TransactionContext } from '../context/TransactionContext';
import Header from '../components/layout/Header';
import Tabs from '../components/layout/Tabs';
import TransactionList from '../components/transactions/TransactionList';
import ExpenseTrend from '../components/charts/ExpenseTrend';
import Reports from '../components/tabs/Reports';
import AddTransactionModal from '../components/modals/AddTransactionModal';
import FilterModal from '../components/modals/FilterModal';
import TransactionsTab from '../components/tabs/TransactionsTab';
import CategoriesTab from '../components/tabs/CategoriesTab';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('transactions');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const { filteredTransactions } = useContext(TransactionContext);

    return (
        <>
            <Header onOpenFilter={() => setIsFilterModalOpen(true)} />

            <main className="px-4 -mt-4">
                <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

                {activeTab === 'transactions' && <TransactionsTab />}

                {activeTab === 'categories' && <CategoriesTab />}

                {activeTab === 'reports' && (
                    <div>
                        <Reports />
                        {/* Add CategoryChart here similarly */}
                    </div>
                )}
            </main>

            <button onClick={() => setIsAddModalOpen(true)} className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg">
                <i className="fas fa-plus text-xl"></i>
            </button>

            {isAddModalOpen && <AddTransactionModal onClose={() => setIsAddModalOpen(false)} />}
            {isFilterModalOpen && <FilterModal onClose={() => setIsFilterModalOpen(false)} />}
        </>
    );
}
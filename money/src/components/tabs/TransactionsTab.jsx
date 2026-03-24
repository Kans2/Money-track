import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { TransactionContext } from '../../context/TransactionContext';
import TransactionList from '../transactions/TransactionList';
import SmsImportModal from '../modals/SmsImportModal';
import AddRuleModal from '../modals/AddRuleModal';
import { sampleSmsMessages, parseSmsToTransaction } from '../../utils/helpers';

export default function TransactionsTab() {
    const { filteredTransactions, transactions, smsRules, deleteSmsRule } = useContext(TransactionContext);

    const [isSmsModalOpen, setIsSmsModalOpen] = useState(false);
    const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
    const [detectedSmsTransactions, setDetectedSmsTransactions] = useState([]);
    const [syncStatus, setSyncStatus] = useState('Last synced: 2 min ago');

    const handleSyncSms = () => {
        setSyncStatus('Checking for new transactions...');

        // Process raw SMS array through our helper function
        const parsed = sampleSmsMessages
            .map(sms => parseSmsToTransaction(sms, smsRules))
            .filter(t => t !== null); // Remove nulls (unmatched SMS)

        // Filter out transactions we already imported
        const newTransactions = parsed.filter(pt => !transactions.some(et => et.id === pt.id));

        if (newTransactions.length > 0) {
            setDetectedSmsTransactions(newTransactions);
            setIsSmsModalOpen(true);
            setSyncStatus(`${newTransactions.length} new transactions ready`);
        } else {
            setSyncStatus('No new transactions found');
        }
    };

    return (
        <div className="space-y-4 pb-10">
            {/* Auto-import Banner */}
            <div className="bg-indigo-50 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center">
                    <div className="bg-indigo-100 p-3 rounded-full mr-3 text-indigo-600">
                        <i className="fas fa-sms"></i>
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-800">Auto-import from SMS</h3>
                        <p className="text-sm text-gray-500">{syncStatus}</p>
                    </div>
                </div>
                <button onClick={handleSyncSms} className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-indigo-700 transition">
                    <i className="fas fa-sync-alt"></i>
                </button>
            </div>

            {/* Filter Summary Banner (Static for now) */}
            <div className="bg-white rounded-xl shadow-sm border p-3 flex items-center">
                <i className="fas fa-filter text-indigo-600 mr-2"></i>
                <p className="text-sm text-gray-600">Showing: Filtered Results</p>
            </div>

            {/* Recent Transactions List */}
            <div>
                <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-gray-800">Recent Transactions</h3>
                    <Link to="/all-transactions" className="text-indigo-600 text-sm font-medium">See All</Link>
                </div>
                <TransactionList transactions={filteredTransactions.slice(0, 5)} />
            </div>

            {/* SMS Parsing Rules List */}
            <div className="bg-white rounded-xl shadow-md p-4 mt-6">
                <div className="flex justify-between items-center mb-3 border-b pb-2">
                    <h3 className="font-medium text-gray-800">SMS Parsing Rules</h3>
                    <button onClick={() => setIsRuleModalOpen(true)} className="text-indigo-600 font-medium text-sm">
                        <i className="fas fa-plus mr-1"></i> Add
                    </button>
                </div>

                <div className="space-y-3">
                    {smsRules.map(rule => (
                        <div key={rule.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                            <div>
                                <p className="font-medium text-gray-800">{rule.name}</p>
                                <p className="text-xs text-gray-500 font-mono mt-1">{rule.pattern}</p>
                            </div>
                            <button onClick={() => deleteSmsRule(rule.id)} className="text-red-500 p-2 hover:bg-red-50 rounded-lg transition">
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modals */}
            {isSmsModalOpen && (
                <SmsImportModal
                    detected={detectedSmsTransactions}
                    onClose={() => setIsSmsModalOpen(false)}
                />
            )}
            {isRuleModalOpen && (
                <AddRuleModal onClose={() => setIsRuleModalOpen(false)} />
            )}
        </div>
    );
}
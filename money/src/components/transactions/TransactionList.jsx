import TransactionItem from './TransactionItem';

export default function TransactionList({ transactions }) {
    if (transactions.length === 0) {
        return (
            <div className="bg-gray-50 rounded-xl p-4 text-center text-gray-500">
                <i className="fas fa-inbox text-2xl mb-2"></i>
                <p>No transactions found</p>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {transactions.map(t => <TransactionItem key={t.id} transaction={t} />)}
        </div>
    );
}
export default function TransactionItem({ transaction }) {
    const isIncome = transaction.type === 'income';

    return (
        <div className={`bg-white rounded-xl p-3 flex items-center justify-between border-l-4 ${isIncome ? 'border-green-500' : 'border-red-500'}`}>
            <div className="flex items-center">
                <div className={`p-2 rounded-full mr-3 ${isIncome ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    <i className={`fas fa-${transaction.icon}`}></i>
                </div>
                <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-gray-600">{transaction.category} • {transaction.date}</p>
                </div>
            </div>
            <div className="text-right">
                <p className={`font-medium ${isIncome ? 'text-green-600' : 'text-red-600'}`}>
                    {isIncome ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                </p>
            </div>
        </div>
    );
}
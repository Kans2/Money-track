import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

export default function ExpenseTrend() {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Expenses',
            data: [4500, 5200, 4800, 5500, 6000, 5750],
            borderColor: '#ef4444',
            tension: 0.3
        }]
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-4 mb-4">
            <h3 className="font-medium mb-3">Expense Trend</h3>
            <Line data={data} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
    );
}
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TransactionProvider } from './context/TransactionContext';
import Dashboard from './pages/Dashboard';
import AllTransactions from './pages/AllTransactions';

function App() {
  return (
    <TransactionProvider>
      <Router>
        <div className="font-sans bg-[#f5f7fa] max-w-[500px] mx-auto min-h-screen relative shadow-lg pb-20">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/all-transactions" element={<AllTransactions />} />
          </Routes>
        </div>
      </Router>
    </TransactionProvider>
  );
}

export default App;



// import React, { useState, useEffect, useMemo } from 'react';
// import { Plus, Filter, Bell, Settings, RefreshCw, Trash2, PieChart, List, Tag } from 'lucide-react';

// // --- INITIAL DATA ---
// const DEFAULT_CATEGORIES = {
//   income: ['Salary', 'Freelance', 'Investment'],
//   expense: ['Food', 'Shopping', 'Transport', 'Rent', 'Utilities']
// };

// export default function MoneyTrack() {
//   // --- STATE ---
//   const [activeTab, setActiveTab] = useState('transactions');
//   const [transactions, setTransactions] = useState(() => {
//     const saved = localStorage.getItem('mt_transactions');
//     return saved ? JSON.parse(saved) : [];
//   });
//   const [categories, setCategories] = useState(() => {
//     const saved = localStorage.getItem('mt_categories');
//     return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
//   });
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [filterType, setFilterType] = useState('all'); // all, income, expense

//   // --- PERSISTENCE ---
//   useEffect(() => {
//     localStorage.setItem('mt_transactions', JSON.stringify(transactions));
//     localStorage.setItem('mt_categories', JSON.stringify(categories));
//   }, [transactions, categories]);

//   // --- FEATURE: SMS IMPORT (REGEX PARSING) ---
//   const handleSmsImport = () => {
//     // Simulated SMS Body
//     const incomingSms = "Debit of ₹450.00 from a/c XX1234 at StarBucks on 2026-03-24";
    
//     // Regex to capture Amount and Description
//     const amountRegex = /₹([0-9,.]+)/;
//     const descRegex = /at (.*?) on/;
    
//     const amountMatch = incomingSms.match(amountRegex);
//     const descMatch = incomingSms.match(descRegex);

//     if (amountMatch) {
//       const newTx = {
//         id: Date.now(),
//         type: 'expense',
//         amount: parseFloat(amountMatch[1].replace(',', '')),
//         description: descMatch ? descMatch[1] : 'SMS Import',
//         category: 'Food',
//         date: new Date().toISOString().split('T')[0]
//       };
//       setTransactions([newTx, ...transactions]);
//       alert(`Imported: ₹${newTx.amount} spent at ${newTx.description}`);
//     }
//   };

//   // --- FEATURE: REPORTING & CALCULATIONS ---
//   const totals = useMemo(() => {
//     return transactions.reduce((acc, t) => {
//       if (t.type === 'income') acc.income += t.amount;
//       else acc.expense += t.amount;
//       return acc;
//     }, { income: 0, expense: 0 });
//   }, [transactions]);

//   const filteredTransactions = transactions.filter(t => 
//     filterType === 'all' ? true : t.type === filterType
//   );

//   // --- FEATURE: CATEGORY MANAGEMENT ---
//   const addCategory = (type, name) => {
//     setCategories(prev => ({
//       ...prev,
//       [type]: [...prev[type], name]
//     }));
//   };

//   return (
//     <div className="max-w-md mx-auto min-h-screen bg-slate-50 pb-24 shadow-2xl overflow-hidden relative">
      
//       {/* HEADER: Balance Visualization */}
//       <header className="bg-gradient-to-br from-indigo-700 to-violet-800 text-white p-8 rounded-b-[2.5rem] shadow-xl">
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-2xl font-bold tracking-tight">MoneyTrack</h1>
//             <p className="text-xs text-indigo-200">SmartBiz Financial Insights</p>
//           </div>
//           <div className="flex gap-3">
//             <button className="p-2 bg-white/10 rounded-full hover:bg-white/20"><Filter size={20}/></button>
//             <button className="p-2 bg-white/10 rounded-full hover:bg-white/20"><Settings size={20}/></button>
//           </div>
//         </div>

//         <div className="space-y-1">
//           <p className="text-sm text-indigo-100 opacity-80">Total Balance</p>
//           <h2 className="text-4xl font-extrabold">₹{(totals.income - totals.expense).toLocaleString()}</h2>
//         </div>

//         <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/10">
//           <div>
//             <p className="text-[10px] uppercase tracking-wider text-indigo-200">Income</p>
//             <p className="text-lg font-bold text-emerald-400">₹{totals.income.toLocaleString()}</p>
//           </div>
//           <div className="text-right">
//             <p className="text-[10px] uppercase tracking-wider text-indigo-200">Expenses</p>
//             <p className="text-lg font-bold text-rose-400">₹{totals.expense.toLocaleString()}</p>
//           </div>
//         </div>
//       </header>

//       {/* NAVIGATION TABS */}
//       <nav className="flex justify-around bg-white mx-6 -mt-6 rounded-2xl shadow-lg p-2 border border-slate-100">
//         {[
//           { id: 'transactions', icon: <List size={18}/>, label: 'History' },
//           { id: 'categories', icon: <Tag size={18}/>, label: 'Categories' },
//           { id: 'reports', icon: <PieChart size={18}/>, label: 'Analysis' }
//         ].map(tab => (
//           <button 
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400'}`}
//           >
//             {tab.icon} <span className="text-xs font-bold">{tab.label}</span>
//           </button>
//         ))}
//       </nav>

//       {/* CONTENT AREA */}
//       <main className="p-6">
        
//         {/* TAB: TRANSACTIONS */}
//         {activeTab === 'transactions' && (
//           <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
//             <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-200">
//                   <RefreshCw size={20}/>
//                 </div>
//                 <div>
//                   <p className="text-sm font-bold text-indigo-900">SMS Sync</p>
//                   <p className="text-[10px] text-indigo-500 font-medium tracking-wide">Found 1 new alert</p>
//                 </div>
//               </div>
//               <button onClick={handleSmsImport} className="text-xs font-bold text-indigo-600 bg-white px-4 py-2 rounded-xl border border-indigo-200 shadow-sm active:scale-95 transition-transform">Import Now</button>
//             </div>

//             <div className="flex justify-between items-end">
//               <h3 className="font-black text-slate-800 text-lg">Transactions</h3>
//               <div className="flex gap-2 bg-slate-200 p-1 rounded-lg">
//                 {['all', 'income', 'expense'].map(t => (
//                   <button 
//                     key={t}
//                     onClick={() => setFilterType(t)}
//                     className={`px-3 py-1 text-[10px] font-bold rounded-md uppercase tracking-tighter ${filterType === t ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
//                   >
//                     {t}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="space-y-3">
//               {filteredTransactions.map(tx => (
//                 <div key={tx.id} className="group bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-slate-100 hover:border-indigo-200 transition-colors">
//                   <div className="flex items-center gap-4">
//                     <div className={`w-2 h-10 rounded-full ${tx.type === 'income' ? 'bg-emerald-400' : 'bg-rose-400'}`}></div>
//                     <div>
//                       <p className="font-bold text-slate-700 leading-none mb-1">{tx.description}</p>
//                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{tx.category} • {tx.date}</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className={`font-black text-lg ${tx.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
//                       {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString()}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* TAB: ANALYSIS (REPORTING) */}
//         {activeTab === 'reports' && (
//           <div className="space-y-6 text-center py-10">
//              <div className="w-32 h-32 rounded-full border-8 border-indigo-600 border-t-rose-500 mx-auto animate-spin-slow"></div>
//              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Generating Reports...</p>
//              {/* Note: You can integrate Chart.js here easily */}
//           </div>
//         )}
//       </main>

//       {/* FLOATING ACTION BUTTON */}
//       <button 
//         onClick={() => alert("Open Add Transaction Form")}
//         className="fixed bottom-8 right-8 w-16 h-16 bg-indigo-600 text-white rounded-[2rem] shadow-2xl shadow-indigo-300 flex items-center justify-center hover:bg-indigo-700 active:scale-90 transition-all border-4 border-white"
//       >
//         <Plus size={32} strokeWidth={3}/>
//       </button>
//     </div>
//   );
// }
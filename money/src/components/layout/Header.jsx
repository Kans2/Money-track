import { useState, useContext } from 'react';
import { TransactionContext } from '../../context/TransactionContext';

export default function Header({ onOpenFilter, title = "MoneyTrack", showBack = false }) {
  const { balance, income, expense } = useContext(TransactionContext);

  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleThemeChange = (color) => {
    document.body.style.backgroundColor = color;
    setShowSettings(false);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowSettings(false);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    setShowNotifications(false);
  };

  return (

    <header className="bg-gradient-to-br from-[#667eea] to-[#764ba2] text-gray-900 p-6 rounded-b-3xl relative z-40">
      <div className="flex justify-between items-center mb-6 w-full">

        {/* Left Side: Title & Back Button */}
        <div className="flex items-center">
          {showBack && (
            <button onClick={() => window.history.back()} className="mr-4 text-gray-900 hover:text-black">
              <i className="fas fa-arrow-left text-lg"></i>
            </button>
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {!showBack && <p className="text-sm font-medium text-gray-800">Track your money effortlessly</p>}
          </div>
        </div>

        {/* Right Side: Action Icons */}
        <div className="flex space-x-2 items-center relative">

          {/* Filter Button */}
          <button onClick={onOpenFilter} className="bg-white bg-opacity-40 text-gray-900 p-2 rounded-full flex items-center hover:bg-opacity-60 transition shadow-sm">
            <i className="fas fa-filter mr-1"></i>
            <span className="text-xs font-bold">Filter</span>
          </button>

          {/* Notifications Button */}
          <button onClick={toggleNotifications} className="bg-white bg-opacity-40 text-gray-900 w-8 h-8 rounded-full flex items-center justify-center hover:bg-opacity-60 transition shadow-sm">
            <i className="fas fa-bell text-sm"></i>
          </button>

          {/* Settings Button */}
          <button onClick={toggleSettings} className="bg-white bg-opacity-40 text-gray-900 w-8 h-8 rounded-full flex items-center justify-center hover:bg-opacity-60 transition shadow-sm">
            <i className="fas fa-cog text-sm"></i>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute top-12 right-10 w-48 bg-white rounded-xl shadow-xl p-4 z-50 text-gray-800 border border-gray-100">
              <div className="flex flex-col items-center justify-center py-2 text-gray-500">
                <i className="fas fa-bell-slash text-2xl mb-2 opacity-60"></i>
                <p className="text-sm font-bold text-gray-600">No notifications yet</p>
              </div>
            </div>
          )}

          {/* Settings / Theme Dropdown */}
          {showSettings && (
            <div className="absolute top-12 right-0 w-40 bg-white rounded-xl shadow-xl p-4 z-50 text-gray-800 border border-gray-100">
              <p className="text-sm font-bold border-b pb-2 mb-3 text-gray-800">Theme</p>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => handleThemeChange('white')}
                  className="w-full py-1.5 bg-gray-100 rounded-lg text-sm font-bold hover:bg-gray-200 transition text-gray-800"
                >
                  <i className="fas fa-sun mr-2 text-yellow-500"></i> Light
                </button>
                <button
                  onClick={() => handleThemeChange('black')}
                  className="w-full py-1.5 bg-gray-800 rounded-lg text-sm font-bold hover:bg-gray-900 transition text-white"
                >
                  <i className="fas fa-moon mr-2 text-blue-300"></i> Dark
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Balance Summary Card */}
      {!showBack && (
        <div className="bg-white bg-opacity-40 p-4 rounded-2xl backdrop-blur-md shadow-sm">
          <p className="text-sm mb-1 font-bold text-gray-800">Current Balance</p>
          <h2 className="text-3xl font-black mb-3 text-gray-900 tracking-tight">₹{balance.toLocaleString()}</h2>
          <div className="flex justify-between text-sm">
            <div>
              <p className="font-bold text-gray-800 mb-0.5">Income</p>
              <p className="font-bold text-green-800">₹{income.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-800 mb-0.5">Expenses</p>
              <p className="font-bold text-red-800">₹{expense.toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}










// import { useContext } from 'react';
// import { TransactionContext } from '../../context/TransactionContext';

// export default function Header({ onOpenFilter, title = "MoneyTrack", showBack = false }) {
//   const { balance, income, expense } = useContext(TransactionContext);

//   return (
//     <header className="bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white p-6 rounded-b-3xl">
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center">
//           {showBack && <button onClick={() => window.history.back()} className="mr-4"><i className="fas fa-arrow-left"></i></button>}
//           <div>
//             <h1 className="text-2xl font-bold">{title}</h1>
//             {!showBack && <p className="text-sm opacity-80">Track your money effortlessly</p>}
//           </div>
//         </div>
//         <div className="flex space-x-2 items-center">
//           <button onClick={onOpenFilter} className="bg-white bg-opacity-20 p-2 rounded-full flex items-center">
//             <i className="fas fa-filter mr-1"></i>
//             <span className="text-xs">Filter</span>
//           </button>
//         </div>
//       </div>

//       {!showBack && (
//         <div className="bg-white bg-opacity-20 p-4 rounded-2xl backdrop-blur-sm">
//           <p className="text-sm mb-1">Current Balance</p>
//           <h2 className="text-3xl font-bold mb-2">₹{balance.toLocaleString()}</h2>
//           <div className="flex justify-between text-sm">
//             <div>
//               <p className="opacity-80">Income</p>
//               <p className="font-medium">₹{income.toLocaleString()}</p>
//             </div>
//             <div className="text-right">
//               <p className="opacity-80">Expenses</p>
//               <p className="font-medium">₹{expense.toLocaleString()}</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }
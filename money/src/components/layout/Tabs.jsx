export default function Tabs({ activeTab, setActiveTab }) {
  const tabs = ['transactions', 'categories', 'reports'];

  return (
    <div className="bg-white rounded-xl shadow-md p-1 mb-4 flex">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`flex-1 py-3 font-medium capitalize text-center ${activeTab === tab ? 'text-indigo-500 border-b-2 border-indigo-500' : 'text-gray-500'}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
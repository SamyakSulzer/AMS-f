const inventoryData = [
  { category: "Laptops", inUse: 126, storage: 24, damaged: 2, level: 84 },
  { category: "Monitors", inUse: 180, storage: 12, damaged: 0, level: 93 },
  { category: "Keyboards", inUse: 140, storage: 45, damaged: 5, level: 72 },
  { category: "Mouse", inUse: 142, storage: 38, damaged: 8, level: 78 },
];

export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* HEADER SECTION */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <p className="text-slate-500 text-sm">Real-time status of IT hardware and employee allocations.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-white shadow-sm transition-all">Export Report</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm transition-all">+ New Allocation</button>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="LAPTOPS AVAILABLE" value="24" total="/ 150 total" />
        <StatCard title="ACTIVE EMPLOYEES" value="142" badge="+ 3 new" />
        <div className="bg-slate-900 text-white p-6 rounded-2xl flex justify-between items-center">
          <div>
            <p className="text-xs font-semibold opacity-70">PENDING REQUESTS</p>
            <p className="text-3xl font-bold">08 <span className="text-sm text-yellow-400 font-normal ml-2">High Priority</span></p>
          </div>
          <button className="bg-blue-600 text-[10px] font-bold px-3 py-2 rounded-lg hover:bg-blue-500">PROCESS NOW</button>
        </div>
      </div>

      {/* INVENTORY TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold">Hardware Inventory</h3>
          <span className="text-xs text-slate-400 font-medium uppercase tracking-widest">5 Categories</span>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-[10px] uppercase text-slate-400 font-bold">
            <tr>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">In Use</th>
              <th className="px-6 py-3">In Stock</th>
              <th className="px-6 py-3">In Repair</th>
              <th className="px-6 py-3">Consumption</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {inventoryData.map((item) => (
              <tr key={item.category} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-sm font-semibold">{item.category}</td>
                <td className="px-6 py-4 text-sm">{item.inUse}</td>
                <td className="px-6 py-4 text-sm text-blue-600 font-medium">{item.storage}</td>
                <td className="px-6 py-4 text-sm text-red-500">{item.damaged}</td>
                <td className="px-6 py-4">
                  <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-500 h-full"
                      style={{ width: `${item.level}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">{item.level}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Sub-component for Stats
function StatCard({ title, value, total, badge }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <p className="text-xs font-semibold text-slate-400 uppercase">{title}</p>
      <div className="flex items-baseline gap-2 mt-2">
        <p className="text-3xl font-bold leading-none">{value}</p>
        {total && <span className="text-sm text-slate-400 font-medium">{total}</span>}
        {badge && <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">{badge}</span>}
      </div>
    </div>
  );
}
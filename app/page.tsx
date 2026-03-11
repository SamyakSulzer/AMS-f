"use client";

import React, { useState, useEffect } from 'react';
import { RefreshCw, TrendingUp, Package, Tag, Archive, Loader2 } from 'lucide-react';
import { getAssetSummary, AssetSummary } from '@/services/assetService';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const [summary, setSummary] = useState<AssetSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchSummary = async () => {
    try {
      const data = await getAssetSummary();
      setSummary(data);
    } catch (error) {
      toast.error("Failed to load inventory summary");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchSummary();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-4">

      {/* HEADER SECTION */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Dashboard</h2>
          <p className="text-slate-500 text-sm font-medium">Real-time status of IT hardware and asset distribution.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-white shadow-sm transition-all">Export Report</button>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm active:scale-95 disabled:opacity-50 flex items-center gap-2 text-sm font-bold"
          >
            <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
            {isRefreshing ? 'Refreshing...' : 'Sync Data'}
          </button>
        </div>
      </div>

      {/* QUICK STATS (Derived from summary) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Assets"
          value={summary.reduce((acc, curr) => acc + curr.total, 0)}
          icon={<Package size={20} className="text-blue-500" />}
          bgColor="bg-blue-50"
        />
        <StatCard
          title="In Stock"
          value={summary.reduce((acc, curr) => acc + curr.in_stock, 0)}
          icon={<Tag size={20} className="text-emerald-500" />}
          bgColor="bg-emerald-50"
        />
        <StatCard
          title="Avg. Consumption"
          value={summary.length > 0 ? (summary.reduce((acc, curr) => acc + curr.consumption, 0) / summary.length).toFixed(1) : "0"}
          suffix="%"
          icon={<TrendingUp size={20} className="text-amber-500" />}
          bgColor="bg-amber-50"
        />
      </div>

      {/* INVENTORY TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 uppercase tracking-tight flex items-center gap-2">
            <Archive size={18} className="text-slate-400" />
            Asset Inventory Summary
          </h3>
          <span className="text-xs text-slate-400 font-black uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">
            {summary.length} Categories
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-[10px] uppercase text-slate-400 font-black tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-center">In Stock</th>
                <th className="px-6 py-4 text-center">Allocated</th>
                <th className="px-6 py-4 text-center">Retired</th>
                <th className="px-6 py-4">Consumption</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <Loader2 className="animate-spin mx-auto text-blue-600" size={24} />
                    <p className="mt-2 text-xs text-slate-400 font-bold uppercase tracking-widest">Loading Inventory Data...</p>
                  </td>
                </tr>
              ) : summary.length > 0 ? (
                summary.map((item) => (
                  <tr key={item.category} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4 text-sm font-black text-slate-700">{item.category}</td>
                    <td className="px-6 py-4 text-sm text-center font-bold text-emerald-600">{item.in_stock}</td>
                    <td className="px-6 py-4 text-sm text-center font-bold text-blue-600">{item.allocated}</td>
                    <td className="px-6 py-4 text-sm text-center font-bold text-slate-400">{item.retired}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden shadow-inner">
                          <div
                            className={`h-full transition-all duration-500 ease-out ${item.consumption > 80 ? 'bg-red-500' :
                                item.consumption > 50 ? 'bg-amber-500' :
                                  'bg-blue-500'
                              }`}
                            style={{ width: `${item.consumption}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-black text-slate-600 min-w-[40px]">{item.consumption}%</span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 mt-2 text-sm italic">
                    No asset categories found in the system.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Sub-component for Stats
function StatCard({ title, value, icon, bgColor, suffix = "" }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-all cursor-default">
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-blue-500 transition-colors">{title}</p>
        <p className="text-3xl font-black text-slate-800 tracking-tight leading-none">
          {value}{suffix}
        </p>
      </div>
      <div className={`p-4 rounded-2xl ${bgColor} transition-transform group-hover:scale-110`}>
        {icon}
      </div>
    </div>
  );
}
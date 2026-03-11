"use client";

import React, { useEffect, useState } from "react";
import { Search, X, RefreshCw, AlertCircle, FileText, Users, Loader2, Copy } from "lucide-react";
import { getNotificationCounts, NotificationCounts, getNotificationDetails, NotificationDetails } from "@/services/notificationService";
import toast from "react-hot-toast";

export default function NotificationsPage() {
    const [counts, setCounts] = useState<NotificationCounts | null>(null);
    const [details, setDetails] = useState<NotificationDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchCounts = async () => {
        setIsLoading(true);
        try {
            const userName = localStorage.getItem("user_name") || "n/a";
            const data = await getNotificationCounts(userName);
            const detailData = await getNotificationDetails(userName);
            setCounts(data);
            setDetails(detailData);
        } catch (error) {
            toast.error("Failed to load notifications");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCounts();
    }, []);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`Copied: ${text}`);
    };

    return (
        <div className="p-4 md:p-6 space-y-6 max-w-full mx-auto min-h-screen font-sans bg-slate-50/50">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                        Notifications Center
                    </h1>
                    <p className="text-sm text-slate-500 font-medium">Manage your pending tasks and incomplete entries</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button
                        onClick={fetchCounts}
                        disabled={isLoading}
                        className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm active:scale-95 cursor-pointer disabled:opacity-50"
                        title="Refresh counts"
                    >
                        <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
                    </button>
                </div>
            </div>

            {/* STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* INCOMPLETE ASSETS */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <FileText size={80} />
                    </div>
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-amber-50 rounded-2xl text-amber-600">
                            <FileText size={24} />
                        </div>
                        {isLoading ? (
                            <Loader2 size={20} className="animate-spin text-slate-300" />
                        ) : (
                            <span className="text-3xl font-black text-slate-900">{counts?.incomplete_assets || 0}</span>
                        )}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">Incomplete Assets</h3>
                        <p className="text-sm text-slate-500">Asset records missing key information created/modified by you</p>
                    </div>
                    <div className="mt-6 pt-6 border-t border-slate-50 flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg">Action Required</span>
                        <button className="text-blue-600 text-sm font-bold hover:underline cursor-pointer">View Details</button>
                    </div>
                </div>

                {/* INCOMPLETE EMPLOYEES */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Users size={80} />
                    </div>
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
                            <Users size={24} />
                        </div>
                        {isLoading ? (
                            <Loader2 size={20} className="animate-spin text-slate-300" />
                        ) : (
                            <span className="text-3xl font-black text-slate-900">{counts?.incomplete_employees || 0}</span>
                        )}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">Incomplete Employees</h3>
                        <p className="text-sm text-slate-500">Employee profiles missing mandatory details assigned to you</p>
                    </div>
                    <div className="mt-6 pt-6 border-t border-slate-50 flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">Update Profile</span>
                        <button className="text-blue-600 text-sm font-bold hover:underline cursor-pointer">View Details</button>
                    </div>
                </div>

                {/* TOTAL PENDING */}
                <div className="bg-slate-900 p-6 rounded-3xl shadow-xl shadow-slate-200 group overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <AlertCircle size={80} className="text-white" />
                    </div>
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-white/10 rounded-2xl text-white">
                            <AlertCircle size={24} />
                        </div>
                        {isLoading ? (
                            <Loader2 size={20} className="animate-spin text-slate-500" />
                        ) : (
                            <span className="text-3xl font-black text-white">{counts?.total || 0}</span>
                        )}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white mb-1">Total Pending Tasks</h3>
                        <p className="text-sm text-slate-400">Combined total of data entries requiring your attention</p>
                    </div>
                    <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-2">
                        <div className="h-2 flex-1 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-500 transition-all duration-1000"
                                style={{ width: counts?.total ? '60%' : '0%' }}
                            ></div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400">PRIORITY</span>
                    </div>
                </div>
            </div>

            {/* SEARCH AND FILTER Section (Placeholder for future list) */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <h2 className="text-lg font-black text-slate-800">Notification Details</h2>
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                            <input
                                type="text"
                                placeholder="Filter alerts..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                            />
                        </div>
                    </div>

                </div>

                <div className="p-6">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-12">
                            <Loader2 size={32} className="animate-spin text-slate-300" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Assets List */}
                            <div>
                                <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                                    <FileText size={18} className="text-amber-500" />
                                    Assets Requiring Action ({details?.incomplete_assets?.length || 0})
                                </h3>
                                {details?.incomplete_assets && details.incomplete_assets.length > 0 ? (
                                    <ul className="space-y-2">
                                        {details.incomplete_assets.filter(id => id.toLowerCase().includes(searchTerm.toLowerCase())).map((uuid, i) => (
                                            <li key={`asset-${i}`} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 transition-colors">
                                                <span className="text-sm font-medium text-slate-700 font-mono">{uuid}</span>
                                                <button onClick={() => copyToClipboard(uuid)} className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md hover:bg-white shadow-sm transition-all" title="Copy U_UID">
                                                    <Copy size={16} />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-slate-500 italic p-4 bg-slate-50 rounded-xl text-center">No incomplete assets found.</p>
                                )}
                            </div>

                            {/* Employees List */}
                            <div>
                                <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                                    <Users size={18} className="text-indigo-500" />
                                    Employees Requiring Action ({details?.incomplete_employees?.length || 0})
                                </h3>
                                {details?.incomplete_employees && details.incomplete_employees.length > 0 ? (
                                    <ul className="space-y-2">
                                        {details.incomplete_employees.filter(emp => emp.toLowerCase().includes(searchTerm.toLowerCase())).map((empNo, i) => (
                                            <li key={`emp-${i}`} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 transition-colors">
                                                <span className="text-sm font-medium text-slate-700 font-mono">{empNo}</span>
                                                <button onClick={() => copyToClipboard(empNo)} className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md hover:bg-white shadow-sm transition-all" title="Copy Employee Number">
                                                    <Copy size={16} />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-slate-500 italic p-4 bg-slate-50 rounded-xl text-center">No incomplete employees found.</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}

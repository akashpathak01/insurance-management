import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Wallet, PieChart as PieIcon, ArrowUpRight, ArrowDownRight, Plus, Trash2, Building2 } from 'lucide-react';
import { useNetWorthStore } from '../store/useNetWorthStore';
import { useAccountStore } from '../store/useAccountStore';
import { Modal, Button } from '../components/ui';
import toast from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';

const PIE_COLORS = ['#4f46e5', '#06b6d4', '#8b5cf6', '#f43f5e', '#fbbf24', '#10b981'];

export function NetWorth() {
  const { netWorthRecords, addRecord, deleteRecord } = useNetWorthStore();
  const { accounts } = useAccountStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    accountId: accounts[0]?.id || '',
    type: 'Asset',
    name: '',
    value: '',
    date: new Date().toISOString().split('T')[0]
  });

  const { totalAssets, totalLiabilities, netWorth } = useMemo(() => {
    const assets = netWorthRecords
      .filter(r => r.type === 'Asset')
      .reduce((sum, r) => sum + Number(r.value), 0);
    const liabilities = netWorthRecords
      .filter(r => r.type === 'Liability')
      .reduce((sum, r) => sum + Number(r.value), 0);
    return {
      totalAssets: assets,
      totalLiabilities: liabilities,
      netWorth: assets - liabilities
    };
  }, [netWorthRecords]);

  const allocationData = useMemo(() => {
    const assetRecords = netWorthRecords.filter(r => r.type === 'Asset');
    const grouped = assetRecords.reduce((acc, r) => {
      acc[r.name] = (acc[r.name] || 0) + Number(r.value);
      return acc;
    }, {});
    
    return Object.entries(grouped).map(([name, value]) => ({
      name,
      value
    })).sort((a, b) => b.value - a.value);
  }, [netWorthRecords]);

  // Mock trend data for chart consistency
  const trendData = [
    { month: 'Jan', assets: totalAssets * 0.8, liabilities: totalLiabilities * 0.9 },
    { month: 'Feb', assets: totalAssets * 0.85, liabilities: totalLiabilities * 0.88 },
    { month: 'Mar', assets: totalAssets * 0.9, liabilities: totalLiabilities * 0.95 },
    { month: 'Apr', assets: totalAssets * 0.92, liabilities: totalLiabilities * 0.98 },
    { month: 'May', assets: totalAssets * 0.95, liabilities: totalLiabilities * 0.92 },
    { month: 'Jun', assets: totalAssets, liabilities: totalLiabilities },
  ];

  const handleOpenAdd = () => {
    setFormData({
      accountId: accounts[0]?.id || '',
      type: 'Asset',
      name: '',
      value: '',
      date: new Date().toISOString().split('T')[0]
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addRecord({
      ...formData,
      value: Number(formData.value)
    });
    toast.success('Record added successfully');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-800">Net Worth Analysis</h1>
        <div className="flex gap-4">
          <button 
            onClick={handleOpenAdd}
            className="gradient-btn font-bold flex items-center gap-2 shadow-lg shadow-primary/20"
          >
            <Plus size={18} />
            Add Asset/Liability
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="premium-card p-6 bg-gradient-to-br from-primary to-indigo-700 text-white shadow-primary/20">
          <p className="text-primary-light font-bold uppercase tracking-wider text-xs mb-1">Total Net Worth</p>
          <h2 className="text-4xl font-bold mb-4">${netWorth.toLocaleString()}</h2>
          <div className="flex items-center gap-2 text-primary-light text-sm">
            <TrendingUp size={16} />
            <span>Projected: ${(netWorth * 1.1).toLocaleString()} by end of year</span>
          </div>
        </div>
        
        <div className="premium-card p-6 border-l-4 border-emerald-500">
          <div className="flex items-center justify-between mb-4">
            <p className="text-slate-500 font-bold text-xs uppercase tracking-wider">Total Assets</p>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><TrendingUp size={16} /></div>
          </div>
          <h2 className="text-3xl font-bold text-slate-800">${totalAssets.toLocaleString()}</h2>
          <p className="text-emerald-500 text-xs font-bold mt-1">+12.4% Asset Growth</p>
        </div>

        <div className="premium-card p-6 border-l-4 border-rose-500">
          <div className="flex items-center justify-between mb-4">
            <p className="text-slate-500 font-bold text-xs uppercase tracking-wider">Total Liabilities</p>
            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg"><TrendingDown size={16} /></div>
          </div>
          <h2 className="text-3xl font-bold text-slate-800">${totalLiabilities.toLocaleString()}</h2>
          <p className="text-rose-500 text-xs font-bold mt-1">-4.2% Debt Reduction</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="premium-card p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Asset vs Liability Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`$${value.toLocaleString()}`]}
                />
                <Area type="monotone" dataKey="assets" stackId="1" stroke="#4f46e5" strokeWidth={2} fill="#4f46e5" fillOpacity={0.1} />
                <Area type="monotone" dataKey="liabilities" stackId="2" stroke="#f43f5e" strokeWidth={2} fill="#f43f5e" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="premium-card p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Asset Allocation Mix</h3>
          <div className="h-80 flex flex-col items-center">
            {allocationData.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie 
                      data={allocationData} 
                      cx="50%" cy="50%" 
                      innerRadius={60} 
                      outerRadius={100} 
                      paddingAngle={5} 
                      dataKey="value"
                    >
                      {allocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`]} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 w-full overflow-y-auto max-h-32 custom-scrollbar">
                  {allocationData.map((item, i) => (
                    <div key={i} className="flex flex-col items-center text-center">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}></span>
                        <span className="text-[10px] font-bold text-slate-700 truncate max-w-[80px]">{item.name}</span>
                      </div>
                      <span className="text-sm font-bold text-slate-800">${(item.value / 1000).toFixed(0)}k</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 italic">
                <PieIcon size={48} className="mb-2 opacity-20" />
                No asset data available
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="premium-card p-4">
        <h3 className="text-lg font-bold text-slate-800 px-4 py-2 border-b border-slate-50 mb-4">Detailed Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-4">Record Name</th>
                <th className="px-6 py-4">Account</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Value</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {netWorthRecords.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-bold text-slate-800">{record.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                    {accounts.find(a => a.id === record.accountId)?.name || 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={twMerge(
                      "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                      record.type === 'Asset' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                    )}>
                      {record.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400 font-medium">{record.date}</td>
                  <td className={twMerge(
                    "px-6 py-4 text-right font-bold italic font-mono",
                    record.type === 'Asset' ? "text-emerald-600" : "text-rose-600"
                  )}>
                    {record.type === 'Asset' ? '+' : '-'}${record.value.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => deleteRecord(record.id)}
                      className="p-2 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Asset/Liability"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Type</label>
                <div className="flex gap-2">
                  {['Asset', 'Liability'].map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, type })}
                      className={twMerge(
                        "flex-1 py-2 px-3 rounded-xl border-2 font-bold text-sm transition-all",
                        formData.type === type 
                          ? (type === 'Asset' ? "border-emerald-500 bg-emerald-50 text-emerald-600" : "border-rose-500 bg-rose-50 text-rose-600")
                          : "border-slate-100 bg-white text-slate-400"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Date</label>
                <input
                  type="date"
                  required
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Link to Account</label>
              <select
                required
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                value={formData.accountId}
                onChange={(e) => setFormData({ ...formData, accountId: e.target.value })}
              >
                {accounts.map(acc => (
                  <option key={acc.id} value={acc.id}>{acc.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Asset/Liability Name</label>
              <input
                required
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Real Estate Portfolio, Mortgage"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Value (USD)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="number"
                  required
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button className="flex-1" type="submit">Save Record</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

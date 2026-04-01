import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Download, FileText, Filter, Calendar, Share2, TrendingUp, Shield, Activity, PieChart as PieIcon } from 'lucide-react';
import { usePolicyStore } from '../store/usePolicyStore';
import { useCaseStore } from '../store/useCaseStore';
import { useAccountStore } from '../store/useAccountStore';
import { useNetWorthStore } from '../store/useNetWorthStore';
import toast from 'react-hot-toast';

const COLORS = ['#4f46e5', '#06b6d4', '#8b5cf6', '#f43f5e', '#fbbf24', '#10b981'];

export function Reports() {
  const { policies } = usePolicyStore();
  const { cases } = useCaseStore();
  const { accounts } = useAccountStore();
  const { netWorthRecords } = useNetWorthStore();

  const policyByProduct = useMemo(() => {
    const counts = policies.reduce((acc, p) => {
      acc[p.product] = (acc[p.product] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [policies]);

  const caseByStatus = useMemo(() => {
    const statusMap = { 1: 'New', 2: 'Review', 3: 'Decision', 4: 'Closed' };
    const counts = cases.reduce((acc, c) => {
      const label = statusMap[c.step] || 'Unknown';
      acc[label] = (acc[label] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [cases]);

  const handleExport = (type) => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: `Generating ${type} report...`,
        success: `${type} report exported successfully!`,
        error: 'Export failed.',
      }
    );
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Analytics & Reports</h1>
          <p className="text-slate-500 font-medium italic">Enterprise Intelligence & Strategic Overview</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white text-slate-600 rounded-xl hover:bg-slate-50 transition-colors font-bold shadow-sm">
            <Calendar size={18} />
            Period: All Time
          </button>
          <button 
            onClick={() => handleExport('PDF')}
            className="gradient-btn flex items-center gap-2 font-bold"
          >
            <Download size={18} />
            Export Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="premium-card p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Shield size={20} className="text-primary" />
              Policy Distribution
            </h3>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">By Product Type</span>
          </div>
          <div className="h-80">
            {policyByProduct.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={policyByProduct} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11, fontWeight: 'bold'}} width={100} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="value" fill="#4f46e5" radius={[0, 4, 4, 0]} barSize={25} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400 italic">No policy data</div>
            )}
          </div>
        </div>

        <div className="premium-card p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Activity size={20} className="text-rose-500" />
              Claims Status Overview
            </h3>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">By Workflow Stage</span>
          </div>
          <div className="h-80">
            {caseByStatus.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={caseByStatus} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={8} dataKey="value">
                    {caseByStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400 italic">No claim data</div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 premium-card p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-8 flex items-center gap-2">
             <TrendingUp size={20} className="text-emerald-500" />
             Net Worth Portfolio Growth
          </h3>
          <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={[
                 { month: 'Jan', val: 120 }, { month: 'Feb', val: 180 }, { month: 'Mar', val: 160 }, 
                 { month: 'Apr', val: 240 }, { month: 'May', val: 210 }, { month: 'Jun', val: 320 }
               ]}>
                 <defs>
                   <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                     <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                 <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                 <Tooltip />
                 <Area type="monotone" dataKey="val" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorVal)" />
               </AreaChart>
             </ResponsiveContainer>
          </div>
        </div>

        <div className="premium-card p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <FileText size={20} className="text-indigo-500" />
            Generated Reports
          </h3>
          <div className="space-y-3">
            {[
              { t: 'Annual Policy Performance', s: '4.2 MB', d: 'Oct 28' },
              { t: 'Claim Cycle Time Analysis', s: '1.8 MB', d: 'Oct 25' },
              { t: 'Revenue by Region Q3', s: '2.1 MB', d: 'Oct 22' },
              { t: 'Portfolio Risk Assessment', s: '5.4 MB', d: 'Oct 15' },
            ].map((rep, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl group hover:border-primary/20 transition-all cursor-pointer">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-700 group-hover:text-primary transition-colors">{rep.t}</span>
                  <span className="text-[9px] text-slate-400 font-bold uppercase">{rep.d} • {rep.s}</span>
                </div>
                <Download size={14} className="text-slate-300 group-hover:text-primary transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

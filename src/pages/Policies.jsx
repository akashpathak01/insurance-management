import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Shield, Clock, AlertCircle, CheckCircle2, ChevronRight, FileText, Calendar, DollarSign, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const policies = [
  { id: 'POL-8821', holder: 'Robert Chen', type: 'Life Insurance', status: 'Active', renewal: '2024-10-24', premium: '$1,200/mo', coverage: '$1.5M', progress: 85 },
  { id: 'POL-9012', holder: 'Linda Wilson', type: 'Health Standard', status: 'Expiring', renewal: '2023-11-15', premium: '$450/mo', coverage: '$500k', progress: 95 },
  { id: 'POL-4421', holder: 'Marcus Aurelius', type: 'Auto Comprehensive', status: 'Pending', renewal: 'N/A', premium: '$280/mo', coverage: '$250k', progress: 10 },
  { id: 'POL-3321', holder: 'Julia Roberts', type: 'Property Premier', status: 'Active', renewal: '2024-05-12', premium: '$1,800/mo', coverage: '$3.2M', progress: 40 },
];

const StatusBadge = ({ status }) => {
  const styles = {
    Active: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    Expiring: 'bg-rose-50 text-rose-600 border-rose-100 animate-pulse',
    Pending: 'bg-amber-50 text-amber-600 border-amber-100',
  };
  return (
    <span className={twMerge("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border", styles[status])}>
      {status}
    </span>
  );
};

export function Policies() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Policies</h1>
          <p className="text-slate-500 font-medium">Lifecycle Tracking: Pending → Active → Expiring</p>
        </div>
        <div className="flex gap-4">
           <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm text-sm font-bold text-slate-600">
             <Calendar size={18} />
             Next 30 Days
           </div>
           <button className="gradient-btn font-bold">Issue New Policy</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          { l: 'Active Policies', v: '1,284', c: 'text-emerald-500', i: CheckCircle2 },
          { l: 'Expiring Soon', v: '24', c: 'text-rose-500', i: Clock },
          { l: 'Pending Approval', v: '12', i: AlertCircle, c: 'text-amber-500' },
          { l: 'Total Coverage', v: '$840M', i: Shield, c: 'text-primary' },
        ].map((stat, i) => (
          <div key={i} className="premium-card p-6 border-b-4 border-slate-50 hover:border-primary transition-all group">
            <stat.i size={24} className={`${stat.c} mb-4 transition-transform group-hover:scale-110`} />
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">{stat.l}</p>
            <h4 className="text-2xl font-bold text-slate-800 mt-1">{stat.v}</h4>
          </div>
        ))}
      </div>

      <div className="premium-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Policy ID & Holder</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Lapse Progress</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Premium</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Renewal</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {policies.map((p, i) => (
                <motion.tr 
                  key={p.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="hover:bg-slate-50/80 transition-all group"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary"><FileText size={16} /></div>
                      <div>
                        <div className="font-bold text-slate-800">{p.id}</div>
                        <div className="text-xs text-slate-500 font-medium">{p.holder}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-bold text-slate-700">{p.type}</span>
                  </td>
                  <td className="px-6 py-5 min-w-[200px]">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                        <span>Cycle</span>
                        <span>{p.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          className={twMerge(
                            "h-full rounded-full bg-primary transition-all duration-1000 ease-out",
                             p.progress > 80 && "bg-rose-500",
                             p.progress < 20 && "bg-amber-400"
                          )}
                          initial={{ width: 0 }}
                          animate={{ width: `${p.progress}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5"><StatusBadge status={p.status} /></td>
                  <td className="px-6 py-5 font-bold text-slate-800">{p.premium}</td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-slate-500 font-medium flex items-center gap-1.5">
                      <Calendar size={14} className="text-slate-400" /> {p.renewal}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-primary font-bold text-sm flex items-center gap-1 group-hover:underline">
                      Manage <ChevronRight size={16} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Helper for tailwind-merge (already imported at top)

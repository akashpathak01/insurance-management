import React from 'react';
import { UserPlus, Search, Filter, Shield, ShieldCheck, ShieldAlert, MoreHorizontal, Mail, Key } from 'lucide-react';
import { motion } from 'framer-motion';

const systemUsers = [
  { id: 'USR-001', name: 'Alexander Wright', role: 'Super Admin', email: 'alex@securecrm.io', status: 'Active', login: '2 mins ago', permissions: 'Full' },
  { id: 'USR-002', name: 'Sarah Jenkins', role: 'Manager', email: 's.jenkins@securecrm.io', status: 'Active', login: '1 hour ago', permissions: 'Team' },
  { id: 'USR-003', name: 'Michael Chen', role: 'Staff', email: 'mchen@securecrm.io', status: 'Inactive', login: '2 days ago', permissions: 'Data' },
  { id: 'USR-004', name: 'Emily Davis', role: 'Underwriter', email: 'edavis@securecrm.io', status: 'Active', login: '45 mins ago', permissions: 'Review' },
];

export function Users() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">User Management</h1>
          <p className="text-slate-500 font-medium">Control system access, roles, and permissions</p>
        </div>
        <button className="gradient-btn flex items-center gap-2 font-bold shadow-lg shadow-primary/20">
          <UserPlus size={18} />
          Invite New User
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { l: 'Total Admins', v: '4', i: ShieldCheck, c: 'text-primary' },
          { l: 'Active Sessions', v: '18', i: Key, c: 'text-emerald-500' },
          { l: 'Role Overrides', v: '2', i: ShieldAlert, c: 'text-amber-500' },
          { l: 'Pending Invites', v: '5', i: Mail, c: 'text-cyan-500' },
        ].map((stat, i) => (
          <div key={i} className="premium-card p-6 border-b-4 border-slate-50 hover:border-primary transition-all group cursor-default">
            <stat.i size={20} className={`${stat.c} mb-3 transition-transform group-hover:scale-110`} />
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.l}</p>
            <h4 className="text-xl font-bold text-slate-800 mt-1">{stat.v}</h4>
          </div>
        ))}
      </div>

      <div className="premium-card p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
             <thead>
              <tr className="border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">User Profile</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Role & Permissions</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Last Activity</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
               {systemUsers.map((user, i) => (
                 <motion.tr 
                   key={user.id}
                   initial={{ opacity: 0, scale: 0.98 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ delay: i * 0.05 }}
                   className="hover:bg-slate-50/50 group transition-colors"
                 >
                   <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full border-2 border-slate-50 overflow-hidden shadow-sm">
                           <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt={user.name} />
                         </div>
                         <div>
                            <div className="font-bold text-slate-800 group-hover:text-primary transition-colors">{user.name}</div>
                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{user.email}</div>
                         </div>
                      </div>
                   </td>
                   <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                         <span className="px-3 py-1 bg-primary/5 text-primary text-[10px] font-bold rounded uppercase tracking-wider">{user.role}</span>
                         <span className="text-[10px] text-slate-400 font-medium">({user.permissions} Access)</span>
                      </div>
                   </td>
                   <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                         <div className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                         <span className="text-sm text-slate-600 font-medium">{user.status}</span>
                      </div>
                   </td>
                   <td className="px-6 py-5 text-xs text-slate-500 font-medium">{user.login}</td>
                   <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2">
                         <button className="p-2 text-slate-400 hover:text-primary hover:bg-white rounded-lg transition-all shadow-sm"><Key size={16} /></button>
                         <button className="p-2 text-slate-400 hover:text-primary hover:bg-white rounded-lg transition-all shadow-sm"><MoreHorizontal size={16} /></button>
                      </div>
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

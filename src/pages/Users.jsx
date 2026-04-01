import React, { useState } from 'react';
import { UserPlus, Search, Filter, Shield, ShieldCheck, ShieldAlert, MoreHorizontal, Mail, Key, Trash2, Edit3, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '../store/useUserStore';
import { roles } from '../store/useAuthStore';
import { Modal, Button } from '../components/ui';
import toast from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';

export function Users() {
  const { users, addUser, updateUser, deleteUser } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Staff',
    status: 'Active',
    permissions: 'Data'
  });

  const handleOpenAdd = () => {
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      role: 'Staff',
      status: 'Active',
      permissions: 'Data'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      permissions: user.permissions || 'Data'
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      updateUser(editingUser.id, formData);
      toast.success('User updated successfully');
    } else {
      addUser({
        ...formData,
        login: 'Just now'
      });
      toast.success('User invited successfully');
    }
    setIsModalOpen(false);
  };

  const stats = [
    { l: 'Total Admins', v: users.filter(u => u.role === 'Admin').length, i: ShieldCheck, c: 'text-primary' },
    { l: 'Active Staff', v: users.filter(u => u.status === 'Active').length, i: Check, c: 'text-emerald-500' },
    { l: 'Total Users', v: users.length, i: Shield, c: 'text-indigo-500' },
    { l: 'Pending Invites', v: '2', i: Mail, c: 'text-cyan-500' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">User Management</h1>
          <p className="text-slate-500 font-medium italic">Control system access, roles, and enterprise permissions</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="gradient-btn flex items-center gap-2 font-bold shadow-lg shadow-primary/20"
        >
          <UserPlus size={18} />
          Invite New User
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
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
              <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-4">User Profile</th>
                <th className="px-6 py-4">Role & Permissions</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Activity</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
               {users.map((user, i) => (
                 <motion.tr 
                   key={user.id}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: i * 0.05 }}
                   className="hover:bg-slate-50/50 group transition-colors"
                 >
                   <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full border-2 border-slate-50 overflow-hidden shadow-sm bg-slate-100">
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
                         <span className="px-3 py-1 bg-primary/5 text-primary text-[10px] font-bold rounded uppercase tracking-wider font-mono">{user.role}</span>
                         <span className="text-[10px] text-slate-400 font-bold uppercase">({user.permissions || 'Standard'} Access)</span>
                      </div>
                   </td>
                   <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                         <div className={twMerge(
                           "w-2 h-2 rounded-full",
                           user.status === 'Active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-300'
                         )}></div>
                         <span className="text-sm text-slate-600 font-bold">{user.status}</span>
                      </div>
                   </td>
                   <td className="px-6 py-5 text-xs text-slate-500 font-medium italic">{user.login}</td>
                   <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button 
                            onClick={() => handleOpenEdit(user)}
                            className="p-2 text-slate-400 hover:text-primary hover:bg-white rounded-lg transition-all shadow-sm border border-transparent hover:border-slate-100"
                         >
                            <Edit3 size={16} />
                         </button>
                         <button 
                            onClick={() => deleteUser(user.id)}
                            className="p-2 text-slate-400 hover:text-rose-500 hover:bg-white rounded-lg transition-all shadow-sm border border-transparent hover:border-slate-100"
                         >
                            <Trash2 size={16} />
                         </button>
                      </div>
                   </td>
                 </motion.tr>
               ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingUser ? "Edit System User" : "Invite New User"}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                <input
                  required
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alexander Wright"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                <input
                  required
                  type="email"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@enterprise.io"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">System Role</label>
                <select
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  {Object.values(roles).map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Default Status</label>
                <div className="flex gap-2">
                  {['Active', 'Inactive'].map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setFormData({ ...formData, status: s })}
                      className={twMerge(
                        "flex-1 py-2 px-3 rounded-xl border-2 font-bold text-xs uppercase transition-all tracking-tighter",
                        formData.status === s 
                          ? (s === 'Active' ? "border-emerald-500 bg-emerald-50 text-emerald-600" : "border-slate-300 bg-slate-50 text-slate-400")
                          : "border-slate-50 bg-white text-slate-300"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Permission Scope</label>
              <div className="grid grid-cols-2 gap-2">
                {['Full', 'Team', 'Data', 'Review'].map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setFormData({ ...formData, permissions: p })}
                    className={twMerge(
                      "py-3 px-4 rounded-xl border-2 font-bold text-xs uppercase tracking-widest transition-all text-left flex items-center justify-between group",
                      formData.permissions === p 
                        ? "border-primary bg-primary/5 text-primary" 
                        : "border-slate-50 bg-white text-slate-400"
                    )}
                  >
                    {p} Access
                    {formData.permissions === p && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button className="flex-1" type="submit">
              {editingUser ? 'Update User' : 'Send Invite'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

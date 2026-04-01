import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Search, Filter, Plus, User, Mail, Phone, ChevronRight, Share2, Edit2, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAccountStore } from '../store/useAccountStore';
import { Modal, Button } from '../components/ui';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function Accounts() {
  const { accounts, addAccount, updateAccount, deleteAccount } = useAccountStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    type: 'Mid-Market',
    contact: '',
    email: '',
    phone: '',
    address: '',
    status: 'Active',
    value: '$0'
  });

  const filteredAccounts = accounts.filter(acc => 
    acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    acc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    acc.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingAccount(null);
    setFormData({
      name: '',
      type: 'Mid-Market',
      contact: '',
      email: '',
      phone: '',
      address: '',
      status: 'Active',
      value: '$0'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (acc) => {
    setEditingAccount(acc);
    setFormData({ ...acc });
    setIsModalOpen(true);
  };

  const handleOpenDelete = (id) => {
    setDeletingId(id);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAccount) {
      updateAccount(editingAccount.id, formData);
      toast.success('Account updated successfully');
    } else {
      addAccount(formData);
      toast.success('Account added successfully');
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    deleteAccount(deletingId);
    toast.success('Account deleted successfully');
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Accounts</h1>
          <p className="text-slate-500 font-medium">Manage your {accounts.length} enterprise partnerships</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white text-slate-600 rounded-xl hover:bg-slate-50 transition-colors font-bold shadow-sm">
            <Share2 size={18} />
            Export Data
          </button>
          <button 
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all font-bold shadow-lg shadow-primary/20"
          >
            <Plus size={18} />
            Add Account
          </button>
        </div>
      </div>

      <div className="premium-card p-4">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -transform -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, ID, or primary contact..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors font-bold">
            <Filter size={18} />
            Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Account & Contact</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Contact Info</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Value</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredAccounts.map((acc, i) => (
                <motion.tr 
                  key={acc.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-slate-50/50 group transition-colors"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {acc.name[0]}
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 flex items-center gap-2">
                          {acc.name}
                          <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-400 font-mono tracking-tighter">{acc.id}</span>
                        </div>
                        <div className="text-xs text-slate-500 font-medium flex items-center gap-1">
                          <User size={12} /> {acc.contact}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold uppercase tracking-wider">{acc.type}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="space-y-1">
                      <div className="text-xs text-slate-600 flex items-center gap-1.5">
                        <Mail size={12} className="text-slate-400" /> {acc.email}
                      </div>
                      <div className="text-xs text-slate-600 flex items-center gap-1.5">
                        <Phone size={12} className="text-slate-400" /> {acc.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={clsx(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                      acc.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                      acc.status === 'Pending' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                      'bg-slate-100 text-slate-400 border border-slate-200'
                    )}>
                      {acc.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right font-bold text-slate-800 font-mono italic">
                    {acc.value}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleOpenEdit(acc)}
                        className="p-2 text-slate-400 hover:text-primary hover:bg-white rounded-lg transition-all shadow-sm border border-transparent hover:border-slate-100"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleOpenDelete(acc.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded-lg transition-all shadow-sm border border-transparent hover:border-slate-100"
                      >
                        <Trash2 size={16} />
                      </button>
                      <button 
                        onClick={() => navigate(`/accounts/${acc.id}`)}
                        className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-slate-50 flex items-center justify-between mt-4">
          <div className="text-sm text-slate-400 font-medium italic">Showing <b>1-{filteredAccounts.length}</b> of {accounts.length} results</div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-slate-50 text-slate-400 rounded-lg text-sm font-bold cursor-not-allowed">Previous</button>
            <button className="px-4 py-2 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-bold transition-colors">Next</button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingAccount ? 'Edit Account' : 'Add New Account'}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Account Name</label>
              <input
                required
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter account name"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Type</label>
              <select
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option>Enterprise</option>
                <option>Mid-Market</option>
                <option>Small Business</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status</label>
              <select
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option>Active</option>
                <option>Pending</option>
                <option>Inactive</option>
              </select>
            </div>
            <div className="col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Primary Contact</label>
              <input
                required
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                placeholder="Primary contact name"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@company.com"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone</label>
              <input
                required
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 234-567-890"
              />
            </div>
            <div className="col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Address</label>
              <textarea
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                rows="2"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Full address"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)} type="button">Cancel</Button>
            <Button className="flex-1" type="submit">{editingAccount ? 'Save Changes' : 'Create Account'}</Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Delete"
      >
        <div className="space-y-6">
          <p className="text-slate-600">Are you sure you want to delete this account? This action cannot be undone.</p>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
            <Button className="flex-1 bg-red-500 hover:bg-red-600" onClick={handleDelete}>Delete Account</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

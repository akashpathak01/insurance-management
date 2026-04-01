import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Search, Plus, Filter, Mail, Phone, User, ArrowRight, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContactStore } from '../store/useContactStore';
import { useAccountStore } from '../store/useAccountStore';
import { Modal, Button } from '../components/ui';
import toast from 'react-hot-toast';

export function Contacts() {
  const { contacts, addContact, updateContact, deleteContact } = useContactStore();
  const { accounts } = useAccountStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    accountId: '',
    accountName: '',
    email: '',
    phone: '',
    status: 'Active'
  });

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.accountName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingContact(null);
    setFormData({
      name: '',
      role: '',
      accountId: accounts[0]?.id || '',
      accountName: accounts[0]?.name || '',
      email: '',
      phone: '',
      status: 'Active'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (contact) => {
    setEditingContact(contact);
    setFormData({ ...contact });
    setIsModalOpen(true);
  };

  const handleOpenDelete = (id) => {
    setDeletingId(id);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedAccount = accounts.find(a => a.id === formData.accountId);
    const submissionData = {
      ...formData,
      accountName: selectedAccount?.name || ''
    };

    if (editingContact) {
      updateContact(editingContact.id, submissionData);
      toast.success('Contact updated successfully');
    } else {
      addContact(submissionData);
      toast.success('Contact added successfully');
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    deleteContact(deletingId);
    toast.success('Contact deleted successfully');
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Contacts</h1>
          <p className="text-slate-500 font-medium italic">Relationship Management & Connections</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="gradient-btn font-bold flex items-center gap-2"
        >
          <Plus size={18} />
          New Contact
        </button>
      </div>

      <div className="premium-card p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -transform -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, email, or company..." 
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredContacts.map((c, i) => (
          <motion.div 
            key={c.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            className="premium-card p-6 flex flex-col items-center text-center group cursor-pointer relative"
          >
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
              <button 
                onClick={(e) => { e.stopPropagation(); handleOpenEdit(c); }}
                className="p-1.5 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-lg transition-all"
              >
                <Edit2 size={16} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); handleOpenDelete(c.id); }}
                className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-50 rounded-lg transition-all"
              >
                <Trash2 size={16} />
              </button>
            </div>
            
            <div className="w-20 h-20 rounded-full border-4 border-slate-50 overflow-hidden mb-4 shadow-sm group-hover:border-primary/20 transition-all">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${c.name}`} alt={c.name} className="w-full h-full object-cover" />
            </div>
            
            <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-primary transition-colors">{c.name}</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 truncate w-full">{c.role} @ {c.accountName}</p>
            
            <div className="w-full space-y-3 mb-6">
               <div className="flex items-center justify-center gap-2 text-xs text-slate-500 truncate">
                 <Mail size={14} className="text-slate-300 shrink-0" />
                 <span className="truncate">{c.email}</span>
               </div>
               <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                 <Phone size={14} className="text-slate-300 shrink-0" />
                 {c.phone}
               </div>
            </div>

            <div className="flex items-center gap-2 mt-auto pt-4 border-t border-slate-50 w-full justify-center">
              <span className={twMerge(
                "px-2 py-0.5 rounded text-[10px] font-bold tracking-tighter uppercase border",
                c.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                c.status === 'Contacted' ? 'bg-cyan-50 text-cyan-600 border-cyan-100' : 'bg-slate-100 text-slate-400 border-slate-200'
              )}>
                {c.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingContact ? 'Edit Contact' : 'New Contact'}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
              <input
                required
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Job Role</label>
              <input
                required
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="CEO, Manager, etc."
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status</label>
              <select
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option>Active</option>
                <option>Contacted</option>
                <option>Inactive</option>
              </select>
            </div>
            <div className="col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Link to Account</label>
              <select
                required
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                value={formData.accountId}
                onChange={(e) => setFormData({ ...formData, accountId: e.target.value })}
              >
                <option value="" disabled>Select an account</option>
                {accounts.map(acc => (
                  <option key={acc.id} value={acc.id}>{acc.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
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
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)} type="button">Cancel</Button>
            <Button className="flex-1" type="submit">{editingContact ? 'Save Changes' : 'Create Contact'}</Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Delete"
      >
        <div className="space-y-6">
          <p className="text-slate-600">Are you sure you want to delete this contact? This action cannot be undone.</p>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
            <Button className="flex-1 bg-red-500 hover:bg-red-600" onClick={handleDelete}>Delete Contact</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

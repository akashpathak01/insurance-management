import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { 
  FileSearch, 
  UserCheck, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  MessageSquare, 
  Paperclip,
  MoreVertical,
  ChevronRight,
  Plus,
  ArrowRight,
  Shield,
  Trash2
} from 'lucide-react';
import { useCaseStore } from '../store/useCaseStore';
import { useAccountStore } from '../store/useAccountStore';
import { usePolicyStore } from '../store/usePolicyStore';
import { Modal, Button } from '../components/ui';
import toast from 'react-hot-toast';

const steps = [
  { id: 1, label: 'New', icon: FileSearch },
  { id: 2, label: 'Review', icon: UserCheck },
  { id: 3, label: 'Decision', icon: CheckCircle2 },
  { id: 4, label: 'Closed', icon: Clock },
];

export function Cases() {
  const { cases, addCase, updateCase, deleteCase } = useCaseStore();
  const { accounts } = useAccountStore();
  const { policies } = usePolicyStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    accountId: '',
    policyId: '',
    description: '',
    priority: 'Medium'
  });

  const availablePolicies = policies.filter(p => p.accountId === formData.accountId);

  const handleOpenAdd = () => {
    setFormData({
      title: '',
      accountId: accounts[0]?.id || '',
      policyId: '',
      description: '',
      priority: 'Medium'
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const account = accounts.find(a => a.id === formData.accountId);
    addCase({
      ...formData,
      customer: account?.name || 'N/A',
      status: 'In Review',
      step: 1
    });
    toast.success('Claim initiated successfully');
    setIsModalOpen(false);
  };

  const handleNextStep = (id, currentStep) => {
    if (currentStep < 4) {
      updateCase(id, { step: currentStep + 1 });
      toast.success('Case status updated');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Claims Management</h1>
          <p className="text-slate-500 font-medium italic">Status Flow: New → Review → Decision → Closed</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="gradient-btn flex items-center gap-2"
        >
          <Plus size={18} />
          Initiate New Claim
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {cases.map((c, i) => (
          <motion.div 
            key={c.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="premium-card p-6 border-l-4 border-primary group hover:shadow-xl transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-primary border border-slate-100 shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                  <FileSearch size={28} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded uppercase tracking-wider">{c.id}</span>
                    <h3 className="text-lg font-bold text-slate-800">{c.title}</h3>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <span className="flex items-center gap-1 font-mono text-xs"><Shield size={12} /> {c.policyId || 'No Policy'}</span>
                    <span className="text-slate-300">•</span>
                    <span className="font-semibold">{c.customer}</span>
                    <span className="text-slate-300">•</span>
                    <span className={twMerge(
                      "font-bold text-[10px] uppercase tracking-tighter",
                      c.priority === 'High' ? "text-rose-500" : "text-amber-500"
                    )}>{c.priority} Priority</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => deleteCase(c.id)}
                  className="p-2 text-slate-300 hover:text-rose-500 transition-colors hover:bg-rose-50 rounded-lg opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>
                <button className="p-2 text-slate-400 hover:text-primary transition-colors hover:bg-slate-50 rounded-lg">
                  <MessageSquare size={18} />
                </button>
                <div className="h-8 w-px bg-slate-100 mx-2"></div>
                <button 
                  onClick={() => handleNextStep(c.id, c.step)}
                  disabled={c.step === 4}
                  className={twMerge(
                    "flex items-center gap-2 font-bold px-4 py-2 rounded-xl transition-all",
                    c.step === 4 ? "bg-slate-50 text-slate-300 cursor-not-allowed" : "bg-primary/5 text-primary hover:bg-primary hover:text-white"
                  )}
                >
                  {c.step === 4 ? 'Resolved' : 'Advance Stage'} <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Timeline UI */}
            <div className="relative mt-12 mb-4">
              <div className="absolute top-5 left-0 w-full h-[2px] bg-slate-100 -z-10">
                <motion.div 
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${((c.step - 1) / (steps.length - 1)) * 100}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between items-center relative px-2 md:px-10">
                {steps.map((step) => {
                  const isCompleted = c.step >= step.id;
                  const isCurrent = c.step === step.id;
                  const Icon = step.icon;

                  return (
                    <div key={step.id} className="flex flex-col items-center gap-3 relative">
                      <div className={twMerge(
                        "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 bg-white border-2",
                        isCompleted ? "border-primary text-primary" : "border-slate-100 text-slate-300 shadow-inner",
                        isCurrent && "bg-primary text-white shadow-lg shadow-primary/30 ring-4 ring-primary/10 scale-125 z-10"
                      )}>
                        <Icon size={18} className={isCurrent ? "animate-pulse" : ""} />
                      </div>
                      <span className={twMerge(
                        "text-[10px] font-bold uppercase tracking-widest absolute -bottom-6 w-20 text-center transition-colors",
                        isCompleted ? "text-primary" : "text-slate-300"
                      )}>{step.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ))}
        {cases.length === 0 && (
          <div className="text-center py-20 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-100">
             <FileSearch size={48} className="mx-auto text-slate-200 mb-4" />
             <p className="text-slate-400 font-medium italic">No claims initiated yet</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Initiate New Claim"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Claim Title</label>
              <input
                required
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Property Damage - Fire"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Customer Account</label>
                <select
                  required
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  value={formData.accountId}
                  onChange={(e) => setFormData({ ...formData, accountId: e.target.value, policyId: '' })}
                >
                  <option value="" disabled>Select Account</option>
                  {accounts.map(acc => (
                    <option key={acc.id} value={acc.id}>{acc.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Linked Policy</label>
                <select
                  required
                  disabled={!formData.accountId}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-50"
                  value={formData.policyId}
                  onChange={(e) => setFormData({ ...formData, policyId: e.target.value })}
                >
                  <option value="" disabled>Select Policy</option>
                  {availablePolicies.map(p => (
                    <option key={p.id} value={p.id}>{p.id} - {p.product}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Priority Level</label>
              <div className="flex gap-2">
                {['Low', 'Medium', 'High'].map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setFormData({ ...formData, priority: p })}
                    className={twMerge(
                      "flex-1 py-2 px-3 rounded-xl border-2 font-bold text-xs uppercase tracking-widest transition-all",
                      formData.priority === p 
                        ? "border-primary bg-primary/5 text-primary" 
                        : "border-slate-50 bg-white text-slate-300"
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Claim Description</label>
              <textarea
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Details about the incident..."
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button className="flex-1" type="submit">Initiate Claim</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

// Helper for tailwind-merge (already imported at top)

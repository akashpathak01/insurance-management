import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Shield, Clock, AlertCircle, CheckCircle2, ChevronRight, FileText, Calendar, DollarSign, Plus, ArrowRight, ArrowLeft, Upload, Trash2, Edit2, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePolicyStore } from '../store/usePolicyStore';
import { useAuthStore, roles } from '../store/useAuthStore';
import { useAccountStore } from '../store/useAccountStore';
import { useProductStore } from '../store/useProductStore';
import { useDocumentStore } from '../store/useDocumentStore';
import { Modal, Button, Card } from '../components/ui';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

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
  const { user } = useAuthStore();
  const { policies, addPolicy, deletePolicy } = usePolicyStore();
  const isUnderwriter = user?.role === roles.UNDERWRITER;
  const { accounts } = useAccountStore();
  const { products } = useProductStore();
  const { addDocument } = useDocumentStore();
  const navigate = useNavigate();

  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [formData, setFormData] = useState({
    accountId: '',
    accountName: '',
    productId: '',
    productName: '',
    coverage: '',
    premium: '',
    expiryDate: '',
    status: 'Pending',
    documents: []
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const stats = [
    { l: 'Active Policies', v: policies.filter(p => p.status === 'Active').length, c: 'text-emerald-500', i: CheckCircle2 },
    { l: 'Expiring Soon', v: policies.filter(p => p.status === 'Expiring').length, c: 'text-rose-500', i: Clock },
    { l: 'Pending Approval', v: policies.filter(p => p.status === 'Pending').length, i: AlertCircle, c: 'text-amber-500' },
    { l: 'Total Coverage', v: '$840M', i: Shield, c: 'text-primary' },
  ];

  const handleOpenWizard = () => {
    setWizardStep(1);
    setFormData({
      accountId: accounts[0]?.id || '',
      accountName: accounts[0]?.name || '',
      productId: products[0]?.id || '',
      productName: products[0]?.name || '',
      coverage: '',
      premium: '',
      expiryDate: '',
      status: 'Pending',
      documents: []
    });
    setIsWizardOpen(true);
  };

  const handleNext = () => setWizardStep(s => s + 1);
  const handleBack = () => setWizardStep(s => s - 1);

  const handleFinish = () => {
    const selectedAccount = accounts.find(a => a.id === formData.accountId);
    const selectedProduct = products.find(p => p.id === formData.productId);
    
    const newPolicy = {
      ...formData,
      accountName: selectedAccount?.name || '',
      product: selectedProduct?.name || formData.productName,
      premium: formData.premium.startsWith('$') ? formData.premium : `$${formData.premium}`,
      coverage: formData.coverage.startsWith('$') ? formData.coverage : `$${formData.coverage}`,
    };

    addPolicy(newPolicy);
    toast.success('Policy created successfully');
    setIsWizardOpen(false);
  };

  const handleOpenDelete = (id) => {
    setDeletingId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    deletePolicy(deletingId);
    toast.success('Policy deleted');
    setIsDeleteModalOpen(false);
  };

  const renderWizardStep = () => {
    switch(wizardStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Step 1: Select Account</h4>
            <div className="grid grid-cols-1 gap-3">
              {accounts.map(acc => (
                <div 
                  key={acc.id}
                  onClick={() => setFormData({ ...formData, accountId: acc.id, accountName: acc.name })}
                  className={twMerge(
                    "p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between",
                    formData.accountId === acc.id ? "border-primary bg-primary/5" : "border-slate-50 hover:border-slate-200 bg-white"
                  )}
                >
                  <div>
                    <p className="font-bold text-slate-800">{acc.name}</p>
                    <p className="text-xs text-slate-400 font-medium">{acc.id}</p>
                  </div>
                  {formData.accountId === acc.id && <CheckCircle2 className="text-primary" size={20} />}
                </div>
              ))}
            </div>
            <Button className="w-full flex items-center justify-center gap-2" onClick={handleNext} disabled={!formData.accountId}>
              Next Step <ArrowRight size={18} />
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Step 2: Select Product</h4>
            <div className="grid grid-cols-1 gap-3">
              {products.map(prod => (
                <div 
                  key={prod.id}
                  onClick={() => setFormData({ ...formData, productId: prod.id, productName: prod.name })}
                  className={twMerge(
                    "p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between",
                    formData.productId === prod.id ? "border-primary bg-primary/5" : "border-slate-50 hover:border-slate-200 bg-white"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Shield className={formData.productId === prod.id ? "text-primary" : "text-slate-300"} size={20} />
                    <div>
                      <p className="font-bold text-slate-800">{prod.name}</p>
                      <p className="text-xs text-slate-400 font-medium">{prod.type}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 flex items-center justify-center gap-2" onClick={handleBack}>
                <ArrowLeft size={18} /> Back
              </Button>
              <Button className="flex-1 flex items-center justify-center gap-2" onClick={handleNext} disabled={!formData.productId}>
                Next Step <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Step 3: Coverage & Premium</h4>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Coverage Amount</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="e.g. 1,000,000"
                    value={formData.coverage}
                    onChange={(e) => setFormData({ ...formData, coverage: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Annual Premium</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="e.g. 12,000"
                    value={formData.premium}
                    onChange={(e) => setFormData({ ...formData, premium: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Expiry Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="date"
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={handleBack}>Back</Button>
              <Button className="flex-1" onClick={handleNext} disabled={!formData.coverage || !formData.premium || !formData.expiryDate}>Confirm Details</Button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Step 4: Finalize & Documents</h4>
            <Card className="bg-slate-50 border-slate-100 p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Account</span>
                <span className="text-sm font-bold text-slate-800">{formData.accountName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Product</span>
                <span className="text-sm font-bold text-slate-800">{formData.productName}</span>
              </div>
              <hr className="border-slate-200" />
              <div className="flex justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Premium</span>
                <span className="text-sm font-bold text-primary font-mono">${formData.premium}</span>
              </div>
            </Card>
            
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 bg-slate-50/50 hover:bg-slate-50 transition-all cursor-pointer">
              <Upload className="text-slate-300" size={32} />
              <p className="text-sm font-bold text-slate-500">Upload Policy Documents</p>
              <p className="text-[10px] text-slate-400">PDF, JPG or PNG (Max 5MB)</p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={handleBack}>Back</Button>
              <Button className="flex-1" onClick={handleFinish}>Issue Policy</Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Policies</h1>
          <p className="text-slate-500 font-medium">Lifecycle Tracking: Pending → Active → Expiring</p>
        </div>
        <div className="flex gap-4">
           <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm text-sm font-bold text-slate-600">
             <Calendar size={18} />
             Next 30 Days
           </div>
           {!isUnderwriter && (
             <button onClick={handleOpenWizard} className="gradient-btn font-bold flex items-center gap-2 shadow-lg shadow-primary/20">
               <Plus size={18} />
               Issue New Policy
             </button>
           )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
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
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Coverage</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Premium</th>
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
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-slate-50/80 transition-all group"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm"><FileText size={18} /></div>
                      <div>
                        <div className="font-bold text-slate-800 flex items-center gap-2">
                          {p.id}
                          <ArrowUpRight size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all" />
                        </div>
                        <div className="text-xs text-slate-500 font-medium">{p.accountName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-bold text-slate-700">{p.product}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-bold text-slate-800 italic font-mono">{p.coverage}</span>
                  </td>
                  <td className="px-6 py-5"><StatusBadge status={p.status} /></td>
                  <td className="px-6 py-5 text-right font-bold text-slate-800 font-mono">{p.premium}</td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-slate-500 font-medium flex items-center gap-1.5">
                      <Calendar size={14} className="text-slate-400" /> {p.expiryDate}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!isUnderwriter && (
                        <button 
                          onClick={() => handleOpenDelete(p.id)}
                          className="p-2 text-slate-400 hover:text-rose-500 hover:bg-white rounded-lg transition-all shadow-sm"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                      <button 
                        onClick={() => navigate(`/policies/${p.id}`)}
                        className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {policies.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-slate-400 italic">No policies issued yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        title="Issue New Policy"
        className="max-w-xl"
      >
        <div className="mb-8 flex justify-between relative px-2">
          {[1, 2, 3, 4].map(step => (
            <div key={step} className="flex flex-col items-center gap-2 relative z-10">
              <div className={twMerge(
                "w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300",
                wizardStep >= step ? "bg-primary text-white shadow-lg shadow-primary/30" : "bg-slate-100 text-slate-400"
              )}>
                {step}
              </div>
            </div>
          ))}
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-slate-100 mx-10 -z-0">
             <motion.div 
               className="h-full bg-primary"
               initial={{ width: 0 }}
               animate={{ width: `${((wizardStep - 1) / 3) * 100}%` }}
               transition={{ duration: 0.3 }}
             />
          </div>
        </div>
        
        {renderWizardStep()}
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Delete"
      >
        <div className="space-y-6">
          <p className="text-slate-600">Are you sure you want to delete this policy? This action cannot be undone.</p>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
            <Button className="flex-1 bg-red-500 hover:bg-red-600" onClick={handleDelete}>Delete Policy</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// Helper for tailwind-merge (already imported at top)

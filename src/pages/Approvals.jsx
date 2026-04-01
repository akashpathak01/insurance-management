import React, { useState, useMemo } from 'react';
import { usePolicyStore } from '../store/usePolicyStore';
import { useCaseStore } from '../store/useCaseStore';
import { 
  CheckCircle, 
  XCircle, 
  Shield, 
  Activity, 
  Search, 
  Filter,
  MessageSquare,
  ChevronRight,
  Clock,
  User,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card, Badge } from '../components/ui';
import toast from 'react-hot-toast';

export function Approvals() {
  const { policies, updatePolicy } = usePolicyStore();
  const { cases, updateCase } = useCaseStore();
  const [activeTab, setActiveTab] = useState('claims');
  const [search, setSearch] = useState('');
  const [comment, setComment] = useState('');
  const [decisionItem, setDecisionItem] = useState(null);

  const pendingPolicies = useMemo(() => 
    policies.filter(p => p.status === 'Pending' && 
    (p.accountName.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase())))
  , [policies, search]);

  const pendingClaims = useMemo(() => 
    cases.filter(c => c.status === 'In Review' && 
    (c.accountName.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase())))
  , [cases, search]);

  const handleDecision = (item, type, action) => {
    const success = action === 'approve';
    if (type === 'policy') {
      updatePolicy(item.id, { status: success ? 'Active' : 'Declined' });
      toast.success(success ? `Policy ${item.id} Activated` : `Policy ${item.id} Declined`);
    } else {
      updateCase(item.id, { status: success ? 'Approved' : 'Rejected', step: success ? 3 : 4 });
      toast.success(success ? `Claim ${item.id} Approved` : `Claim ${item.id} Rejected`);
    }
    setDecisionItem(null);
    setComment('');
  };

  const renderClaimCard = (claim) => (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="premium-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-primary/20 transition-all border-l-4 border-l-amber-500"
    >
      <div className="flex items-center gap-5">
        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shadow-sm">
          <Activity size={24} />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-slate-800">{claim.description || claim.title}</h4>
            <Badge variant={claim.priority === 'High' ? 'danger' : 'warning'}>{claim.priority}</Badge>
          </div>
          <p className="text-sm text-slate-500 flex items-center gap-2">
            <User size={14} /> {claim.accountName} • <Clock size={14} /> {claim.date}
          </p>
          <div className="mt-2 text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-4">
             <span>ID: {claim.id}</span>
             <span>Amount: {claim.amount || '$0'}</span>
             <span>Agent: {claim.agentName || 'Unassigned'}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={() => setDecisionItem({ ...claim, type: 'claim', action: 'reject' })} className="text-rose-500 border-rose-100 hover:bg-rose-50">
          <XCircle size={16} className="mr-2" /> Reject
        </Button>
        <Button size="sm" onClick={() => setDecisionItem({ ...claim, type: 'claim', action: 'approve' })} className="bg-emerald-500 hover:bg-emerald-600 text-white">
          <CheckCircle size={16} className="mr-2" /> Approve
        </Button>
      </div>
    </motion.div>
  );

  const renderPolicyCard = (policy) => (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="premium-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-primary/20 transition-all border-l-4 border-l-primary"
    >
      <div className="flex items-center gap-5">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-primary flex items-center justify-center shadow-sm">
          <Shield size={24} />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-slate-800">{policy.product}</h4>
            <Badge variant="primary">Pending Review</Badge>
          </div>
          <p className="text-sm text-slate-500 flex items-center gap-2">
            <User size={14} /> {policy.accountName} • <ArrowUpRight size={14} /> {policy.coverage}
          </p>
          <div className="mt-2 text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-4">
             <span>ID: {policy.id}</span>
             <span>Premium: {policy.premium}</span>
             <span>Due: {policy.expiryDate}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={() => setDecisionItem({ ...policy, type: 'policy', action: 'reject' })} className="text-rose-500 border-rose-100 hover:bg-rose-50">
          <XCircle size={16} className="mr-2" /> Decline
        </Button>
        <Button size="sm" onClick={() => setDecisionItem({ ...policy, type: 'policy', action: 'approve' })} className="bg-primary hover:bg-indigo-700 text-white shadow-lg shadow-primary/20">
          <CheckCircle size={16} className="mr-2" /> Activate
        </Button>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Operational Approvals</h1>
          <p className="text-slate-500 font-medium">Review and authorize pending claims and insurance policies</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
           <div className="relative">
             <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
             <input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by ID or Client..." 
              className="pl-10 pr-4 py-2 bg-slate-50 rounded-xl border-none text-sm focus:ring-2 focus:ring-primary/20 outline-none w-64"
             />
           </div>
           <Button variant="outline" size="sm" className="rounded-xl"><Filter size={16} className="mr-2"/> Filters</Button>
        </div>
      </div>

      <div className="flex border-b border-slate-200 gap-8">
        <button 
          onClick={() => setActiveTab('claims')}
          className={`pb-4 text-sm font-bold transition-all relative ${activeTab === 'claims' ? 'text-primary' : 'text-slate-400 hover:text-slate-600'}`}
        >
          Claims Queue
          {pendingClaims.length > 0 && <span className="ml-2 px-2 py-0.5 bg-rose-500 text-white text-[10px] rounded-full">{pendingClaims.length}</span>}
          {activeTab === 'claims' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />}
        </button>
        <button 
          onClick={() => setActiveTab('policies')}
          className={`pb-4 text-sm font-bold transition-all relative ${activeTab === 'policies' ? 'text-primary' : 'text-slate-400 hover:text-slate-600'}`}
        >
          Policies Queue
          {pendingPolicies.length > 0 && <span className="ml-2 px-2 py-0.5 bg-primary text-white text-[10px] rounded-full">{pendingPolicies.length}</span>}
          {activeTab === 'policies' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />}
        </button>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {activeTab === 'claims' ? (
            pendingClaims.length > 0 ? (
              pendingClaims.map(renderClaimCard)
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-20 text-center text-slate-400 italic bg-white rounded-3xl border-2 border-dashed border-slate-100">
                All claims have been processed!
              </motion.div>
            )
          ) : (
            pendingPolicies.length > 0 ? (
              pendingPolicies.map(renderPolicyCard)
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-20 text-center text-slate-400 italic bg-white rounded-3xl border-2 border-dashed border-slate-100">
                No policies awaiting activation.
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>

      {/* Decision Modal */}
      <AnimatePresence>
        {decisionItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full"
            >
              <h3 className="text-xl font-bold text-slate-800 mb-2">Confirm Authorization</h3>
              <p className="text-sm text-slate-500 mb-6">You are about to <span className="font-bold underline uppercase">{decisionItem.action}</span> the {decisionItem.type} for <span className="text-slate-800 font-bold">{decisionItem.accountName}</span>. This action is recorded in the audit log.</p>
              
              <div className="space-y-2 mb-6">
                <label className="text-xs font-bold text-slate-400 uppercase">Reason / Comment (Optional)</label>
                <textarea 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 min-h-[100px] text-sm"
                  placeholder="Enter notes for the requester..."
                />
              </div>

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1" onClick={() => setDecisionItem(null)}>Cancel</Button>
                <Button 
                  className={`flex-1 ${decisionItem.action === 'approve' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-rose-500 hover:bg-rose-600'} text-white font-bold`}
                  onClick={() => handleDecision(decisionItem, decisionItem.type, decisionItem.action)}
                >
                  Confirm Action
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

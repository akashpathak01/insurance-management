import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Building2, 
  Users, 
  Briefcase, 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  Shield,
  Clock,
  ChevronRight,
  Plus
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAccountStore } from '../store/useAccountStore';
import { useContactStore } from '../store/useContactStore';
import { usePolicyStore } from '../store/usePolicyStore';
import { useDocumentStore } from '../store/useDocumentStore';
import { Card, Button } from '../components/ui';

export function AccountDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { accounts } = useAccountStore();
  const { contacts } = useContactStore();
  const { policies } = usePolicyStore();
  const { documents } = useDocumentStore();

  const account = accounts.find(acc => acc.id === id);
  const accountContacts = contacts.filter(c => c.accountId === id);
  const accountPolicies = policies.filter(p => p.accountId === id);
  const accountDocuments = documents.filter(d => d.linkTo === id || accountPolicies.some(p => p.id === d.linkTo));

  if (!account) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Account Not Found</h2>
        <Button onClick={() => navigate('/accounts')}>Back to Accounts</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/accounts')}
          className="p-2 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-200 shadow-sm text-slate-400 hover:text-slate-600"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-slate-800">{account.name}</h1>
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-lg uppercase tracking-wider">{account.type}</span>
          </div>
          <p className="text-slate-500 font-medium">Account ID: {account.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card className="space-y-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Building2 size={20} className="text-primary" />
              Account Info
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-50 rounded-lg text-slate-400"><Mail size={16} /></div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Email</p>
                  <p className="text-sm font-semibold text-slate-700">{account.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-50 rounded-lg text-slate-400"><Phone size={16} /></div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Phone</p>
                  <p className="text-sm font-semibold text-slate-700">{account.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-50 rounded-lg text-slate-400"><MapPin size={16} /></div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Address</p>
                  <p className="text-sm font-semibold text-slate-700">{account.address || 'No address provided'}</p>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-50">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-slate-500">Total Value</span>
                <span className="text-lg font-bold text-primary italic font-mono">{account.value}</span>
              </div>
              <div className={`px-4 py-2 rounded-xl text-center text-sm font-bold border ${
                account.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
              }`}>
                {account.status}
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Users size={20} className="text-primary" />
                Contacts
              </h3>
              <span className="text-xs font-bold text-slate-400">{accountContacts.length}</span>
            </div>
            <div className="space-y-4">
              {accountContacts.map((contact) => (
                <div key={contact.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-transparent hover:border-primary/20 transition-all cursor-pointer group">
                  <div className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-primary font-bold shadow-sm">
                    {contact.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-800 truncate group-hover:text-primary transition-colors">{contact.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{contact.role}</p>
                  </div>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-primary transition-colors" />
                </div>
              ))}
              {accountContacts.length === 0 && (
                <p className="text-sm text-slate-400 italic text-center py-4">No contacts linked</p>
              )}
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="premium-card p-6">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Briefcase size={22} className="text-primary" />
                Active Policies
              </h3>
              <Button variant="outline" className="text-xs py-1.5 px-4 rounded-lg flex items-center gap-2" onClick={() => navigate('/policies')}>
                <Plus size={14} /> New Policy
              </Button>
            </div>
            
            <div className="space-y-4">
              {accountPolicies.map((policy) => (
                <div key={policy.id} className="p-5 border border-slate-100 rounded-2xl hover:border-primary/30 hover:bg-slate-50/50 transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all"></div>
                  <div className="flex items-center justify-between relative">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-primary">
                        <Shield size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">{policy.product}</h4>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-[10px] font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">{policy.id}</span>
                          <span className="text-xs text-slate-500 flex items-center gap-1"><Clock size={12} /> Expires: {policy.expiryDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-slate-800 font-mono">{policy.premium}</p>
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                        policy.status === 'Active' ? 'text-emerald-500' : 'text-amber-500'
                      }`}>{policy.status}</span>
                    </div>
                  </div>
                </div>
              ))}
              {accountPolicies.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-3xl">
                  <Briefcase size={40} className="mx-auto text-slate-200 mb-3" />
                  <p className="text-slate-400 font-medium">No policies found for this account</p>
                </div>
              )}
            </div>
          </div>

          <div className="premium-card p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <FileText size={22} className="text-primary" />
              Documents
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {accountDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center gap-4 p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all cursor-pointer group">
                  <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <FileText size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-800 truncate">{doc.name}</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      <span>{doc.type}</span>
                      <span>•</span>
                      <span>{doc.size}</span>
                    </div>
                  </div>
                  <ExternalLink size={16} className="text-slate-300 group-hover:text-primary transition-all" />
                </div>
              ))}
              {accountDocuments.length === 0 && (
                <div className="col-span-2 text-center py-8">
                  <FileText size={32} className="mx-auto text-slate-200 mb-2" />
                  <p className="text-slate-400 text-sm font-medium">No documents linked</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

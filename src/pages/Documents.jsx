import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { FileText, Download, Trash2, Eye, Plus, Search, Folder, File, Share2, MoreVertical, Shield, Upload, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDocumentStore } from '../store/useDocumentStore';
import { useAuthStore, roles } from '../store/useAuthStore';
import { useAccountStore } from '../store/useAccountStore';
import { usePolicyStore } from '../store/usePolicyStore';
import { Modal, Button } from '../components/ui';
import toast from 'react-hot-toast';

export function Documents() {
  const { user } = useAuthStore();
  const { documents, addDocument, deleteDocument } = useDocumentStore();
  const isUnderwriter = user?.role === roles.UNDERWRITER;
  const { accounts } = useAccountStore();
  const { policies } = usePolicyStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'PDF',
    linkTo: '',
    status: 'Secured'
  });

  const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      type: 'PDF',
      linkTo: accounts[0]?.id || '',
      status: 'Secured'
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addDocument({
      ...formData,
      size: `${(Math.random() * 5 + 1).toFixed(1)} MB`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    });
    toast.success('Document uploaded');
    setIsModalOpen(false);
  };

  const stats = [
    { l: 'Total Storage', v: '1.2 GB', i: Shield, c: 'text-primary' },
    { l: 'Total Files', v: documents.length, i: FileText, c: 'text-indigo-500' },
    { l: 'Secured Docs', v: documents.filter(d => d.status === 'Secured').length, i: Shield, c: 'text-emerald-500' },
    { l: 'Recent Uploads', v: '2', i: Plus, c: 'text-cyan-500' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Document Management</h1>
          <p className="text-slate-500 font-medium italic">Secure local and cloud file storage system</p>
        </div>
        <div className="flex gap-3">
          <button className="hidden md:flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white text-slate-600 rounded-xl hover:bg-slate-50 transition-colors font-bold shadow-sm">
            <Folder size={18} />
            New Folder
          </button>
          {!isUnderwriter && (
            <button 
              onClick={handleOpenAdd}
              className="gradient-btn flex items-center gap-2 font-bold shadow-lg shadow-primary/20"
            >
              <Plus size={18} />
              Upload File
            </button>
          )}
        </div>
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
        <div className="flex flex-col md:flex-row gap-4 mb-6 px-2 pt-2">
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -transform -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by file name or type..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-4">File Name & Type</th>
                <th className="px-6 py-4">Linked To</th>
                <th className="px-6 py-4">Upload Date</th>
                <th className="px-6 py-4">Size</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredDocuments.map((doc, i) => (
                <motion.tr 
                  key={doc.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="hover:bg-slate-50/50 group transition-colors"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all shadow-sm border border-slate-100">
                         <FileText size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 group-hover:text-primary transition-colors cursor-pointer">{doc.name}</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{doc.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-xs font-mono text-slate-400 tracking-tighter">
                    {accounts.find(a => a.id === doc.linkTo)?.name || policies.find(p => p.id === doc.linkTo)?.id || doc.linkTo || 'Unlinked'}
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-500">{doc.date}</td>
                  <td className="px-6 py-5 text-xs text-slate-500 font-bold">{doc.size}</td>
                  <td className="px-6 py-5">
                    <span className={twMerge(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                      doc.status === 'Secured' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      doc.status === 'Shared' ? 'bg-cyan-50 text-cyan-600 border-cyan-100' :
                      'bg-amber-50 text-amber-600 border-amber-100'
                    )}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-primary hover:bg-white rounded-lg transition-all shadow-sm border border-transparent hover:border-slate-100"><Eye size={16} /></button>
                      <button className="p-2 text-slate-400 hover:text-primary hover:bg-white rounded-lg transition-all shadow-sm border border-transparent hover:border-slate-100"><Download size={16} /></button>
                      {!isUnderwriter && (
                        <button 
                          onClick={() => deleteDocument(doc.id)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded-lg transition-all shadow-sm border border-transparent hover:border-slate-100"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filteredDocuments.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-400 italic">No documents found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Upload Document"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="border-2 border-dashed border-slate-100 rounded-2xl p-10 flex flex-col items-center justify-center gap-3 bg-slate-50 group hover:border-primary/30 transition-all cursor-pointer">
               <Upload size={40} className="text-slate-300 group-hover:text-primary group-hover:scale-110 transition-all" />
               <p className="text-sm font-bold text-slate-500 group-hover:text-slate-800">Click or drag to upload</p>
               <p className="text-[10px] text-slate-400 uppercase tracking-widest">PDF, DOCX, XLSX (MAX 10MB)</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Document Name</label>
              <input
                required
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Policy_Terms_V1_Final"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">File Type</label>
                <select
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option>PDF</option>
                  <option>DOCX</option>
                  <option>XLSX</option>
                  <option>JPG</option>
                  <option>PNG</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Link To</label>
                <select
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  value={formData.linkTo}
                  onChange={(e) => setFormData({ ...formData, linkTo: e.target.value })}
                >
                  <optgroup label="Accounts">
                    {accounts.map(acc => (
                      <option key={acc.id} value={acc.id}>{acc.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Policies">
                    {policies.map(p => (
                      <option key={p.id} value={p.id}>{p.id} - {p.product}</option>
                    ))}
                  </optgroup>
                </select>
              </div>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button className="flex-1" type="submit">Verify & Upload</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

// Helper for tailwind-merge and clsx (already imported at top)

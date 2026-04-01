import React from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';
import { FileText, Download, Trash2, Eye, Plus, Search, Folder, File, Share2, MoreVertical, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const documents = [
  { id: 'DOC-102', name: 'Policy_Terms_V2.pdf', type: 'PDF', size: '1.4 MB', date: 'Oct 28', owner: 'Robert Chen', status: 'Secured' },
  { id: 'DOC-103', name: 'Claims_Form_Medical.docx', type: 'DOCX', size: '840 KB', date: 'Oct 27', owner: 'Emily Davis', status: 'Shared' },
  { id: 'DOC-104', name: 'Liability_Chart_Q4.xlsx', type: 'XLSX', size: '3.2 MB', date: 'Oct 26', owner: 'Sarah Jenkins', status: 'Internal' },
  { id: 'DOC-105', name: 'Identity_Verif_Miller.jpg', type: 'JPG', size: '4.5 MB', date: 'Oct 25', owner: 'Michael Chen', status: 'Secured' },
];

export function Documents() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Document Management</h1>
          <p className="text-slate-500 font-medium">Secure local and cloud file storage system</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white text-slate-600 rounded-xl hover:bg-slate-50 transition-colors font-bold shadow-sm">
            <Folder size={18} />
            New Folder
          </button>
          <button className="gradient-btn flex items-center gap-2 font-bold shadow-lg shadow-primary/20">
            <Plus size={18} />
            Upload File
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { l: 'Total Storage', v: '124 GB', i: Shield, c: 'text-primary' },
          { l: 'Total Files', v: '8,412', i: FileText, c: 'text-indigo-500' },
          { l: 'Secured Docs', v: '2,145', i: Shield, c: 'text-emerald-500' },
          { l: 'Recent Uploads', v: '14', i: Plus, c: 'text-cyan-500' },
        ].map((stat, i) => (
          <div key={i} className="premium-card p-6 border-b-4 border-slate-50 hover:border-primary transition-all group cursor-default">
            <stat.i size={20} className={`${stat.c} mb-3 transition-transform group-hover:scale-110`} />
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.l}</p>
            <h4 className="text-xl font-bold text-slate-800 mt-1">{stat.v}</h4>
          </div>
        ))}
      </div>

      <div className="premium-card p-4">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -transform -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by file name, tag, or owner..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">File Name & Type</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Storage ID</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Upload Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Size</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {documents.map((doc, i) => (
                <motion.tr 
                  key={doc.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-slate-50/50 group transition-colors"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all shadow-sm border border-slate-100">
                         <FileText size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 group-hover:text-primary transition-colors cursor-pointer">{doc.name}</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{doc.type} • {doc.owner}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-xs font-mono text-slate-400 tracking-tighter">{doc.id}</td>
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
                      <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded-lg transition-all shadow-sm border border-transparent hover:border-slate-100"><Trash2 size={16} /></button>
                      <button className="p-2 text-slate-400 hover:text-primary hover:bg-white rounded-lg transition-all shadow-sm border border-transparent hover:border-slate-100"><MoreVertical size={16} /></button>
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

// Helper for tailwind-merge and clsx (already imported at top)

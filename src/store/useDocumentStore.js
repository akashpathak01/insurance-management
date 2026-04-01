import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialDocuments = [
  { id: 'DOC-101', name: 'Contract_GlobalTech.pdf', type: 'PDF', size: '2.4 MB', uploadedBy: 'Sarah Miller', date: '2023-11-01', linkTo: 'ACC-1001', category: 'Accounts' },
  { id: 'DOC-102', name: 'Identity_Proof_James.jpg', type: 'JPG', size: '1.2 MB', uploadedBy: 'James Wilson', date: '2023-11-05', linkTo: 'CON-1002', category: 'Contacts' },
  { id: 'DOC-103', name: 'Policy_Cyber_v1.pdf', type: 'PDF', size: '4.5 MB', uploadedBy: 'Admin', date: '2023-11-10', linkTo: 'POL-9042', category: 'Policies' },
  { id: 'DOC-104', name: 'Claim_Photos.zip', type: 'ZIP', size: '15.8 MB', uploadedBy: 'Sarah Miller', date: '2023-12-14', linkTo: 'CAS-402', category: 'Cases' },
];

export const useDocumentStore = create(
  persist(
    (set) => ({
      documents: initialDocuments,
      addDocument: (doc) => set((state) => ({ 
        documents: [{ ...doc, id: `DOC-${Math.floor(100 + Math.random() * 900)}`, date: new Date().toISOString().split('T')[0] }, ...state.documents] 
      })),
      deleteDocument: (id) => set((state) => ({
        documents: state.documents.filter((d) => d.id !== id)
      })),
    }),
    {
      name: 'document-storage',
    }
  )
);

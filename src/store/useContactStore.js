import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialContacts = [
  { id: 'CON-1001', name: 'Sarah Miller', accountId: 'ACC-1001', accountName: 'Global Tech Solutions', email: 'sarah@globaltech.com', phone: '+1 415-555-0123', role: 'CTO', status: 'Active' },
  { id: 'CON-1002', name: 'James Wilson', accountId: 'ACC-1002', accountName: 'Apex Logistics', email: 'j.wilson@apex.com', phone: '+1 212-555-4567', role: 'COO', status: 'Active' },
  { id: 'CON-1003', name: 'Emily Chen', accountId: 'ACC-1003', accountName: 'Nova Healthcare', email: 'emily.c@nova.org', phone: '+1 312-555-8901', role: 'Director of Ops', status: 'Active' },
  { id: 'CON-1004', name: 'Michael Brown', accountId: 'ACC-1004', accountName: 'Peak Financial', email: 'mbrown@peak.com', phone: '+1 617-555-2345', role: 'Founder', status: 'Inactive' },
  { id: 'CON-1005', name: 'Laura White', accountId: 'ACC-1005', accountName: 'Summit Retail', email: 'laura@summit.io', phone: '+1 512-555-6789', role: 'Manager', status: 'Active' },
];

export const useContactStore = create(
  persist(
    (set) => ({
      contacts: initialContacts,
      addContact: (contact) => set((state) => ({ 
        contacts: [{ ...contact, id: `CON-${Math.floor(1000 + Math.random() * 9000)}` }, ...state.contacts] 
      })),
      updateContact: (id, updatedContact) => set((state) => ({
        contacts: state.contacts.map((c) => c.id === id ? { ...c, ...updatedContact } : c)
      })),
      deleteContact: (id) => set((state) => ({
        contacts: state.contacts.filter((c) => c.id !== id)
      })),
    }),
    {
      name: 'contact-storage',
    }
  )
);

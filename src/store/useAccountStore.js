import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialAccounts = [
  { id: 'ACC-1001', name: 'Global Tech Solutions', type: 'Enterprise', contact: 'Sarah Miller', email: 'sarah@globaltech.com', phone: '+1 415-555-0123', address: '123 Tech Lane, San Francisco, CA', status: 'Active', value: '$450,000' },
  { id: 'ACC-1002', name: 'Apex Logistics', type: 'Mid-Market', contact: 'James Wilson', email: 'j.wilson@apex.com', phone: '+1 212-555-4567', address: '456 Logistics Way, New York, NY', status: 'Pending', value: '$85,000' },
  { id: 'ACC-1003', name: 'Nova Healthcare', type: 'Enterprise', contact: 'Emily Chen', email: 'emily.c@nova.org', phone: '+1 312-555-8901', address: '789 Health Blvd, Chicago, IL', status: 'Active', value: '$1.2M' },
  { id: 'ACC-1004', name: 'Peak Financial', type: 'Small Business', contact: 'Michael Brown', email: 'mbrown@peak.com', phone: '+1 617-555-2345', address: '101 Finance St, Boston, MA', status: 'Inactive', value: '$12,000' },
  { id: 'ACC-1005', name: 'Summit Retail', type: 'Mid-Market', contact: 'Laura White', email: 'laura@summit.io', phone: '+1 512-555-6789', address: '202 Retail Rd, Austin, TX', status: 'Active', value: '$320,000' },
];

export const useAccountStore = create(
  persist(
    (set) => ({
      accounts: initialAccounts,
      addAccount: (account) => set((state) => ({ 
        accounts: [{ ...account, id: `ACC-${Math.floor(1000 + Math.random() * 9000)}` }, ...state.accounts] 
      })),
      updateAccount: (id, updatedAccount) => set((state) => ({
        accounts: state.accounts.map((acc) => acc.id === id ? { ...acc, ...updatedAccount } : acc)
      })),
      deleteAccount: (id) => set((state) => ({
        accounts: state.accounts.filter((acc) => acc.id !== id)
      })),
    }),
    {
      name: 'account-storage',
    }
  )
);

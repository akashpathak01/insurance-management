import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialPolicies = [
  { id: 'POL-9042', accountId: 'ACC-1001', accountName: 'Global Tech Solutions', product: 'Cyber Liability', coverage: '$2,000,000', premium: '$12,400', status: 'Active', expiryDate: '2024-12-20' },
  { id: 'POL-9043', accountId: 'ACC-1002', accountName: 'Apex Logistics', product: 'Commercial Auto', coverage: '$500,000', premium: '$3,200', status: 'Active', expiryDate: '2024-11-15' },
  { id: 'POL-9044', accountId: 'ACC-1003', accountName: 'Nova Healthcare', product: 'Professional Indemnity', coverage: '$5,000,000', premium: '$45,000', status: 'Pending', expiryDate: '2025-01-10' },
  { id: 'POL-9045', accountId: 'ACC-1004', accountName: 'Peak Financial', product: 'General Liability', coverage: '$1,000,000', premium: '$8,500', status: 'Expiring', expiryDate: '2024-05-01' },
  { id: 'POL-9046', accountId: 'ACC-1005', accountName: 'Tech Innovators', product: 'Workers Comp', coverage: '$1,000,000', premium: '$6,200', status: 'Pending', expiryDate: '2025-02-15' },
];

export const usePolicyStore = create(
  persist(
    (set) => ({
      policies: initialPolicies,
      addPolicy: (policy) => set((state) => ({ 
        policies: [{ ...policy, id: `POL-${Math.floor(1000 + Math.random() * 9000)}` }, ...state.policies] 
      })),
      updatePolicy: (id, updatedPolicy) => set((state) => ({
        policies: state.policies.map((p) => p.id === id ? { ...p, ...updatedPolicy } : p)
      })),
      deletePolicy: (id) => set((state) => ({
        policies: state.policies.filter((p) => p.id !== id)
      })),
    }),
    {
      name: 'policy-storage',
    }
  )
);

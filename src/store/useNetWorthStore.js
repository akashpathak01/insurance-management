import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialNetWorth = [
  { id: 'NW-101', accountId: 'ACC-1001', type: 'Asset', name: 'Real Estate Portfolio', value: 2500000, date: '2023-11-20' },
  { id: 'NW-102', accountId: 'ACC-1001', type: 'Liability', name: 'Commercial Mortgage', value: 800000, date: '2023-11-20' },
  { id: 'NW-103', accountId: 'ACC-1002', type: 'Asset', name: 'Logistics Fleet', value: 1200000, date: '2023-11-21' },
];

export const useNetWorthStore = create(
  persist(
    (set) => ({
      netWorthRecords: initialNetWorth,
      addRecord: (record) => set((state) => ({ 
        netWorthRecords: [{ ...record, id: `NW-${Math.floor(100 + Math.random() * 900)}` }, ...state.netWorthRecords] 
      })),
      updateRecord: (id, updatedRecord) => set((state) => ({
        netWorthRecords: state.netWorthRecords.map((r) => r.id === id ? { ...r, ...updatedRecord } : r)
      })),
      deleteRecord: (id) => set((state) => ({
        netWorthRecords: state.netWorthRecords.filter((r) => r.id !== id)
      })),
    }),
    {
      name: 'net-worth-storage',
    }
  )
);

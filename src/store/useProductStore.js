import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialProducts = [
  { id: 'PROD-01', name: 'Cyber Liability', type: 'Specialty', price: '$12,400', description: 'Protection against data breaches and cyber attacks.' },
  { id: 'PROD-02', name: 'Professional Indemnity', type: 'Liability', price: '$45,000', description: 'Covers legal costs and damages for professional negligence.' },
  { id: 'PROD-03', name: 'Commercial Auto', type: 'Asset', price: '$3,200', description: 'Coverage for business vehicles and drivers.' },
  { id: 'PROD-04', name: 'General Liability', type: 'Core', price: '$8,500', description: 'Broad protection against common business risks.' },
];

export const useProductStore = create(
  persist(
    (set) => ({
      products: initialProducts,
      addProduct: (product) => set((state) => ({ 
        products: [{ ...product, id: `PROD-${Math.floor(10 + Math.random() * 90)}` }, ...state.products] 
      })),
      updateProduct: (id, updatedProduct) => set((state) => ({
        products: state.products.map((p) => p.id === id ? { ...p, ...updatedProduct } : p)
      })),
      deleteProduct: (id) => set((state) => ({
        products: state.products.filter((p) => p.id !== id)
      })),
    }),
    {
      name: 'product-storage',
    }
  )
);

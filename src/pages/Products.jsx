import React, { useState } from 'react';
import { Package, Shield, Heart, Car, Activity, Plus, ShoppingBag, Edit2, Trash2, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useProductStore } from '../store/useProductStore';
import { Modal, Button } from '../components/ui';
import toast from 'react-hot-toast';

const icons = {
  Life: Shield,
  Health: Heart,
  Auto: Car,
  Property: Package,
  Travel: Globe,
  Business: ShoppingBag,
  Specialty: Activity,
  Liability: Shield,
  Core: Package,
  Asset: Car
};

const colors = {
  Life: 'border-indigo-500 bg-indigo-50 text-indigo-600',
  Health: 'border-cyan-500 bg-cyan-50 text-cyan-600',
  Auto: 'border-rose-500 bg-rose-50 text-rose-600',
  Property: 'border-amber-500 bg-amber-50 text-amber-600',
  Travel: 'border-violet-500 bg-violet-50 text-violet-600',
  Business: 'border-emerald-500 bg-emerald-50 text-emerald-600',
  Specialty: 'border-indigo-500 bg-indigo-50 text-indigo-600',
  Liability: 'border-blue-500 bg-blue-50 text-blue-600',
  Core: 'border-slate-500 bg-slate-50 text-slate-600',
  Asset: 'border-orange-500 bg-orange-50 text-orange-600'
};

export function Products() {
  const { products, addProduct, updateProduct, deleteProduct } = useProductStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    type: 'Life',
    price: '',
    description: ''
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({ name: '', type: 'Life', price: '', description: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p) => {
    setEditingProduct(p);
    setFormData({ ...p });
    setIsModalOpen(true);
  };

  const handleOpenDelete = (id) => {
    setDeletingId(id);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
      toast.success('Product updated');
    } else {
      addProduct(formData);
      toast.success('Product launched');
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    deleteProduct(deletingId);
    toast.success('Product removed');
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Product Catalog</h1>
          <p className="text-slate-500 font-medium italic">Available Insurance Solutions</p>
        </div>
        <button onClick={handleOpenAdd} className="gradient-btn font-bold flex items-center gap-2 shadow-lg shadow-primary/20">
          <Plus size={18} />
          Launch New Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((p, i) => {
          const Icon = icons[p.type] || Package;
          const colorClass = colors[p.type] || 'border-slate-500 bg-slate-50 text-slate-600';
          
          return (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -8 }}
              className={`premium-card border-t-4 ${colorClass.split(' ')[0]} p-8 flex flex-col group relative overflow-hidden`}
            >
              <div className="absolute top-4 right-4 flex gap-1 z-10">
                <button 
                  onClick={() => handleOpenEdit(p)}
                  className="p-1.5 text-slate-300 hover:text-primary hover:bg-white/80 rounded-lg transition-all shadow-sm border border-transparent hover:border-slate-100"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={() => handleOpenDelete(p.id)}
                  className="p-1.5 text-slate-300 hover:text-rose-500 hover:bg-white/80 rounded-lg transition-all shadow-sm border border-transparent hover:border-slate-100"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className={`w-16 h-16 rounded-2xl ${colorClass.split(' ').slice(1).join(' ')} flex items-center justify-center mb-6 shadow-sm group-hover:rotate-12 transition-transform duration-300`}>
                <Icon size={32} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-slate-800 truncate">{p.name}</h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.type}</span>
                </div>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed line-clamp-3">{p.description}</p>
              </div>

              <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Starting Price</p>
                  <p className="text-xl font-bold text-slate-800 italic font-mono">{p.price}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-300 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                   <Shield size={20} />
                </div>
              </div>

              <div className={`absolute -right-8 -top-8 w-24 h-24 ${colorClass.split(' ')[1]} rounded-full opacity-20 blur-2xl group-hover:opacity-40 transition-opacity`}></div>
            </motion.div>
          );
        })}
        {products.length === 0 && (
          <div className="col-span-3 text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <Package size={48} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-400 font-medium">No products in the catalog</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? 'Edit Product' : 'Launch New Product'}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Product Name</label>
              <input
                required
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Elite Life Premier"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Category</label>
                <select
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  {Object.keys(icons).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Price Point</label>
                <input
                  required
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="$100/mo"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Description</label>
              <textarea
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Briefly describe the product coverage..."
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button className="flex-1" type="submit">{editingProduct ? 'Save Changes' : 'Launch Product'}</Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Delete"
      >
        <div className="space-y-6">
          <p className="text-slate-600">Are you sure you want to remove this product? This will not affect existing policies.</p>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
            <Button className="flex-1 bg-red-500 hover:bg-red-600" onClick={handleDelete}>Remove Product</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

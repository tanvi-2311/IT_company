import React, { useState, useEffect } from 'react';
import { Trash2, UserPlus, Shield, X, Settings } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const UserManagement = () => {
  const [subAdmins, setSubAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', permissions: ['view']
  });

  const PERMISSIONS = [
    { id: 'view', label: 'View' },
    { id: 'upload', label: 'Upload' },
    { id: 'edit', label: 'Edit' },
    { id: 'delete', label: 'Delete' }
  ];

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:5001/api/users/subadmins', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setSubAdmins(data);
      }
    } catch (error) {
      toast.error('Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchUsers();
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePermissionChange = (permId) => {
    setFormData(prev => {
      const perms = prev.permissions;
      if (perms.includes(permId)) {
        return { ...prev, permissions: perms.filter(p => p !== permId) };
      } else {
        return { ...prev, permissions: [...perms, permId] };
      }
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5001/api/users/subadmins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        toast.success('Sub-admin created successfully');
        setFormData({ name: '', email: '', password: '', permissions: ['view'] });
        fetchUsers();
      } else {
        const data = await res.json();
        toast.error(data.message || 'Creation failed');
      }
    } catch (error) {
      toast.error('Error creating user');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this sub-admin?')) return;
    try {
      const res = await fetch(`http://localhost:5001/api/users/subadmins/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (res.ok) {
        toast.success('Sub-admin deleted');
        fetchUsers();
      } else {
        toast.error('Failed to delete user');
      }
    } catch (error) {
      toast.error('Error deleting user');
    }
  };

  if (user?.role !== 'admin') return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden p-6 mb-8">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="text-primary" size={24} />
        <h2 className="text-xl font-black text-secondary">Manage Sub-Admins</h2>
      </div>

      <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div>
          <label className="text-xs font-bold text-slate-600">Name</label>
          <input required name="name" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded-lg text-sm mt-1" placeholder="John Doe" />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-600">Email</label>
          <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border p-2 rounded-lg text-sm mt-1" placeholder="john@vedanco.com" />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-600">Password</label>
          <input required type="password" name="password" value={formData.password} onChange={handleChange} className="w-full border p-2 rounded-lg text-sm mt-1" placeholder="••••••••" />
        </div>
        <div className="flex flex-col justify-end md:col-span-3">
          <button 
            type="button" 
            onClick={() => setIsPermissionModalOpen(true)}
            className="w-full bg-slate-100 text-slate-700 border border-slate-200 py-2 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"
          >
            <Settings size={16} /> 
            Assign Permissions ({formData.permissions.length} selected)
          </button>
        </div>
        <div className="flex items-end md:col-start-4">
          <button type="submit" className="w-full bg-secondary text-white py-2 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors">
            <UserPlus size={16} /> Add Sub-Admin
          </button>
        </div>
      </form>

      {isLoading ? (
        <div className="text-center py-4 text-slate-500 text-sm font-bold animate-pulse">Loading users...</div>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-y border-slate-200 text-slate-500 text-sm">
              <th className="p-3 font-bold">Name</th>
              <th className="p-3 font-bold">Email</th>
              <th className="p-3 font-bold">Role</th>
              <th className="p-3 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subAdmins.length === 0 && (
              <tr>
                <td colSpan="4" className="p-6 text-center text-slate-500 text-sm">No Sub-admins found.</td>
              </tr>
            )}
            {subAdmins.map(admin => (
              <tr key={admin.id} className="border-b border-slate-100">
                <td className="p-3 font-bold text-slate-700">{admin.name}</td>
                <td className="p-3 text-sm text-slate-500">{admin.email}</td>
                <td className="p-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-bold uppercase">{admin.role}</span>
                    <div className="flex gap-1 flex-wrap">
                      {admin.permissions?.map(p => (
                        <span key={p} className="bg-emerald-50 border border-emerald-100 text-emerald-600 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase">{p}</span>
                      ))}
                    </div>
                  </div>
                </td>
                <td className="p-3 text-right">
                  <button onClick={() => handleDelete(admin.id)} className="text-rose-500 hover:text-rose-700 p-1.5 rounded bg-rose-50">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isPermissionModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-secondary/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm flex flex-col shadow-2xl">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <h2 className="font-black text-secondary flex items-center gap-2"><Shield size={18} className="text-primary"/> Assign Permissions</h2>
              <button onClick={() => setIsPermissionModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-slate-500 mb-4">Select what this sub-admin is allowed to do:</p>
              {PERMISSIONS.map(perm => (
                <label key={perm.id} className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors">
                  <input 
                    type="checkbox" 
                    checked={formData.permissions.includes(perm.id)} 
                    onChange={() => handlePermissionChange(perm.id)} 
                    className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
                  /> 
                  <span className="font-bold text-slate-700">{perm.label}</span>
                </label>
              ))}
            </div>
            <div className="p-4 border-t border-slate-100 flex justify-end bg-slate-50 rounded-b-2xl">
              <button 
                type="button"
                onClick={() => setIsPermissionModalOpen(false)} 
                className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary-dark transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;

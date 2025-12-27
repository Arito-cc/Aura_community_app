import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, ShieldAlert } from 'lucide-react';
import API from '../api/axios';
import toast from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/users/register', formData);
      if (formData.role === 'admin') {
        toast.success('Admin request sent! Awaiting approval.');
      } else {
        toast.success('Account created! Please log in.');
      }
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-black border border-[#262626] rounded-xl text-white">
      <h2 className="text-3xl font-black mb-2 text-center italic tracking-tighter">AURA</h2>
      <p className="text-gray-400 text-center text-sm font-semibold mb-8">Join the community.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email" placeholder="Email address" required
          className="w-full bg-[#121212] border border-[#262626] p-3 rounded-sm text-sm outline-none focus:border-gray-500"
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <input
          type="text" placeholder="Username" required
          className="w-full bg-[#121212] border border-[#262626] p-3 rounded-sm text-sm outline-none focus:border-gray-500"
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"} placeholder="Password" required
            className="w-full bg-[#121212] border border-[#262626] p-3 rounded-sm text-sm outline-none focus:border-gray-500"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400">
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Role Selector */}
        <div className="flex gap-2 p-1 bg-[#121212] border border-[#262626] rounded-lg">
          <button 
            type="button"
            onClick={() => setFormData({...formData, role: 'user'})}
            className={`flex-1 py-2 text-xs font-black uppercase tracking-widest rounded-md transition-all ${formData.role === 'user' ? 'bg-white text-black' : 'text-gray-500'}`}
          >
            User
          </button>
          <button 
            type="button"
            onClick={() => setFormData({...formData, role: 'admin'})}
            className={`flex-1 py-2 text-xs font-black uppercase tracking-widest rounded-md transition-all ${formData.role === 'admin' ? 'bg-violet-600 text-white' : 'text-gray-500'}`}
          >
            Admin
          </button>
        </div>

        {formData.role === 'admin' && (
          <div className="flex items-start gap-2 p-3 bg-violet-500/10 border border-violet-500/20 rounded-lg">
            <ShieldAlert size={16} className="text-violet-500 mt-0.5 shrink-0" />
            <p className="text-[10px] text-violet-300 leading-tight uppercase font-bold tracking-tighter">
              Notice: Admin accounts require verification from existing staff before login.
            </p>
          </div>
        )}

        <button className="w-full bg-white text-black py-2 rounded-lg font-black uppercase tracking-tighter hover:bg-gray-200 transition mt-4">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
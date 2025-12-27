import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react'; // Icons for show/hide
import API from '../api/axios';
import toast from 'react-hot-toast';

const Login = () => {
  const [identity, setIdentity] = useState(''); // Email or Username
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/users/login', { identity, password });
      login(data);
      toast.success(`Welcome back!`);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid details');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-black border border-[#262626] rounded-xl">
      <h2 className="text-3xl font-black mb-8 text-center italic tracking-tighter">HUB</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Identity Field */}
        <input 
          type="text" 
          placeholder="Phone number, username, or email"
          className="w-full bg-[#121212] border border-[#262626] p-3 rounded-sm text-sm outline-none focus:border-gray-500" 
          value={identity} 
          onChange={(e) => setIdentity(e.target.value)} 
        />

        {/* Password Field with Show/Hide Toggle */}
        <div className="relative">
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Password"
            className="w-full bg-[#121212] border border-[#262626] p-3 rounded-sm text-sm outline-none focus:border-gray-500" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button className="w-full bg-[#0095F6] text-white py-2 rounded-lg font-bold hover:bg-blue-600 transition">
          Log In
        </button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-gray-400">Don't have an account? </span>
        <Link to="/register" className="text-[#0095F6] font-bold">Sign up</Link>
      </div>
    </div>
  );
};

export default Login;
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Search } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [navSearch, setNavSearch] = useState('');
  const navigate = useNavigate();

  const handleNavSearch = (e) => {
    e.preventDefault();
    if (!navSearch.trim()) return;
    // Redirects user to the dedicated Search Page with the query
    navigate(`/search?q=${encodeURIComponent(navSearch)}`);
    setNavSearch('');
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-[1200px] mx-auto h-14 flex items-center justify-between px-4 gap-4">
                  {/* AURA Branding */}
        <Link to="/" className="text-2xl font-black tracking-tighter bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent flex-shrink-0">
          AURA
        </Link>

        {/* DESKTOP GLOBAL SEARCH */}
        <form onSubmit={handleNavSearch} className="hidden md:flex flex-1 max-w-md relative group">
          <Search className="absolute left-3 top-2.5 text-gray-600 group-focus-within:text-violet-500 transition-colors" size={16} />
          <input 
            type="text"
            className="w-full bg-[#0A0A0A] border border-white/10 rounded-full py-2 pl-10 pr-4 text-xs text-white focus:border-violet-500/50 outline-none transition-all"
            placeholder="Search pulses or @handles..."
            value={navSearch}
            onChange={(e) => setNavSearch(e.target.value)}
          />
        </form>

        <div className="flex items-center gap-4 flex-shrink-0">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest hidden lg:block">
                @{user.name.toLowerCase()}
              </span>
              <button onClick={logout} className="text-gray-500 hover:text-white transition">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-xs font-black bg-white text-black px-4 py-2 rounded-full uppercase tracking-tighter">
              Join
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
export default Navbar;
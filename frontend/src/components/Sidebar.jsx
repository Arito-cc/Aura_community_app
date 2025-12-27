import { useState, useEffect } from 'react';
import { Search, Zap } from 'lucide-react';

const Sidebar = ({ onSearch, onTagClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const trends = ['cyber', 'neon', 'aurahub', 'futureweb'];

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="hidden lg:block w-full space-y-6"> 
      {/* Search Box - Aura Style */}
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-4 top-3.5 text-gray-600" size={16} />
        <input 
          className="w-full bg-[#0A0A0A] border border-white/5 rounded-2xl py-3 pl-11 pr-4 text-xs text-white placeholder-gray-600 focus:border-violet-500/50 outline-none transition-all"
          placeholder="Explore Aura"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      {/* Discovery Section - AURA Identity */}
      <div className="bg-[#0A0A0A] rounded-3xl p-6 border border-white/5">
        <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-violet-500 mb-6 flex items-center gap-2">
          <Zap size={14} fill="currentColor" /> Discovery
        </h3>
        {trends.map(tag => (
          <div key={tag} onClick={() => onTagClick(tag)} className="py-3 hover:translate-x-1 cursor-pointer transition-all group"> 
            <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest group-hover:text-violet-400">
              Trending
            </p>
            <p className="font-black text-sm text-gray-200">#{tag}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Sidebar;
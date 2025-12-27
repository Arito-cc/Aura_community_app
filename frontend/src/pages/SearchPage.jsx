import { useState, useEffect } from 'react';
import API from '../api/axios';
import TopicCard from '../components/TopicCard';
import { Search, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const performSearch = async (searchTerm) => {
    setLoading(true);
    try {
      const { data } = await API.get(`/topics?search=${encodeURIComponent(searchTerm)}`);
      setResults(data);
    } catch (err) {
      toast.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  // Debounced search effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) performSearch(query);
      else setResults([]);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Search Header */}
      <div className="p-4 sticky top-14 bg-black/80 backdrop-blur-md z-10 border-b border-white/5">
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-3 text-gray-500" size={18} />
          <input
            autoFocus
            className="w-full bg-[#0A0A0A] border border-white/10 rounded-2xl py-2.5 pl-11 pr-4 text-sm outline-none focus:border-violet-500/50 transition-all"
            placeholder="Search titles or @handles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Results Area */}
      <div className="max-w-2xl mx-auto">
        {loading ? (
          <div className="p-20 text-center text-violet-500 animate-pulse font-black uppercase tracking-widest text-xs">
            Scanning Aura...
          </div>
        ) : results.length > 0 ? (
          <div className="divide-y divide-white/5">
            {results.map(topic => (
              <TopicCard key={topic._id} topic={topic} onUpvote={() => {}} />
            ))}
          </div>
        ) : query && (
          <div className="p-20 text-center text-gray-600">
            <Zap size={40} className="mx-auto mb-4 opacity-20" />
            <p className="text-sm font-bold uppercase tracking-widest">No matching pulses found</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default SearchPage;
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Settings = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="p-6 text-white max-w-xl mx-auto">
      <h1 className="text-2xl font-black mb-8 italic text-violet-500 tracking-tighter">
        SYSTEM SETTINGS
      </h1>

      <div className="space-y-6">
        <div className="bg-[#0A0A0A] p-6 rounded-3xl border border-white/5">
          <p className="text-[10px] text-gray-600 uppercase mb-2 font-black tracking-[0.2em]">
            User Identity
          </p>
          <p className="font-bold text-lg text-white">
            @{user?.name.toLowerCase()}
          </p>
        </div>

        <button
          onClick={logout}
          className="w-full bg-red-500/5 text-red-500 py-4 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] border border-red-500/20 hover:bg-red-500 hover:text-white transition-all duration-300"
        >
          Terminate Session
        </button>
      </div>
    </div>
  );
};

export default Settings;
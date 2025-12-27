import { useEffect, useState } from 'react';
import API from '../api/axios';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [pending, setPending] = useState([]);

  const fetchPending = async () => {
    try {
      const { data } = await API.get('/users/pending-admins');
      setPending(data);
    } catch (err) {
      toast.error("Failed to load requests");
    }
  };

  const handleApprove = async (id) => {
    try {
      await API.put(`/users/approve-admin/${id}`);
      toast.success("Admin access granted");
      fetchPending();
    } catch (err) {
      toast.error("Approval failed");
    }
  };

  useEffect(() => { fetchPending(); }, []);

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-black italic mb-8 text-violet-500">CONTROL CENTER</h1>
      <div className="bg-[#0A0A0A] rounded-3xl border border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/5 bg-white/5 text-[10px] font-black uppercase tracking-widest">
          Pending Admin Verifications
        </div>
        {pending.length === 0 ? (
          <p className="p-10 text-center text-gray-600 font-bold">No pending transmissions.</p>
        ) : (
          pending.map(user => (
            <div key={user._id} className="p-6 flex items-center justify-between border-b border-white/5 last:border-0">
              <div>
                <p className="font-black text-violet-400">@{user.name.toLowerCase()}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <button 
                onClick={() => handleApprove(user._id)}
                className="bg-violet-600 hover:bg-violet-500 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-tighter transition-all"
              >
                Approve Access
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
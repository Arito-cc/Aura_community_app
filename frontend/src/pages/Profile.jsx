import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../api/axios';
import TopicCard from '../components/TopicCard';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  const fetchUserPosts = async () => {
    try {
      const { data } = await API.get(`/topics`);
      setPosts(data.filter(t => t.createdBy?._id === user?._id));
    } catch (err) { console.error("Error"); }
  };

  const handleUpvote = async (id) => {
    try {
      const { data } = await API.put(`/topics/${id}/upvote`);
      setPosts(posts.map(t => t._id === id ? { ...t, upvotes: data } : t));
    } catch (err) { toast.error("Error"); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete?")) return;
    try {
      await API.delete(`/topics/${id}`);
      setPosts(posts.filter(p => p._id !== id));
      toast.success("Removed");
    } catch (err) { toast.error("Failed"); }
  };

  useEffect(() => { if (user) fetchUserPosts(); }, [user]);

  if (!user) return <div className="p-10 text-center">Login to view profile</div>;

  return (
    <div className="bg-black min-h-screen">
      <div className="p-10 border-b border-white/5 text-center">
        <div className="w-20 h-20 bg-violet-600 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-black">
          {user.name[0].toUpperCase()}
        </div>
        <h1 className="text-xl font-bold">@{user.name}</h1>
        <p className="text-gray-500 text-xs mt-1 uppercase tracking-widest">{user.role}</p>
      </div>
      {posts.map(p => (
        <TopicCard key={p._id} topic={p} onUpvote={handleUpvote} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default Profile;
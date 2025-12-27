import { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import TopicCard from '../components/TopicCard';
import toast from 'react-hot-toast';

const Home = () => {
  const [topics, setTopics] = useState([]);
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchTopics = async () => {
    const params = new URLSearchParams(location.search);
    const search = params.get('q') || '';
    try {
      const { data } = await API.get(`/topics?search=${encodeURIComponent(search)}`);
      setTopics(data);
    } catch (err) { toast.error("Load failed"); }
  };

  const handleUpvote = async (id) => {
    if (!user) return toast.error("Login required");
    try {
      const { data } = await API.put(`/topics/${id}/upvote`);
      setTopics(topics.map(t => t._id === id ? { ...t, upvotes: data } : t));
    } catch (err) { toast.error("Action failed"); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete pulse?")) return;
    try {
      await API.delete(`/topics/${id}`);
      setTopics(topics.filter(t => t._id !== id));
      toast.success("Deleted");
    } catch (err) { toast.error("Delete failed"); }
  };

  useEffect(() => { fetchTopics(); }, [location.search]);

  return (
    <div className="min-h-screen bg-black">
      {topics.map(t => (
        <TopicCard key={t._id} topic={t} onUpvote={handleUpvote} onDelete={handleDelete} onTagClick={(tag) => navigate(`/search?q=%23${tag}`)} />
      ))}
    </div>
  );
};

export default Home;
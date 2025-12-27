import { useEffect, useState, useContext } from 'react';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import TopicCard from '../components/TopicCard';

const UpvotedPosts = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUpvoted = async () => {
      const { data } = await API.get('/topics');
      setPosts(data.filter(t => t.upvotes.includes(user?._id)));
    };
    if (user) fetchUpvoted();
  }, [user]);

  return (
    <div className="divide-y divide-white/5">
      <h1 className="p-6 text-xl font-black text-violet-500 uppercase tracking-tighter italic">Voted Pulses</h1>
      {posts.map(topic => <TopicCard key={topic._id} topic={topic} onUpvote={() => {}} />)}
    </div>
  );
};

export default UpvotedPosts;
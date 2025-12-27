import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import TopicCard from '../components/TopicCard';
import CommentItem from '../components/CommentItem';

const TopicDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [topic, setTopic] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  const fetchData = async () => {
    try {
      const [tRes, cRes] = await Promise.all([
        API.get(`/topics/${id}`),
        API.get(`/comments/${id}`)
      ]);
      setTopic(tRes.data);
      setComments(cRes.data);
    } catch (err) {
      toast.error("Signal lost...");
    }
  };

  const postComment = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      await API.post(`/comments/${id}`, { text });
      setText('');
      fetchData();
      toast.success("Commented");
    } catch (err) {
      toast.error("Login to transmit");
    }
  };

  const handleCommentUpvote = async (commentId) => {
    if (!user) return toast.error("Login required");
    try {
      const { data } = await API.put(`/comments/${commentId}/upvote`);
      setComments(comments.map(c => c._id === commentId ? { ...c, upvotes: data } : c));
    } catch (err) { toast.error("Vote failed"); }
  };

  useEffect(() => { fetchData(); }, [id]);

  if (!topic) return <div className="p-10 text-center animate-pulse text-violet-500">Scanning sector...</div>;

  return (
    <div className="bg-black min-h-screen text-white pb-20">
      <TopicCard topic={topic} onUpvote={fetchData} />
      
      {user && (
        <form onSubmit={postComment} className="p-4 border-b border-white/5 flex gap-2 sticky top-14 bg-black/80 backdrop-blur-md z-10">
          <input 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            className="flex-1 bg-[#0A0A0A] border border-white/10 p-3 rounded-xl text-sm outline-none focus:border-violet-500/50" 
            placeholder="Add to the aura..." 
          />
          <button className="text-violet-500 font-black text-[10px] uppercase tracking-tighter">Transmit</button>
        </form>
      )}

      <div className="p-2">
        {comments
          .filter(c => !c.parentId) // Only root comments at top level
          .map(c => (
            <CommentItem 
              key={c._id} 
              comment={c} 
              allComments={comments} 
              onCommentUpvote={handleCommentUpvote}
              onRefresh={fetchData} // IMPORTANT
            />
          ))}
      </div>
    </div>
  );
};

export default TopicDetail;
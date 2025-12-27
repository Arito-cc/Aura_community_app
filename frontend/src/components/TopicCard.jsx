import { Link } from 'react-router-dom';
import { MessageSquare, ChevronUp, Trash2, Share } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { formatHashtags } from '../utils/formatText';
import toast from 'react-hot-toast';

const TopicCard = ({ topic, onUpvote, onDelete, onTagClick }) => {
  const { user } = useContext(AuthContext);
  const isUpvoted = topic.upvotes?.includes(user?._id);
  const canDelete = user?.role === 'admin' || (user && topic.createdBy?._id === user._id);

  return (
    <div className="bg-[#0A0A0A] border-b border-white/5 p-4 hover:bg-[#0f0f0f] transition-all">
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center font-bold">
            {topic.createdBy?.name[0].toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-bold">@{topic.createdBy?.name.toLowerCase()}</p>
            <p className="text-[10px] text-gray-500">{new Date(topic.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        {canDelete && onDelete && (
          <button onClick={() => onDelete(topic._id)} className="text-gray-600 hover:text-red-500">
            <Trash2 size={18} />
          </button>
        )}
      </div>

      <Link to={`/topic/${topic._id}`} className="block mt-3">
        <h2 className="text-lg font-bold text-white leading-tight">{topic.title}</h2>
      </Link>
      
      <div className="text-sm text-gray-400 mt-2">
        {formatHashtags(topic.description, onTagClick)}
      </div>

      {topic.imageUrl && (
        <img src={topic.imageUrl} className="w-full rounded-xl mt-4 border border-white/5 max-h-96 object-cover" alt="" />
      )}

      <div className="flex gap-6 mt-4">
        <button onClick={() => onUpvote(topic._id)} className={`flex items-center gap-1 ${isUpvoted ? 'text-violet-500' : 'text-gray-500'}`}>
          <ChevronUp size={22} />
          <span className="text-xs font-black">{topic.upvotes?.length || 0}</span>
        </button>
        <Link to={`/topic/${topic._id}`} className="flex items-center gap-1 text-gray-500">
          <MessageSquare size={18} />
        </Link>
      </div>
    </div>
  );
};

export default TopicCard;
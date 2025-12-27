import { ArrowBigUp, Heart } from 'lucide-react';
import API from '../api/axios';

const VoteControl = ({ item, type, onUpdate, userId }) => {
  const isUpvoted = item.upvotes?.includes(userId);
  const isLiked = item.likes?.includes(userId);

  const handleAction = async (action) => {
    try {
      const { data } = await API.put(`/topics/${item._id}/${action}`);
      onUpdate(data); // Refresh the count in parent state
    } catch (err) {
      console.error("Action failed");
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 mr-4 border-r pr-4">
      <button onClick={() => handleAction('upvote')} 
        className={`${isUpvoted ? 'text-orange-500' : 'text-gray-400'} hover:bg-orange-50 p-1 rounded`}>
        <ArrowBigUp size={32} fill={isUpvoted ? "currentColor" : "none"} />
      </button>
      <span className="font-bold text-gray-700">{item.upvotes?.length || 0}</span>
      
      <button onClick={() => handleAction('like')} 
        className={`${isLiked ? 'text-red-500' : 'text-gray-400'} mt-2`}>
        <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
      </button>
    </div>
  );
};
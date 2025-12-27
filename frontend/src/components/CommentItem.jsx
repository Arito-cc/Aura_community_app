import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChevronUp, Reply, Trash2, MoreHorizontal } from 'lucide-react';
import API from '../api/axios';
import toast from 'react-hot-toast';

const CommentItem = ({ comment, allComments, onCommentUpvote, onRefresh }) => {
  const { user } = useContext(AuthContext);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  
  const isUpvoted = comment.upvotes?.includes(user?._id);
  const canDelete = user?.role === 'admin' || (user && comment.user?._id === user._id);

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    try {
      await API.post(`/comments/${comment.topic}`, { text: replyText, parentId: comment._id });
      setReplyText('');
      setIsReplying(false);
      onRefresh();
      toast.success("Reply sent");
    } catch (err) { toast.error("Failed to transmit"); }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this comment?")) return;
    try {
      await API.delete(`/comments/${comment._id}`);
      toast.success("Comment removed");
      onRefresh();
    } catch (err) { toast.error("Delete failed"); }
  };

  return (
    <div className="flex gap-2 sm:gap-3 mt-4 animate-in fade-in slide-in-from-left-2 duration-300">
      {/* Thread Visual Line */}
      <div className="flex flex-col items-center">
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1A1A1A] border border-white/5 flex items-center justify-center text-[10px] font-black text-violet-500">
          {comment.user?.name ? comment.user.name[0].toUpperCase() : 'U'}
        </div>
        <div className="w-[1.5px] h-full bg-gradient-to-b from-white/10 to-transparent my-1"></div>
      </div>

      <div className="flex-1 min-w-0 pb-1">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] sm:text-xs font-black text-violet-400">@{comment.user?.name?.toLowerCase()}</span>
            <span className="text-[9px] text-gray-600 font-bold uppercase tracking-tighter">
              {new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          
          {canDelete && (
            <button onClick={handleDelete} className="text-gray-700 hover:text-red-500 p-1 transition-colors">
              <Trash2 size={14} />
            </button>
          )}
        </div>
        
        <p className="text-[13px] sm:text-sm text-gray-300 leading-relaxed mb-2 pr-2">{comment.text}</p>
        
        <div className="flex items-center gap-5 sm:gap-6">
          <button
            onClick={() => onCommentUpvote(comment._id)}
            className={`flex items-center gap-1.5 transition-all ${isUpvoted ? 'text-violet-500 drop-shadow-[0_0_5px_rgba(139,92,246,0.5)]' : 'text-gray-600 hover:text-white'}`}
          >
            <ChevronUp size={18} strokeWidth={3} />
            <span className="text-[10px] font-black">{comment.upvotes?.length || 0}</span>
          </button>
          
          <button 
            onClick={() => setIsReplying(!isReplying)}
            className="text-[10px] font-black text-gray-600 hover:text-white uppercase tracking-widest flex items-center gap-1"
          >
            <Reply size={12} /> {isReplying ? 'Cancel' : 'Reply'}
          </button>
        </div>

        {isReplying && (
          <form onSubmit={handleReplySubmit} className="mt-3 flex gap-2">
            <input 
              autoFocus
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="flex-1 bg-[#0A0A0A] border border-white/10 p-2.5 rounded-xl text-xs outline-none focus:border-violet-500/50 text-white"
              placeholder="Write a reply..."
            />
            <button className="text-violet-500 text-[10px] font-black uppercase px-2">Send</button>
          </form>
        )}

        {/* REPLIES - Indented for Desktop, tight for Mobile */}
        <div className="mt-1 ml-[-10px] sm:ml-0 border-l border-white/5 pl-3 sm:pl-4">
          {allComments
            .filter(c => c.parentId === comment._id)
            .reverse()
            .map(reply => (
              <CommentItem 
                key={reply._id} 
                comment={reply} 
                allComments={allComments} 
                onCommentUpvote={onCommentUpvote} 
                onRefresh={onRefresh}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
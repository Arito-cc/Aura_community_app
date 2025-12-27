import { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CreateTopic = () => {
  const [formData, setFormData] = useState({ title: '', description: '', imageUrl: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/topics', formData);
      toast.success('Posted to Hub!');
      navigate('/');
    } catch (err) {
      toast.error('Failed to post');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-black min-h-screen text-white p-4">
      <div className="flex items-center justify-between mb-6 border-b border-[#262626] pb-4">
        <h2 className="text-xl font-bold">New Post</h2>
        <button
          onClick={handleSubmit}
          className="text-[#0095F6] font-bold text-sm"
        >
          Share
        </button>
      </div>
      <form className="space-y-6">
        <input
          placeholder="Title"
          className="w-full bg-black text-xl font-bold border-none outline-none placeholder-gray-600"
          onChange={(e) => setFormData({...formData, title: e.target.value})}
        />
        <textarea
          placeholder="What's on your mind? (use #hashtags)"
          rows="10"
          className="w-full bg-black text-sm border-none outline-none resize-none placeholder-gray-600"
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        ></textarea>
        <input
          type="url"
          placeholder="Image URL (Optional)"
          className="w-full bg-[#121212] border border-[#262626] p-2 rounded text-xs outline-none"
          onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
        />
        {formData.imageUrl && (
          <img src={formData.imageUrl} className="w-full h-64 object-cover rounded-xl border border-[#262626]" alt="Preview" />
        )}
      </form>
    </div>
  );
};

export default CreateTopic;
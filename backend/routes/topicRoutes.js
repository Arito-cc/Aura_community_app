const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic');
const Comment = require('../models/Comment');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

// 1. GET ALL TOPICS (Search & Hashtags)
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      if (search.startsWith('#')) {
        query.description = { $regex: search, $options: 'i' };
      } else if (search.startsWith('@')) {
        const user = await User.findOne({ name: { $regex: search.substring(1), $options: 'i' } });
        query.createdBy = user ? user._id : null;
      } else {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }
    }

    const topics = await Topic.find(query).populate('createdBy', 'name').sort({ createdAt: -1 });

    const formatted = topics.map(t => {
      const obj = t.toObject();
      if (!obj.createdBy) obj.createdBy = { name: "unknown", _id: null };
      return obj;
    });

    res.json(formatted);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// 2. CREATE TOPIC
router.post('/', protect, async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body;
    const topic = await Topic.create({ title, description, imageUrl, createdBy: req.user._id });
    res.status(201).json(topic);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// 3. GET SINGLE TOPIC (Fixes TopicDetail 404)
router.get('/:id', async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id).populate('createdBy', 'name');
    if (!topic) return res.status(404).json({ message: 'Not found' });
    
    const obj = topic.toObject();
    if (!obj.createdBy) obj.createdBy = { name: "unknown", _id: null };
    res.json(obj);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// 4. UPVOTE TOPIC (Fixes Upvote 404)
router.put('/:id/upvote', protect, async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) return res.status(404).json({ message: 'Not found' });

    if (topic.upvotes.includes(req.user._id)) {
      topic.upvotes.pull(req.user._id);
    } else {
      topic.upvotes.addToSet(req.user._id);
    }
    await topic.save();
    res.json(topic.upvotes);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// 5. DELETE TOPIC (Admin God Mode)
router.delete('/:id', protect, async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) return res.status(404).json({ message: 'Not found' });

    if (req.user.role === 'admin' || topic.createdBy?.toString() === req.user._id.toString()) {
      await Comment.deleteMany({ topic: req.params.id });
      await topic.deleteOne();
      res.json({ message: 'Deleted' });
    } else {
      res.status(403).json({ message: 'Unauthorized' });
    }
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
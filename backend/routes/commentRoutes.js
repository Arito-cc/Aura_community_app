const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const { protect } = require('../middleware/authMiddleware');

// @desc Post a comment or a reply
router.post('/:topicId', protect, async (req, res) => {
  try {
    const { text, parentId } = req.body; 
    const comment = await Comment.create({
      text,
      topic: req.params.topicId,
      user: req.user._id,
      parentId: parentId || null
    });
    const populatedComment = await comment.populate('user', 'name');
    res.status(201).json(populatedComment);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// @desc Get all comments for a topic
router.get('/:topicId', async (req, res) => {
  try {
    const comments = await Comment.find({ topic: req.params.topicId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// @desc Delete Comment (Admin or Owner)
router.delete('/:id', protect, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    const isOwner = comment.user.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (isOwner || isAdmin) {
      // Recursive delete: Remove all nested replies linked to this comment
      await Comment.deleteMany({ parentId: req.params.id });
      await comment.deleteOne();
      res.json({ message: 'Comment and replies removed' });
    } else {
      res.status(403).json({ message: 'Not authorized' });
    }
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// @desc Upvote a comment
router.put('/:id/upvote', protect, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Not found' });
    if (comment.upvotes.includes(req.user._id)) comment.upvotes.pull(req.user._id);
    else comment.upvotes.addToSet(req.user._id);
    await comment.save();
    res.json(comment.upvotes);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
const Topic = require('../models/Topic');

// @desc Create Topic | POST /api/topics | Authenticated
const createTopic = async (req, res) => {
  const { title, description, imageUrl } = req.body;
  const topic = await Topic.create({ 
    title, 
    description, 
    imageUrl,
    createdBy: req.user._id 
  });
  res.status(201).json(topic);
};

// @desc Get All Topics with Hot-Ranking logic
const getTopics = async (req, res) => {
  try {
    const { search, tag } = req.query;
    let query = {};
    if (search) query.title = { $regex: search, $options: 'i' };
    if (tag) query.description = { $regex: `#${tag}`, $options: 'i' };

    // Primary sort: Date | Secondary sort: Upvote count
    const topics = await Topic.aggregate([
      { $match: query },
      {
        $addFields: {
          upvotesCount: { $size: { $ifNull: ["$upvotes", []] } },
          dateOnly: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }
        }
      },
      { $sort: { dateOnly: -1, upvotesCount: -1, createdAt: -1 } },
      { $lookup: { from: 'users', localField: 'createdBy', foreignField: '_id', as: 'createdBy' } },
      { $unwind: "$createdBy" },
      { $project: { "createdBy.password": 0, "createdBy.email": 0 } }
    ]);
    res.json(topics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete Topic | DELETE /api/topics/:id | Admin Only
const deleteTopic = async (req, res) => {
  // This function is now handled directly in topicRoutes.js with additional authorization logic
  // and cascade deletion of comments.
  // This controller function is effectively deprecated or needs to be updated to match the route logic.
};

module.exports = { createTopic, getTopics };
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { protect, admin } = require('../middleware/authMiddleware');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc Register User/Admin
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const emailExists = await User.findOne({ email });
    if (emailExists) return res.status(400).json({ message: 'Email already registered' });

    const userExists = await User.findOne({ name });
    if (userExists) return res.status(400).json({ message: 'Username already taken' });

    // Special Logic: The very first user ever created in the DB becomes an Approved Admin automatically
    const isFirstUser = (await User.countDocuments({})) === 0;

    const user = await User.create({ 
      name, 
      email, 
      password, 
      role: role || 'user',
      isAdminApproved: isFirstUser ? true : false // Only first admin is auto-approved
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      role: user.role,
      isAdminApproved: user.isAdminApproved,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc Login
router.post('/login', async (req, res) => {
  try {
    const { identity, password } = req.body;
    
    if (!identity || !password) {
      return res.status(400).json({ message: 'Please provide both identity and password' });
    }

    // 1. Find user: Check BOTH email (lowercase) and name (as is)
    const user = await User.findOne({
      $or: [
        { email: identity.toLowerCase() }, // Check lowercase email
        { name: identity } // Check exact username
      ]
    });
    
    // 2. If user not found
    if (!user) {
      return res.status(401).json({ message: 'Invalid identity (Username/Email not found)' });
    }
    
    // 3. Compare Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    
    // 4. Check Admin Approval Status (Your specific requirement)
    if (user.role === 'admin' && !user.isAdminApproved) {
      return res.status(403).json({ message: 'Admin account pending approval. Access denied.' });
    }
    
    // 5. Success - Return Token and User Details
    res.json({
      _id: user._id,
      name: user.name,
      role: user.role,
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// @desc Get Pending Admins (Admin Only)
router.get('/pending-admins', protect, admin, async (req, res) => {
  const pending = await User.find({ role: 'admin', isAdminApproved: false }).select('-password');
  res.json(pending);
});

// @desc Approve Admin (Admin Only)
router.put('/approve-admin/:id', protect, admin, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  
  user.isAdminApproved = true;
  await user.save();
  res.json({ message: 'Admin approved successfully' });
});

module.exports = router;
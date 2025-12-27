const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// 1. IMPROVED CORS CONFIGURATION
app.use(cors({
  origin: [
    "http://localhost:5173",           // Local development
    "https://your-aura-frontend.vercel.app" // ADD YOUR DEPLOYED FRONTEND URL HERE
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,                   // Required for cookies/authorization headers
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// 2. LOGGING MIDDLEWARE (Optional: Helps you see requests in Render logs)
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

// 3. BASE ROUTE
app.get('/', (req, res) => {
  res.send('AURA API is running...');
});

// 4. API ROUTES
app.use('/api/topics', require('./routes/topicRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));

// 5. START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
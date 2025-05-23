// Import necessary libraries
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const leadRoutes = require('./routes/leadRoutes');
const contactRoutes = require('./routes/contactRoutes');
const adminRoutes = require('./routes/adminRoutes');
const scheduledCallRoutes = require('./routes/scheduledCallRoutes');
const callHistoryRoutes = require('./routes/callHistoryRoutes');
require('dotenv').config();

const app = express();
const cors = require('cors');
app.use(cors({
  origin: ['https://ring-ring-1.onrender.com', 'http://localhost:3000'],
  credentials: true
}));

// Middleware to parse JSON bodies
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/contacts', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/scheduled-calls', scheduledCallRoutes);
app.use('/api/call-history', callHistoryRoutes);

// Database connection (using the MONGO_URI from .env)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Hello, Rishav Mishra CRM!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

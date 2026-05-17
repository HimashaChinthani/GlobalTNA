require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jobRoutes = require('./routes/jobRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB serviceBoard [cite: 16]
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB: serviceBoard'))
  .catch(err => console.error('Database connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'ServiceBoard API is running successfully on Vercel!' });
});
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

// Global Error Handler 
app.use((err, req, res, next) => {
  console.error(err.message);
  const status = err.name === 'ValidationError' ? 400 : 500;
  res.status(status).json({ 
    error: err.message || 'Internal Server Error' 
  });
});

if (process.env.VERCEL !== '1') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
module.exports = app;
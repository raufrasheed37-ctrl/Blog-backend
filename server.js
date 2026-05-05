const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/posts', require('./routes/posts'));
// app.use('/api/comments', require('./routes/comments'));
// app.use('/api/contact', require('./routes/contact'));

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('App is running');
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();

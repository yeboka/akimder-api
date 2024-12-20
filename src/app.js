const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { errorHandler } = require('./middlewares/errorHandler');
const sequelize = require('./config/dbConfig');
const helloRoutes = require('./routes/helloRoutes');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');
const akimatRoutes = require('./routes/akimatRoutes');  // Import the Akimat route
const newsRoutes = require('./routes/newsRoutes');
const searchRoutes = require('./routes/searchRoutes');
const advertisementRoutes = require('./routes/advertiementRoutes');

dotenv.config(); // Load environment variables from .env

const app = express();

// Middleware
app.use(cors({
    origin: '*', // Use a specific domain in production
})); // Enable CORS for all routes

app.use(express.json()); // For parsing application/json

// Routes
app.use('/api/hello', helloRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/akimat', akimatRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/advertisement', advertisementRoutes);

// Error handling middleware
app.use(errorHandler);

// Sync models (use migrations for production)
sequelize.sync()
    .then(() => console.log('Database synchronized successfully!'))
    .catch((error) => console.error('Error syncing the database:', error));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;

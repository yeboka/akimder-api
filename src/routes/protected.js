// routes/protected.js
const express = require('express');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();

// This route is protected
router.get('/profile', authenticate, (req, res) => {
    res.status(200).json({
        message: 'Welcome to your profile!',
        user: req.user, // The user object was added by the middleware
    });
});

module.exports = router;

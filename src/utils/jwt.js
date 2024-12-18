const jwt = require('jsonwebtoken');

// Secret keys should be stored in your environment variables
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user.id, firstName: user.firstName, lastName: user.lastName, role: user.role },
        ACCESS_TOKEN_SECRET,
        { expiresIn: '1d' } // Access token expires in 15 minutes
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user.id }, // Refresh token contains only minimal user data
        REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' } // Refresh token expires in 7 days
    );
};

module.exports = { generateAccessToken, generateRefreshToken };

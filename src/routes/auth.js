// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel'); // Correct the import here
const RefreshToken = require('../models/refreshModel'); // Import RefreshToken model
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');
const jwt = require("jsonwebtoken");

const router = express.Router();

// Register Route
// routes/auth.js
router.post('/register', async (req, res) => {
    const { firstName, lastName, password, phoneNumber, role } = req.body;

    try {
        // Check if the user already exists (by phone number)
        const existingUser = await User.findOne({ where: { phoneNumber } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this phone number' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({
            firstName,
            lastName,
            phoneNumber,
            password: hashedPassword,
            role: role || 'user',
        });

        // Generate JWT token
        const accessToken = generateAccessToken(newUser);
        const refreshToken = generateRefreshToken(newUser);

        // Save the refresh token in the database
        const refreshTokenRecord = await RefreshToken.create({
            token: refreshToken,
            userId: newUser.id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days expiration
        });

        // Respond with user data and tokens
        res.status(201).json({
            user: {
                id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                phoneNumber: newUser.phoneNumber,
                role: newUser.role,
            },
            access_token: accessToken,
            refresh_token: refreshToken,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

// routes/auth.js
router.post('/login', async (req, res) => {
    const { phoneNumber, password } = req.body;

    try {
        // Find user by phoneNumber
        const user = await User.findOne({ where: { phoneNumber } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Save the refresh token in the database
        const refreshTokenRecord = await RefreshToken.create({
            token: refreshToken,
            userId: user.id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days expiration
        });

        // Respond with user data and tokens
        res.status(200).json({
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                role: user.role,
            },
            access_token: accessToken,
            refresh_token: refreshToken,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});



router.post('/refresh', async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' });
    }

    try {
        // Check if the refresh token exists in the database
        const storedRefreshToken = await RefreshToken.findOne({ where: { token: refreshToken } });

        if (!storedRefreshToken) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        // Check if the refresh token has expired
        if (new Date() > storedRefreshToken.expiresAt) {
            return res.status(403).json({ message: 'Refresh token has expired' });
        }

        // Verify the refresh token
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid refresh token' });
            }

            const user = await User.findByPk(decoded.userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Generate new access and refresh tokens
            const accessToken = generateAccessToken(user);
            const newRefreshToken = generateRefreshToken(user);

            // Optionally, invalidate the old refresh token and create a new one
            await storedRefreshToken.destroy(); // Delete old refresh token

            // Save new refresh token to the database
            await RefreshToken.create({
                token: newRefreshToken,
                userId: user.id,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days expiration
            });

            res.status(200).json({
                access_token: accessToken,
                refresh_token: newRefreshToken,
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

module.exports = router;

const express = require('express');
const { getHelloMessage } = require('../controllers/helloController');

const router = express.Router();

// GET /api/hello
router.get('/', getHelloMessage);

module.exports = router;

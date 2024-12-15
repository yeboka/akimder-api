const Hello = require('../models/helloModel');

const getHelloMessage = async (req, res) => {
    try {
        // Query the database for a Hello message
        const helloMessage = await Hello.findOne();
        // Check if there's a message in the database
        if (!helloMessage) {
            return res.status(404).json({ message: 'No message found' });
        }

        // Respond with the message
        res.status(200).json({ message: helloMessage.message });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

module.exports = { getHelloMessage };

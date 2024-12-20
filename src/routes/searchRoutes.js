const express = require('express');
const { Op } = require('sequelize');
const {News, Akimat} = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
    const searchText = req.query.text;

    if (!searchText || searchText.trim() === '') {
        return res.status(400).json({ message: 'Search text is required' });
    }

    try {
        // Search in Akimat model
        const akimats = await Akimat.findAll({
            where: {
                [Op.or]: [
                    { title_ru: { [Op.iLike]: `%${searchText}%` } },
                    { title_kk: { [Op.iLike]: `%${searchText}%` } },
                    { title_en: { [Op.iLike]: `%${searchText}%` } },
                ],
            },
            attributes: ['id', 'title_ru', 'title_kk', 'title_en'],
        });

        // Format Akimat results
        const formattedAkimats = akimats.map((akimat) => ({
            id: akimat.id,
            title: {
                ru: akimat.title_ru,
                kk: akimat.title_kk,
                en: akimat.title_en,
            },
            type: 'akimat',
        }));

        // Search in News model
        const news = await News.findAll({
            where: {
                [Op.or]: [
                    { title_ru: { [Op.iLike]: `%${searchText}%` } },
                    { title_kk: { [Op.iLike]: `%${searchText}%` } },
                    { title_en: { [Op.iLike]: `%${searchText}%` } },
                ],
            },
            attributes: ['id', 'title_ru', 'title_kk', 'title_en'],
        });

        // Format News results
        const formattedNews = news.map((newsItem) => ({
            id: newsItem.id,
            title: {
                ru: newsItem.title_ru,
                kk: newsItem.title_kk,
                en: newsItem.title_en,
            },
            type: 'news',
        }));

        // Combine results
        const results = [...formattedAkimats, ...formattedNews];

        res.status(200).json(results);
    } catch (error) {
        console.error('Error during search:', error);
        res.status(500).json({ message: 'Failed to perform search' });
    }
});

module.exports = router;

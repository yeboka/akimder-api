// src/routes/newsRoutes.js
const express = require('express');
const { News, Akimat } = require('../models'); // Import models
const { authenticate } = require('../middlewares/auth');
const { getPreferredLanguage } = require('../utils/languageHelper');

const router = express.Router();

// 1. GET: Get all news
router.get('/', async (req, res) => {
    try {
        const lang = getPreferredLanguage(req);

        const news = await News.findAll({
            include: [
                {
                    model: Akimat,
                    as: 'akimat',
                    attributes: [`title_${lang}`],
                },
            ],
        });

        const localizedNews = news.map((item) => ({
            id: item.id,
            title: item[`title_${lang}`],
            text: item[`text_${lang}`],
            akimatName: item.akimat ? item.akimat[`title_${lang}`] : null,
            image_url: item.image_url, // Include image_url
            view_count: item.view_count,
            createdAt: item.createdAt,
        }));

        res.status(200).json(localizedNews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

// 2. GET: Get news by Akimat ID
router.get('/akimat/:akimatId', async (req, res) => {
    const { akimatId } = req.params;

    try {
        const lang = getPreferredLanguage(req);
        const news = await News.findAll({
            where: { akimat_id: akimatId },
            include: [
                {
                    model: Akimat,
                    as: 'akimat', // Ensure your association is correct
                    attributes: [`title_${lang}`], // Adjust this to match the field names in your Akimat model
                }
            ]
        });

        const localizedNews = news.map((item) => ({
            id: item.id,
            title: item[`title_${lang}`],
            text: item[`text_${lang}`],
            image_url: item.image_url,
            view_count: item.view_count,
            akimat_id: item.akimat_id,
            akimat_name: item.akimat ? item.akimat[`title_${lang}`] : null, // Add Akimat name
            createdAt: item.createdAt,
        }));

        res.status(200).json(localizedNews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

// 3. GET: Get news by ID and increment view_count
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const lang = getPreferredLanguage(req);
        const news = await News.findByPk(id, {
            include: [
                {
                    model: Akimat,
                    as: 'akimat', // Ensure your association is correct
                    attributes: [`title_${lang}`], // Adjust this to match the field names in your Akimat model
                }
            ]
        });

        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }

        // Increment the view count
        news.view_count += 1;
        await news.save();

        res.status(200).json({
            id: news.id,
            title: news[`title_${lang}`],
            text: news[`text_${lang}`],
            image_url: news.image_url,
            akimat_id: news.akimat_id,
            akimat_name: news.akimat ? news.akimat[`title_${lang}`] : null, // Add Akimat name
            view_count: news.view_count,
            createdAt: news.createdAt,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

// 4. POST: Create news (Protected)
router.post('/', authenticate, async (req, res) => {
    const { akimat_id, title_ru, title_kk, title_en, text_ru, text_kk, text_en, image_url } = req.body;

    try {
        const newNews = await News.create({
            akimat_id,
            title_ru,
            title_kk,
            title_en,
            text_ru,
            text_kk,
            text_en,
            image_url, // Add image_url
            view_count: 0,
        });

        res.status(201).json(newNews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

// 5. PUT: Update news (Protected)
router.put('/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    const { title_ru, title_kk, title_en, text_ru, text_kk, text_en, akimat_id, image_url } = req.body;

    try {
        const news = await News.findByPk(id);

        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }

        news.title_ru = title_ru || news.title_ru;
        news.title_kk = title_kk || news.title_kk;
        news.title_en = title_en || news.title_en;
        news.text_ru = text_ru || news.text_ru;
        news.text_kk = text_kk || news.text_kk;
        news.text_en = text_en || news.text_en;
        news.akimat_id = akimat_id || news.akimat_id;
        news.image_url = image_url || news.image_url; // Update image_url

        await news.save();

        res.status(200).json(news);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

// 6. DELETE: Delete news (Protected)
router.delete('/:id', authenticate, async (req, res) => {
    const { id } = req.params;

    try {
        const news = await News.findByPk(id);

        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }

        await news.destroy();

        res.status(200).json({ message: 'News deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

module.exports = router;

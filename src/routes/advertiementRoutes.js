const express = require('express');
const { Advertisement } = require('../models');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();

// 1. GET: Получить все активные рекламы
router.get('/', async (req, res) => {
    try {
        const advertisements = await Advertisement.findAll({
            where: { is_active: true },
        });

        res.status(200).json(advertisements);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

// 5. GET: Получить рекламу по ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const advertisement = await Advertisement.findByPk(id);

        if (!advertisement) {
            return res.status(404).json({ message: 'Advertisement not found' });
        }

        res.status(200).json(advertisement);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});


// 2. POST: Создать новую рекламу (Защищённый маршрут)
router.post('/', authenticate, async (req, res) => {
    const { image_url, link, description } = req.body;

    try {
        const newAd = await Advertisement.create({
            image_url,
            link,
            description,
            is_active: true,
        });

        res.status(201).json(newAd);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

// 3. PUT: Обновить информацию о рекламе (Защищённый маршрут)
router.put('/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    const { image_url, link, description, is_active } = req.body;

    try {
        const advertisement = await Advertisement.findByPk(id);

        if (!advertisement) {
            return res.status(404).json({ message: 'Advertisement not found' });
        }

        advertisement.image_url = image_url || advertisement.image_url;
        advertisement.link = link || advertisement.link;
        advertisement.description = description || advertisement.description;
        advertisement.is_active = is_active !== undefined ? is_active : advertisement.is_active;

        await advertisement.save();

        res.status(200).json(advertisement);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

// 4. DELETE: Удалить рекламу (Защищённый маршрут)
router.delete('/:id', authenticate, async (req, res) => {
    const { id } = req.params;

    try {
        const advertisement = await Advertisement.findByPk(id);

        if (!advertisement) {
            return res.status(404).json({ message: 'Advertisement not found' });
        }

        await advertisement.destroy();

        res.status(200).json({ message: 'Advertisement deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

module.exports = router;

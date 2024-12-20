const express = require('express');
const Akimat = require('../models/akimatModel');
const { authenticate } = require('../middlewares/auth'); // Protecting routes with token validation

// Helper function to get the preferred language from the headers
const getPreferredLanguage = (req) => {
    const language = req.headers['accept-language'];
    if (language) {
        // Get the first language in the list (e.g., 'en', 'ru', 'kk')
        return language.split(',')[0].toLowerCase();
    }
    // Default to 'en' if no language is found
    return 'en';
};

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const lang = getPreferredLanguage(req); // Determine language from headers
        const akimats = await Akimat.findAll();

        // Return localized Akimats
        const localizedAkimats = akimats.map(akimat => ({
            id: akimat.id,
            title: akimat[`title_${lang}`],  // Localized title based on language
            description: akimat[`description_${lang}`], // Localized description based on language
            address: akimat[`address_${lang}`],
            email: akimat.email,
            contacts: akimat.contacts,
        }));

        res.status(200).json(localizedAkimats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

// GET: Fetch Akimat by ID (Public)
router.get('/:id', async (req, res) => {
    try {
        const akimat = await Akimat.findByPk(req.params.id);

        if (!akimat) {
            return res.status(404).json({ message: 'Akimat not found' });
        }

        const childs = await Akimat.findAll({
            where: { parent_id: akimat.id },
            attributes: ['id', 'title_ru', 'title_kk', 'title_en'],
        });

        res.status(200).json({
            id: akimat.id,
            title_ru: akimat.title_ru,
            title_kk: akimat.title_kk,
            title_en: akimat.title_en,
            description_ru: akimat.description_ru,
            description_kk: akimat.description_kk,
            description_en: akimat.description_en,
            address_ru: akimat.address_ru,
            address_kk: akimat.address_kk,
            address_en: akimat.address_en,
            email: akimat.email,
            contacts: akimat.contacts,
            region_name: akimat.region_name,
            region_image: akimat.region_image,
            region_description: akimat.region_description,
            head_name: akimat.head_name,
            head_image: akimat.head_image,
            head_description: akimat.head_description,
            parent_id: akimat.parent_id,
            childs,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});


// POST: Create Akimat (Protected)
router.post('/', authenticate, async (req, res) => {
    const {
        title_ru, title_kk, title_en,
        description_ru, description_kk, description_en,
        address_ru, address_kk, address_en,
        email, contacts,
        region_name, region_image, region_description,
        head_name, head_image, head_description,
        parent_id
    } = req.body;

    try {
        const newAkimat = await Akimat.create({
            title_ru, title_kk, title_en,
            description_ru, description_kk, description_en,
            address_ru, address_kk, address_en,
            email, contacts,
            region_name, region_image, region_description,
            head_name, head_image, head_description,
        });

        res.status(201).json(newAkimat);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

router.put('/:id', authenticate, async (req, res) => {
    const {
        title_ru, title_kk, title_en,
        description_ru, description_kk, description_en,
        address, email, contacts,
        region_name, region_image, region_description,
        head_name, head_image, head_description,
        parent_id
    } = req.body;

    try {
        const akimat = await Akimat.findByPk(req.params.id);

        if (!akimat) {
            return res.status(404).json({ message: 'Akimat not found' });
        }

        akimat.title_ru = title_ru || akimat.title_ru;
        akimat.title_kk = title_kk || akimat.title_kk;
        akimat.title_en = title_en || akimat.title_en;
        akimat.description_ru = description_ru || akimat.description_ru;
        akimat.description_kk = description_kk || akimat.description_kk;
        akimat.description_en = description_en || akimat.description_en;
        akimat.address = address || akimat.address;
        akimat.email = email || akimat.email;
        akimat.contacts = contacts || akimat.contacts;
        akimat.region_name = region_name || akimat.region_name;
        akimat.region_image = region_image || akimat.region_image;
        akimat.region_description = region_description || akimat.region_description;
        akimat.head_name = head_name || akimat.head_name;
        akimat.head_image = head_image || akimat.head_image;
        akimat.head_description = head_description || akimat.head_description;
        akimat.parent_id = parent_id || null;

        await akimat.save();

        res.status(200).json(akimat);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});


// DELETE: Delete Akimat (Protected)
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const akimat = await Akimat.findByPk(req.params.id);

        if (!akimat) {
            return res.status(404).json({ message: 'Akimat not found' });
        }

        await akimat.destroy();

        res.status(200).json({ message: 'Akimat deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

module.exports = router;

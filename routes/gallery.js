const express = require('express');
const router = express.Router();
const GalleryItem = require('../models/GalleryItem');
const multer = require('multer');
const path = require('path');

// Configure Multer Storage for Gallery
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, 'gallery-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// GET gallery page
router.get('/', async (req, res) => {
    try {
        const items = await GalleryItem.find().sort({ createdAt: -1 });
        res.render('gallery', { items });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// POST upload gallery item
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!req.file) {
            return res.status(400).send('Please upload an image');
        }

        const newItem = new GalleryItem({
            title,
            description,
            image: '/uploads/' + req.file.filename
        });

        await newItem.save();
        res.redirect('/admin/gallery');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error uploading gallery item');
    }
});

module.exports = router;

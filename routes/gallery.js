const express = require('express');
const router = express.Router();
const GalleryItem = require('../models/GalleryItem');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

// Ensure the gallery upload directory exists
const galleryUploadDir = 'public/gallery-images/';
if (!fs.existsSync(galleryUploadDir)) {
    try {
        fs.mkdirSync(galleryUploadDir, { recursive: true });
    } catch (err) {
        console.error('Gallery directory creation error:', err.message);
    }
}

// Configure Multer Storage for Gallery
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, galleryUploadDir);
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
router.post('/upload', (req, res) => {
    // Attempting to upload image and diagnostic logging enabled
    upload.single('image')(req, res, async function (err) {
        if (err) {
            console.error('Gallery Multer Error:', err);
            // Gracefully handle read-only filesystem on Vercel
            if (err.code === 'EROFS' || err.message.includes('read-only')) {
                console.warn('Gallery directory is read-only. Upload failed but proceeding with log.');
                // For gallery, we really NEED an image, but we shouldn't crash.
                // We'll return a 400 instead of 500 with a clear message.
                return res.status(400).send('Upload Error: This platform does not support local storage. Please use a cloud-hosted image URL or contact site admin.');
            }
            return res.status(500).send(`Upload Error (${err.code || 'UNKNOWN'}): ${err.message}`);
        }

        try {
            if (mongoose.connection.readyState !== 1) {
                throw new Error('Database not connected. Please try again in a few seconds.');
            }
            const { title, description } = req.body;
            if (!req.file) {
                return res.status(400).send('Please upload an image');
            }

            const newItem = new GalleryItem({
                title,
                description,
                image: '/gallery-images/' + req.file.filename
            });

            await newItem.save();
            res.redirect('/admin/gallery');
        } catch (dbErr) {
            console.error('Gallery Save Error:', dbErr);
            res.status(500).send('Error saving gallery item: ' + dbErr.message);
        }
    });
});

module.exports = router;
